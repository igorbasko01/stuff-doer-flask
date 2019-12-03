from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, instance_relative_config=True)
app.config.from_mapping(
    SECRET_KEY='dev',
    SQLALCHEMY_DATABASE_URI='postgres://localhost/postgres',
    SQLALCHEMY_TRACK_MODIFICATIONS=False
)
db = SQLAlchemy(app)

from .db import add_init_db_command
add_init_db_command(app)

@app.route('/hello')
def hello():
    return 'Hello, world!'
