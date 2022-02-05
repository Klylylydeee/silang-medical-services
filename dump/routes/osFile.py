from sre_constants import SUCCESS
from flask import Blueprint, send_from_directory, request, abort

#  
from werkzeug.utils import secure_filename
import moment
import os

fileRouter = Blueprint("filePathRouter", __name__)

ALLOWED_IMAGE_EXTENSIONS = set(["jpg", "jpeg", "png"])
def allowed_ImageFiles(imageFile):
    return '.' in imageFile and imageFile.rsplit('.', 1)[1].lower() in ALLOWED_IMAGE_EXTENSIONS

@fileRouter.route("/profile", methods=['POST'])
def addProfilePicture():
        if 'file' not in request.files:
            print('No file part')
            return {
                "message": "No file attached",
                "code": 500 
            }, 500
        file = request.files['file']
        if file.filename == '':
            return {
                "message": "Attached file does not have a filename",
                "code": 500 
            }, 500
        if file and allowed_ImageFiles(file.filename):
            filename = secure_filename(f"{moment.utcnow().locale('asia/singapore').__str__()[5:10].replace('-', '')}-{moment.utcnow().locale('asia/singapore').__str__()[11:20].replace('T', '').replace('-', '')}-{file.filename}")
            # os.remove(os.path.join("./asset/profile", filename))
            file.save(os.path.join("./asset/profile", filename))
            return {
                "message": "File has been stored",
                "filename": filename
            }

@fileRouter.route("/profile/<fileNameAndExtension>", methods=['GET'])
def getProfilePicture(fileNameAndExtension):
    workingdir = os.path.abspath(os.getcwd())
    return send_from_directory(f"{workingdir}\\asset\\profile", fileNameAndExtension)

@fileRouter.route("/document/<fileNameAndExtension>", methods=['GET'])
def attachedDocuments(fileNameAndExtension):
    workingdir = os.path.abspath(os.getcwd())
    return send_from_directory(f"{workingdir}\\asset\\document", fileNameAndExtension)