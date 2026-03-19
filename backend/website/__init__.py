from flask import Flask
from dotenv import load_dotenv
import random
import string

load_dotenv()

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = random.choices(string.ascii_letters, k=24)
    from .views import views
    app.register_blueprint(views, url_prefix='/')
    return app