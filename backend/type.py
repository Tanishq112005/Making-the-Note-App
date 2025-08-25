from pydantic import BaseModel

class Login_details(BaseModel):
    email: str
    password: str

class jwt_key_things(BaseModel):
    id: int
    email: str
    name: str

class Sign_up_details(BaseModel):
    name: str
    email: str
    password: str
    
class Notes(BaseModel):
    title: str
    description: str 
    jwt_token: str 

class Jwt_key_token(BaseModel):
    jwt_token: str        