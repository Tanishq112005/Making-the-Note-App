from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
# Import the CORSMiddleware
from fastapi.middleware.cors import CORSMiddleware

from type import Login_details, Sign_up_details , Notes , Jwt_key_token
from database import checking_in_db, making_new_user , creating_notes, connection_db , getting_all_notes

app = FastAPI()

# --- CORS MIDDLEWARE SETUP ---
# This is the new section you need to add.
# It allows your React app (e.g., from http://localhost:3000) to make requests to this backend.

origins = [
    "http://localhost",
    "http://localhost:5173", # The default port for React development server
    "http://127.0.0.1:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of origins that are allowed to make requests
    allow_credentials=True, # Allows cookies to be included in requests
    allow_methods=["*"],    # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],    # Allows all headers
)
# -----------------------------


# --- Event handlers to manage the database connection pool ---
@app.on_event("startup")
async def startup_event():
    """Create the database connection pool when the app starts."""
    await connection_db.create_pool()

@app.on_event("shutdown")
async def shutdown_event():
    """Close the database connection pool when the app shuts down."""
    await connection_db.close_pool()


@app.post("/login")
async def login_page(user_credentials: Login_details):
    try:
        result = await checking_in_db.get_user_and_create_token(user_credentials)
    
        if result.get('status') == "user_found":
            return JSONResponse(status_code=status.HTTP_200_OK, content={
                "msg": "Success",
                "jwt_token": result.get('token')
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
        result = await making_new_user.making_user_and_create_token(user_details)
        
        if result.get('status') == "user_created":
            return JSONResponse(status_code=status.HTTP_201_CREATED, content={
                "msg": "Success",
                "jwt_token": result.get('token')
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

@app.post("/creating_notes")
async def creating_notes_function(notes_detail: Notes):
    try:
        result = await creating_notes.creating_notes(notes_detail)
        
        if result.get("msg") == "success":
            return JSONResponse(status_code=status.HTTP_201_CREATED, content={
                "msg" : "Success",
                "reason" : "Note is created"
            })
        else:
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={
                "msg" : "failure",
                "reason" : result.get("reason", "Note is not created")
            })
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content = {
            "error" : str(e)
        })


@app.post("/getting_notes")
async def getting_notes_function(token : Jwt_key_token):
    try:
        result = await getting_all_notes.getting_all_notes(token)

        if result.get("status") == "success":
            return JSONResponse(status_code=status.HTTP_200_OK , content={
                "msg" : "Success" ,
                "data_of_all_notes" : result.get("notes")
            })
        else:
            return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={
                "msg" : "failure",
                "reason" : result.get("reason", "An unknown error occurred")
            })
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content = {
            "error" : str(e)
        })