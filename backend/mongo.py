import pymongo
import ssl
import certifi

ca = certifi.where()

connection_string = "mongodb+srv://hassan:hassan123@cluster0.brlttau.mongodb.net/Scrapper?retryWrites=true&w=majority"

client = pymongo.MongoClient(connection_string, tlsCAFile=ca)

db = client['Scrapper']
collection = db['CarDealer']

# String to be added to the collection
string_to_add = "Hello, World!"

# Insert the string into the collection
collection.insert_one({'string': string_to_add})
