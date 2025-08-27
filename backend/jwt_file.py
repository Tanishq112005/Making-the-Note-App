import jwt
import os
from type import jwt_key_things
from dotenv import load_dotenv
load_dotenv()
SECRET_KEY = os.getenv("key_of_jwt")
def creating_jwt_key(data_of_user : jwt_key_things):
    payload = {
        "email" : data_of_user.email,
        "id" : data_of_user.id,
        "name": data_of_user.name
    }
    encoded_token = jwt.encode(payload, SECRET_KEY, algorithm="HS256") 
    return encoded_token     


def decoding_jwt_key(token : str):
    
    try:
        decoded_token = jwt.decode(token , SECRET_KEY , algorithms="HS256")
        return decoded_token
    except Exception as e:
        print(f"Error occurs , the error is {e}") 
        return {"error" : e} 