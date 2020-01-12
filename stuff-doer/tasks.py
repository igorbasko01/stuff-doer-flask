from flask import Blueprint, render_template
from flask_login import login_required

bp_task = Blueprint('tasks', __name__, url_prefix='/tasks')


@bp_task.route('/main')
@login_required
def main():
    return render_template('tasks/main.html')