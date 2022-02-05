from flask import Blueprint, make_response, jsonify
from jsonschema import ValidationError

errorRouter = Blueprint("errorRouter", __name__)

# Runs whenever an abort function is called and its HTTP status code is set to 400
# All schema validation aborts are set to 400
@errorRouter.app_errorhandler(400)
def bad_request(error):
    if isinstance(error.description, ValidationError):
        original_error = error.description
        # returns a string containing the missing request object field
        return make_response(jsonify({'error': original_error.message}), 400)
    return error

# Runs whenever an abort function is called and its HTTP status code is set to 404
@errorRouter.app_errorhandler(404)
def handle_unknown_path():
    return {
        "message": "The requested URL was not found on this server.",
        "code":  404
    }, 404

# Runs all other HTTP status error codes
@errorRouter.app_errorhandler(Exception)
def handle_all_error(err):
    return {
        "message": err.description,
        "code":  err.code
    }, err.code