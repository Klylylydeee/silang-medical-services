from pymongo import MongoClient
from pymongo.errors import OperationFailure, ConnectionFailure

from flask import request

client = MongoClient('localhost', port=27017, serverSelectionTimeoutMS=10, connectTimeoutMS=20000)
db = client.silang_medical_services

def databaseConnection():
    try:
        client.admin.command('ismaster')
        print('Server is now connected to MongoDB')
    except (OperationFailure, ConnectionFailure) as err:
        print(f"Server failed to connect to MongoDB.")
        shutdown_hook = request.environ.get('werkzeug.server.shutdown')
        if shutdown_hook is not None:
            shutdown_hook()

