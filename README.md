# Stuff Doer
Task Manager/Time Tracker

## Goal
The goal of this app is to help fight procrastination by removing the decision making burden on which task to work next.

It will try to limit the amount of time a task was worked on, and choose the next best suitable task.

## Running the app
There are two scenarios for running the app. 
- In development
- In Deployment

### In Development
Use the following steps to run the app locally for easier development and a faster
feedback cycle (after cloning the repository locally):
```shell script
python3 -mvenv venv
source venv/bin/activate
pip install -r requirements.txt
```
Now start the db (the command uses docker):
```shell script
make rundb
```
And now for the app:
```shell script
export FLASK_APP=stuff-doer
flask run
```
It should start the server, and it is available at: http://localhost:5000/

### In Deployment
Before deploying the webapp, it needs to be built by:
```shell script
make build
```
After that it is possible to run the DB image and the webapp using:
```shell script
make runall
``` 
Which will start both the images.