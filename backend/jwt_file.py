import jwt
from type import jwt_key_things
from keys import key_of_jwt as SECRET_KEY
def creating_jwt_key(data_of_user : jwt_key_things):
    payload = {
        "email" : data_of_user.email,
        "id" : data_of_user.id,
        "name": data_of_user.name
    }
    encoded_token = jwt.encode(payload, SECRET_KEY, algorithm="HS256") 
    return encoded_token     