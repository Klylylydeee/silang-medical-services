from flask.json import JSONEncoder
from bson import json_util

# Reference: https://stackoverflow.com/a/56908491

# Converting pymongo results into json serializable values
class CustomJSONEncoder(JSONEncoder):
    def default(self, obj): 
        return json_util.default(obj)
