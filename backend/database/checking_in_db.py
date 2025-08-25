from database import connection_db
from type import Login_details, jwt_key_things
from jwt_file import creating_jwt_key

async def get_user_and_create_token(details: Login_details):
    email = details.email
    
  
    sql_query = "SELECT user_id, user_email, user_name FROM user_information WHERE user_email = $1;"
    
    try:
      
        async with connection_db.pool.acquire() as conn:
            user_data_record = await conn.fetchrow(sql_query, email)
    except Exception as error:
        print(f"Database error: {error}")
        return {"status": "error", "reason": str(error)}
    
    if user_data_record:
      
        user_id = user_data_record['user_id']
        user_email = user_data_record['user_email']
        user_name = user_data_record['user_name']
    
        user_data_for_jwt = jwt_key_things(id=user_id, email=user_email, name=user_name)
        jwt_token = creating_jwt_key(user_data_for_jwt)
        
        return {"status": "user_found", "token": jwt_token}
    else:
        return {"status": "user_not_found"}
