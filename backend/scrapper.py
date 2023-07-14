# import win32api
from flask import Flask, render_template, request, Response
from flask import jsonify
from flask_cors import CORS
from flask_apscheduler import APScheduler
import pymongo
import certifi
from datetime import date
import requests
from bs4 import BeautifulSoup
import re
import time



app = Flask(__name__)
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()
CORS(app)

ca = certifi.where()

connection_string = "mongodb+srv://hassan:hassan123@cluster0.brlttau.mongodb.net/Scrapper?retryWrites=true&w=majority"

client = pymongo.MongoClient(connection_string, tlsCAFile=ca)

namesList = []
pricesList = []
kms = []
transmission = []
DatesList = []
FuelList = []
db = client['Scrapper']
collection = db['CarDealer']

def fetchData():
    for i in range(1,2):
        print(i)
        # URL of the website page you want to scrape
        url = 'https://www.autoscout24.nl/lst?atype=C&cy=D%2CA%2CB%2CE%2CF%2CI%2CL%2CNL&damaged_listing=exclude&desc=0&page='+str(i)+'&powertype=kw&search_id=1nin2jhjgo&sort=standard&source=listpage_pagination&ustate=N%2CU'

        date_pattern = r'\d{2}/\d{4}'
        # Send a GET request to the website
        response = requests.get(url)


        # Check if the request was successful
        if response.status_code == 200:
            # Parse the HTML content using BeautifulSoup
            soup = BeautifulSoup(response.content, 'html.parser')

            # print(soup)
            # Find all the HTML elements you want to scrape (e.g., <p> tags)
            names = soup.find_all('h2')
            prices = soup.find_all('p')
            km = soup.find_all('span')
            # Print the text content of the scraped elements
            for name in names:
                namesList.append(name.text)
            for price in prices:
                if price.text[0] == '€':
                    pricesList.append(price.text)
            for k in km:
                if len(k.text) > 2 and k.text[-2:] == 'km' and k.text != 'xDrive50i Adp.LED,Head-Up,Keyless,Soft,127tkm':
                    kms.append(k.text)
            for trans in km:
                if(trans.text == 'Automatisch' or trans.text == 'Handgeschakeld' or trans.text == '- Transmissie'):
                    transmission.append(trans.text)

                matches = re.findall(date_pattern, trans.text)
                if matches and len(matches) == 1: # Getting dates
                    for match in matches:
                        DatesList.append(match)

                # print(trans.text)
                if(trans.text == '- (Eerste registratie)'): #getting registration date
                    DatesList.append(trans.text)
                if(trans.text == 'Benzine' or trans.text == 'Diesel' or trans.text == 'Elektro/Benzine' or trans.text == 'Elektro/Diesel' or trans.text == 'Elektrisch' or trans.text == 'LPG' or trans.text == '- Brandstof'): #getting fuel type
                    FuelList.append(trans.text)
            namesList.pop() #To remove the last extra entry

        else:
            print('Failed to retrieve the website page.')




def uploadToMongo():
    current_date = date.today()
    for k in range(len(namesList)):
        existing_doc = collection.find_one({'Name': namesList[k]})
        if existing_doc is None:
            collection.insert_one({'Name': namesList[k],
                                   'Price': pricesList[k],
                                   'KM': kms[k],
                                   'Transmission': transmission[k],
                                   'Date': DatesList[k],
                                   'Fuel': FuelList[k],
                                   'DateAdded': str(current_date)
                                   })
        else:
            print("duplicate found, skipped")    

@app.route('/getdata', methods=['POST'])
def data_get():
    finalList2 = []
    namesList2 = []
    pricesList2 = []
    kms2 = []
    transmission2 = []
    DatesList2 = []
    FuelList2 = []
    DateAddedList2 = []
    on_value = request.get_data().decode('utf-8')
    print(on_value)
    # Retrieve all documents from the collection
    data = collection.find()
    
    # Print each document
    for document in data:
        namesList2.append(document['Name'])
        pricesList2.append(document['Price'])
        kms2.append(document['KM'])
        transmission2.append(document['Transmission'])
        DatesList2.append(document['Date'])
        FuelList2.append(document['Fuel'])
        DateAddedList2.append(document['DateAdded'])
    finalList2.append(namesList2)
    finalList2.append(pricesList2)
    finalList2.append(kms2)
    finalList2.append(transmission2)
    finalList2.append(DatesList2)
    finalList2.append(FuelList2)
    finalList2.append(DateAddedList2)
    return finalList2


def scrapeAndUpload():
    print("running")
    fetchData()
    uploadToMongo()

if __name__ == "__main__":
    scheduler.add_job(id='scrape_and_upload', func=scrapeAndUpload, trigger='interval', seconds=40)
    # scheduler.remove_all_jobs()
    # scheduler.shutdown()
    # scheduler.start()
    app.run(debug=True)
    scheduler.start()