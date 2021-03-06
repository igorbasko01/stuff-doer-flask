import os
from flask import Flask, redirect, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager


app = Flask(__name__, instance_relative_config=True)
db_uri = os.getenv('DB_URI', 'localhost')
app.config.from_mapping(
    SECRET_KEY='dev',
    SQLALCHEMY_DATABASE_URI='postgresql+psycopg2://postgres:example@{0}/postgres'.format(db_uri),
    SQLALCHEMY_TRACK_MODIFICATIONS=False
)
database = SQLAlchemy(app)

from .db import add_init_db_command
add_init_db_command(app)

from .models.user import User
login_manager = LoginManager()
login_manager.init_app(app)

from . import auth
from . import tasks
app.register_blueprint(auth.bp)
app.register_blueprint(tasks.bp_task)


@app.route('/')
def hello():
    return redirect(url_for('auth.login'))


@login_manager.user_loader
def load_user(user_id):
    return User.query.filter(User.id == int(user_id)).first()
