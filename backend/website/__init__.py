from flask import Flask
from dotenv import load_dotenv
import random
import string
from flask_cors import CORS

load_dotenv()


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config["SECRET_KEY"] = random.choices(string.ascii_letters, k=24)
    from .views import views

    app.register_blueprint(views, url_prefix="/")
    return app
