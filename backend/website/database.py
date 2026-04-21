from pymongo.mongo_client import MongoClient
import os

DB_USERNAME = os.environ.get("DB_USERNAME")
DB_PASSWORD = os.environ.get("DB_PASSWORD")

uri = f"mongodb+srv://{DB_USERNAME}:{DB_PASSWORD}@cluster0.3fajycc.mongodb.net/?appName=Cluster0"
client = MongoClient(uri)
db = client["PasswordManager"]

try:
    client.admin.command("ping")
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)
