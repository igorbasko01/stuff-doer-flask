from flask import Blueprint, render_template
from flask_login import login_required, current_user
from .models.task import Task

bp_task = Blueprint('tasks', __name__, url_prefix='/tasks')


@bp_task.route('/main', methods=('GET',))
@login_required
def main():
    tasks = Task.query.filter(Task.user_id == current_user.id
                              and Task.status != Task.status_enum['FINISHED']).all()
    return render_template('tasks/main.html', tasks=tasks)
