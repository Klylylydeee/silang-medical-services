from flask_cors import CORS

def corsConfig(application):
    CORS(application, resources={
        r"/*": { 
            'origins': "*",
            'allow_headers': 'Access-Control-Allow-Origin'
            }
        }
    )

    print("Cors is now running")