from flask import (
    Blueprint, request, render_template, redirect, flash, url_for
)
from werkzeug.security import check_password_hash, generate_password_hash
from .models.user import User
from . import database as db


bp = Blueprint('auth', __name__, url_prefix='/auth')

@bp.route('/register', methods=('GET', 'POST'))
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        error = None

        if not email:
            error = 'Email is required.'
        elif not password:
            error = 'Password is required.'
        elif User.query.filter_by(email=email).first() is not None:
            error = 'Email {} is already registered.'.format(email)

        if error is None:
            db.session.add(User(email=email,
                                password=generate_password_hash(password),
                                role=1))
            db.session.commit()
            return redirect(url_for('auth.login'))

        flash(error)

    return render_template('auth/register.html')


@bp.route('/login', methods=('GET', 'POST'))
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        error = None
        user = User.query.filter_by(email=email).first()

        if user is None:
            error = 'Incorrect Email.'
        elif not check_password_hash(user.password, password):
            error = 'Incorrect password.'

        if error is None:
            # TODO: Add login_user
            # TODO: Continue from here: https://flask.palletsprojects.com/en/1.1.x/tutorial/views/#login
            return
        
    return render_template('auth/login.html')