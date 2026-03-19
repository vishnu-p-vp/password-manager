from pymongo.mongo_client import MongoClient
import os

DB_USERNAME = os.environ.get('DB_USERNAME')
DB_PASSWORD = os.environ.get('DB_PASSWORD')

uri = "mongodb://localhost:27017/cloud-password-manager"
client = MongoClient(uri)
db = client['passwordManager']
