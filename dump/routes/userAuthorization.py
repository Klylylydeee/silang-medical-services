from flask import Blueprint, request, abort
from flask_expects_json import expects_json
from routes.validation.userAuth import createUserAccountSchema
from model.user import User
from middleware.raiseErr import ErrorWithArgs
from middleware.hashingAlgo import cryptingAlgo
from flask_mailman import EmailMessage
import re
import requests
import moment

userRouter = Blueprint("userAuthRouter", __name__)

@userRouter.route("sign-up", methods=["POST"])
@expects_json(createUserAccountSchema)
def createUserAccount():
    try:
        # Validate the email address request body payload
        emailRegExParams = r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b"
        if re.fullmatch(emailRegExParams, request.json["email"]) == None:
            raise ErrorWithArgs(401, "Invalid email address.")

        # Validate the phone number request body payload
        phPhoneNumParams = r"^(09|\+639)\d{9}$"
        if re.fullmatch(phPhoneNumParams, request.json["phone_number"]) == None:
            raise ErrorWithArgs(401, "Invalid phone number.")

        # Validate if email and/or phone number is already exsting in the database
        checkUser = User(**request.json).findIfUserDataExists()
        if checkUser == True:
            raise ErrorWithArgs(401, "Email/Phone Number is already registered.")

        createUser = User(**request.json).signUp()

        return {
            "message": "User has been created",
            "payload": createUser
        }, 201
    # Handle all custom error flags
    except ErrorWithArgs as customErr:
        abort(customErr.args[0], customErr.args[1])
    # Handle all error flags
    except Exception as err:
        abort(500, description=getattr(err, "message", str(err)))

@userRouter.route("sign-in", methods=["POST"])
def authenticateUser():
    try:
        # Fetch user data
        userData = User(**request.json).getUserDetails()

        # Validate if user account exists
        if userData == None:
            raise ErrorWithArgs(401, f"User {request.json['email']} does not exists.")
        elif cryptingAlgo.verify(request.json["password"], userData["password"]) == False:
            raise ErrorWithArgs(401, f"Password incorrect.")
        else:
            test = moment.now().locale('asia/singapore')
            readable = moment.date(userData["updated_at"]).date
            print(readable)
            # readable = moment.date(test).format("MMMM DD YYYY hh:mm:ss")
            # compare = moment.now().locale('ASIA/SINGAPORE').add(minutes=5)
            # trial = moment.date(compare).diff(test)
            # trial = moment.date(userData["updated_at"]).diff(test)
            # print(trial)
            # userData = User(**request.json).createSession()
            # print(userData)
            # response = requests.get(url=f"https://flask.klylylydeee.xyz/?num={userData['phone_number']}&msg=Your PIN code is {userData['generated_pin']} \n Silang Medical Services", verify=False)
            # json_data = response.json()
            # print(json_data)
            # msg = EmailMessage(
            #     subject='Hello',
            #     body=f'<p style="color: red;">This is an <strong>{userData["generated_pin"]}</strong> message.</p>',
            #     from_email='xtremeworks.inquiry@gmail.com',
            #     to=[userData["email"]]
            # )
            # msg.content_subtype = "html"  
            # msg.send()
        return {
            "payload": "nice"
        }
    # Handle all custom error flags
    except ErrorWithArgs as customErr:
        abort(customErr.args[0], customErr.args[1])
    # Handle all error flags
    except Exception as err:
        abort(500, description=getattr(err, "message", str(err)))

