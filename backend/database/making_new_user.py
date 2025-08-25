from database import connection_db
from type import Sign_up_details, jwt_key_things
from jwt_file import creating_jwt_key

async def making_user_and_create_token(details: Sign_up_details):
    email = details.email
    name = details.name
    password = details.password 

    sql_query = """
        INSERT INTO user_information (user_email, user_name, user_password)
        VALUES ($1, $2, $3)
        RETURNING user_id, user_email, user_name;
    """
    
    try:
        async with connection_db.pool.acquire() as conn:
            new_user_data = await conn.fetchrow(sql_query, email, name, password)
    except Exception as error:
        print(f"Database error: {error}")
        return {"status": "error", "reason": str(error)}

    if new_user_data:
        user_id, user_email, user_name = new_user_data['user_id'], new_user_data['user_email'], new_user_data['user_name']
        
        user_data_for_jwt = jwt_key_things(id=user_id, email=user_email, name=user_name)
        jwt_token = creating_jwt_key(user_data_for_jwt)
        
        return {"status": "user_created", "token": jwt_token}
    else:
        return {"status": "user_not_created"}