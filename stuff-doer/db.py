import click
from . import database as db

def init_db():
    db.drop_all()
    db.create_all()

@click.command('init-db')
def init_db_command():
    """Clear the existing data and create new tables"""
    click.echo(db)
    init_db()
    click.echo('Initialized the database.')

def add_init_db_command(app):
    app.cli.add_command(init_db_command)
