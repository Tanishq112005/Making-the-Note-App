from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from type import Login_details, Sign_up_details , Notes
from database import checking_in_db, making_new_user , creating_notes

app = FastAPI()

@app.post("/login")
async def login_page(user_credentials: Login_details):
    try:
      
        result = checking_in_db.get_user_and_create_token(user_credentials)
    
        if result['status'] == "user_found":
            return JSONResponse(status_code=status.HTTP_200_OK, content={
                "msg": "Success",
                "jwt_token": result['token']
            })
        else:
      
            return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={
                "msg": "Failure",
                "reason": "User not found or invalid credentials"
            })
            
    except Exception as e:
      
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={
            "error": str(e)
        })

@app.post("/sign_up")
async def sign_up_page(user_details: Sign_up_details):
    try:
        result = making_new_user.making_user_and_create_token(user_details)
        
        if result['status'] == "user_created":
  
            return JSONResponse(status_code=status.HTTP_201_CREATED, content={
                "msg": "Success",
                "jwt_token": result['token']
            })
        else:

            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={
                "msg": "Failure",
                "reason": result.get("reason", "User could not be created")
            })
            
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={
            "error": str(e)
        })
        
        
# now after creating this we have to create notes app 
# doing the crud operation 
# first operation is the create operation getting the data from the frontend about the notes      
@app.post("/creating_notes")
async def creating_notes_function(notes_detail: Notes):
       try :
           result =  creating_notes.creating_notes(notes_detail) 
           if (result["msg"] == "success"):
               return JSONResponse(status_code=status.HTTP_201_CREATED , content={
               "msg" : "Sucess" ,
               "reason" : "Note is created" 
           })
           else :
                return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST , content={
               "msg" : "faliure" ,
               "reason" : "Note is not created" 
           })
       except Exception as e:
           return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR , content = {
               "error" : str(e) 
           })    