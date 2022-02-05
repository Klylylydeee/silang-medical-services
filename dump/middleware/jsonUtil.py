from bson.json_util import dumps
from bson.json_util import loads

#Reference: https://stackoverflow.com/a/60717136

# Used for querying multiple or single array index value
def mongoCursor(mongoQuery):
    arrayIndexes = list(mongoQuery)
    return loads(dumps(arrayIndexes))