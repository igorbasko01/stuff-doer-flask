from flask import Blueprint, render_template, request, Response
from flask_login import login_required, current_user
from .models.task import Task
from . import database as db
from . import app

bp_task = Blueprint('tasks', __name__, url_prefix='/tasks')


@bp_task.route('/main', methods=('GET',))
@login_required
def main():
    return render_template('tasks/main.html')


@bp_task.route('/add_task', methods=('POST',))
@login_required
def add_task():
    app.logger.info("Got the following request: %s", request.get_json())

    new_task = request.get_json()

    db.session.add(Task(user_id=current_user.id,
                        name=new_task['name'],
                        description=new_task['desc'],
                        taskspace_id=0,
                        parent_path=new_task['parentPath'],
                        priority=new_task['priority'],
                        status=Task.status_enum['WAITING']))
    db.session.commit()

    return Response(status=200)


@bp_task.route('/get_tasks', methods=('GET',))
@login_required
def get_tasks():
    tasks = Task.query.filter(Task.user_id == current_user.id
                              and Task.status != Task.status_enum['FINISHED']).all()
    dict_tasks = [{'id': t.id, 'name': t.name, 'desc': t.description, 'parentPath': t.parent_path} for t in tasks]
    app.logger.info("Got the following tasks: %s", dict_tasks)
    return {'tasks': dict_tasks}
