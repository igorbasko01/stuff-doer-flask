from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager


app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY='dev',
    SQLALCHEMY_DATABASE_URI='postgresql+psycopg2://postgres:example@localhost/postgres',
    SQLALCHEMY_TRACK_MODIFICATIONS=False
)
database = SQLAlchemy(app)

from .db import add_init_db_command
add_init_db_command(app)

from .models.user import User
login_manager = LoginManager()
login_manager.init_app(app)

from . import auth
app.register_blueprint(auth.bp)


@app.route('/hello')
def hello():
    return 'Hello, world!'


@login_manager.user_loader
def load_user(user_id):
    return User.get_id(user_id)
