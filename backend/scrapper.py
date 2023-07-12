# import win32api
from flask import Flask, render_template, request, Response
from flask import jsonify
from flask_cors import CORS
from flask_apscheduler import APScheduler
import base64

import requests
from bs4 import BeautifulSoup
import re




app = Flask(__name__)
scheduler = APScheduler()
scheduler.init_app(app)
scheduler.start()
CORS(app)


@app.route('/getdata', methods=['POST'])
def data_get():
    namesList = []
    pricesList = []
    kms = []
    transmission = []
    DatesList = []
    FuelList = []
    on_value = request.get_data().decode('utf-8')
    print(on_value)

    for i in range(1,21):
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

    # print(namesList)
    # print(pricesList)
    # print(kms)
    # print(transmission)
    # print(DatesList)
    # print(FuelList)
    # print(len(namesList))
    # print(len(pricesList))
    # print(len(kms))
    # print(len(transmission))
    # print(len(DatesList))
    # print(len(FuelList))
    finalList =[]
    finalList.append(namesList)
    finalList.append(pricesList)
    finalList.append(kms)
    finalList.append(transmission)
    finalList.append(DatesList)
    finalList.append(FuelList)
    
    return finalList


if __name__ == "__main__":
    app.run(debug=True)