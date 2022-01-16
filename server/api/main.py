# Flask Initialization
from logging import error
from flask import Flask, abort
from flask_mailman import Mail, EmailMessage
import json

# MongoDB 
from database.db import databaseConnection
import moment

# Middlewares
from middleware.cors import corsConfig
from middleware.jsonEncoder import CustomJSONEncoder

# Routes
from routes.errorHandler import errorRouter
from routes.osFile import fileRouter
from routes.userAuthorization import userRouter

# Environment Variables
with open('configuration/config.json') as config_file:
    config_data = json.load(config_file)

# Instantiate Flask Application and configurations
app = Flask(__name__)
app.json_encoder = CustomJSONEncoder
app.config.from_object(__name__)
app.config.update(
    MAIL_SERVER= 'smtp.gmail.com',
    MAIL_PORT= 465,
    MAIL_USE_TLS= False,
    MAIL_USE_SSL= True,
    MAIL_USERNAME= 'xtremeworks.inquiry@gmail.com',
    MAIL_PASSWORD= 'Google116xtreme!'
)
mail = Mail(app)

# Cors Config
# corsConfig(app)

# Blueprints
# app.register_blueprint(userRouter, url_prefix="/register")
app.register_blueprint(userRouter, url_prefix="/authentication")
app.register_blueprint(fileRouter, url_prefix="/files")
app.register_blueprint(errorRouter)

# Database Connection
databaseConnection()

from model.user import User

@app.route('/', methods=["GET"])
def dataEntry():
    try:
        # data = User(email="self.email").findUser()
        # if True:
        #     raise Exception('general exceptions not caught by specific handling')
        # print(a)
        # data = User(
        #     first_name="self.first_name", 
        #     last_name= "self.last_name", 
        #     email= "self.email", 
        #     phone_number= "self.phone_number", 
        #     password= "self.password", 
        #     address= "self.address", 
        #     generated_pin= "self.generated_pin", 
        #     barangay_id= "self.barangay_id", 
        #     designation_id= "self.designation_id"
        # ).signUp()
        # data = User(email="self.email").createSession()
        # test = moment.now().locale('asia/singapore')
        # print(test)
        # readable = moment.date(test).format("MMMM DD YYYY hh:mm:ss")
        # compare = moment.now().locale('ASIA/SINGAPORE').add(minutes=5)
        # trial = moment.date(compare).diff(test)
        # print(trial)
        # trial = moment.date(test).diff(compare).__str__().split(" ")
        # if trial[0] != -1:
        #     print("available")
        # else:
        #     print("ready to send")
        msg = EmailMessage(
            subject='Hello',
            body='<p style="color: red;">This is an <strong>important</strong> message.</p>',
            from_email='xtremeworks.inquiry@gmail.com',
            to=['klylylydeee@gmail.com']
        )
        msg.content_subtype = "html"  
        msg.send()
        return {
            # "users": data
            "users": "sent"
        }
    except Exception as err:
        print(err)
        # Reference: https://stackoverflow.com/a/45532289
        abort(500, description=getattr(err, "message", str(err)))

# Run Flask
if __name__ == "__main__":
    app.run(debug=True)
