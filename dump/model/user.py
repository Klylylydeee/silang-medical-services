# from middleware.jsonUtil import mongoCursor
from pymongo.collection import ReturnDocument
from database.db import db
from middleware.hashingAlgo import cryptingAlgo
import pymongo
import moment

from middleware.arbitaryPin import generatePinNumber

# User Collection of the MongoDB Database
userCollection = db.user

# Indexes of User Collection
userCollection.create_index(
    [("email", pymongo.ASCENDING)],
    unique=True
)
userCollection.create_index(
    [("phone_number", pymongo.ASCENDING)],
    unique=True
)

class User:
    
    # Object mapping similar to Mongoose's Schema or other MongoDB ODM/ORM
    def __init__(self, **kwargs):
        # User's full name
        self.first_name = kwargs.get("first_name", None)
        self.last_name = kwargs.get("last_name", None)
        # User's email address
        self.email = kwargs.get("email", None)
        # User's contact address
        self.phone_number = kwargs.get("phone_number", None)
        # User's authentication string
        self.password = kwargs.get("password", None)
        # User's physical address
        self.address = kwargs.get("address", None)
        # User's credential pin
        # Type: Integer
        #       Ex: 133589
        self.generated_pin = kwargs.get("generated_pin", None)
        # User's current barangay
        # Type: Integer
        #       Ex: 1, which is equal to Barangay Lumil
        self.barangay_id = kwargs.get("barangay_id", None)
        # User's role within the barangay
        # Type: Integer
        #       1 = Web Administrator
        #       2 = Barangay Chairman
        #       3 = Barangay Personnel
        #       4 = Barangay Caregiver
        #       5 = Doctor
        self.designation_id = kwargs.get("designation_id", None)
        # User's account creation date
        # Type: String(DateTime)
        #       Ex: 2022-01-11T20:05:10+08.00
        self.created_at = kwargs.get("created_at", None)
        self.updated_at = kwargs.get("updated_at", None)
        # Basis whether account is active or not
        # Type: Boolean
        #       True = Active
        #       False = Inactive
        self.status = kwargs.get("status", None)
        # User's display image
        self.profile_picture = kwargs.get("profile_picture", None)

    def findIfUserDataExists(self):
        emailData =  userCollection.find_one(
            filter={
                "email": self.email
            }
        )
        phoneNumData =  userCollection.find_one(
            filter={
                "phone_number": self.phone_number
            }
        )
        return True if emailData != None or phoneNumData != None else False

    def getUserDetails(self):
        return   userCollection.find_one(
            filter={
                "email": self.email
            },
            # Reference: https://pymongo.readthedocs.io/en/stable/api/pymongo/collection.html#pymongo.collection.Collection.find
            projection={
                "password": True,
                "updated_at": True
            }
        )

    def createSession(self):
        return userCollection.find_one_and_update(
            filter = {
                "email": self.email
            },
            update = {
                "$set": {
                    "generated_pin": generatePinNumber(6),
                    "updated_at": moment.utcnow().locale('asia/singapore').__str__()
                }
            },
            return_document = ReturnDocument.AFTER
        )

    def confirmSession():
        print("")

    def signIn(self):
        return userCollection.find_one({
            "email": self.email
        })
    
    def signUp(self):
        print(moment.utcnow().locale('asia/singapore').datetime)
        return userCollection.insert_one({ 
            "first_name": self.first_name, 
            "last_name": self.last_name, 
            "email": self.email, 
            "phone_number": self.phone_number, 
            "password": cryptingAlgo.hash(self.password), 
            "address": self.address, 
            "generated_pin": generatePinNumber(6), 
            "barangay_id": self.barangay_id, 
            "designation_id": self.designation_id, 
            "status": True, 
            "profile_picture": "default.png", 
            "created_at": moment.utcnow().locale('asia/singapore').__str__(),
            "updated_at": moment.utcnow().locale('asia/singapore')
        }).inserted_id

    def editUserDetail():
        print("running")
