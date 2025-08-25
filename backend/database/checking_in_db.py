import psycopg2
from database import connecting_db
from type import Login_details, jwt_key_things
from jwt_file import creating_jwt_key

def get_user_and_create_token(details: Login_details):
    email = details.email
    

    sql_query = "SELECT user_id, user_email, user_name FROM user_information WHERE user_email = %s;"
    
    user_data = None
    with connecting_db.conn.cursor() as curs:
        try:
            curs.execute(sql_query, (email,))
            user_data = curs.fetchone()
        except (Exception, psycopg2.DatabaseError) as error:
            print(f"Database error: {error}")
            return {"status": "error", "reason": str(error)}
    
    if user_data:
        user_id, user_email, user_name = user_data
    
        user_data_for_jwt = jwt_key_things(id=user_id, email=user_email, name=user_name)
        
        jwt_token = creating_jwt_key(user_data_for_jwt)
        
        return {"status": "user_found", "token": jwt_token}
    else:
        return {"status": "user_not_found"}