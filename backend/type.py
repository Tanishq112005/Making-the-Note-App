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