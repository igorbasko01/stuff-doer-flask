from flask import Blueprint, render_template, request, Response
from flask_login import login_required, current_user
from .models.task import Task
from . import app

bp_task = Blueprint('tasks', __name__, url_prefix='/tasks')


@bp_task.route('/main', methods=('GET',))
@login_required
def main():
    tasks = Task.query.filter(Task.user_id == current_user.id
                              and Task.status != Task.status_enum['FINISHED']).all()
    return render_template('tasks/main.html', tasks=tasks)


@bp_task.route('/add_task', methods=('POST',))
@login_required
def add_task():
    app.logger.info("Got the following request: %s", request.get_json())

    return Response(status=200)
