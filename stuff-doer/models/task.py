import datetime
from .. import database as db


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    description = db.Column(db.String(240), nullable=False)
    path = db.Column(db.String(240), nullable=False)
    taskspace_id = db.Column(db.Integer, nullable=False)
    create_ts = db.Column(db.DateTime, nullable=False, default=datetime.datetime.now)
    done_ts = db.Column(db.DateTime)
    priority = db.Column(db.Integer, nullable=False)
    status = db.Column(db.Integer, nullable=False)

    status_enum = {
        'WAITING': 0,
        'READY': 1,
        'ACTIVE': 2,
        'READY_PENDING': 3,
        'HOLD': 4,
        'FINISHED': 5
    }
