import psycopg2
from database import connecting_db
from type import Sign_up_details, jwt_key_things
from jwt_file import creating_jwt_key

def making_user_and_create_token(details: Sign_up_details):
    email = details.email
    name = details.name
    password = details.password

 
    sql_query = """
        INSERT INTO user_information (user_email, user_name, user_password)
        VALUES (%s, %s, %s)
        RETURNING user_id, user_email, user_name;
    """
    
    new_user_data = None
    with connecting_db.conn.cursor() as curs:
        try:
            curs.execute(sql_query, (email, name, password))
            new_user_data = curs.fetchone()
            connecting_db.conn.commit() 
        except (Exception, psycopg2.DatabaseError) as error:
            connecting_db.conn.rollback() 
            print(f"Database error: {error}")
            return {"status": "error", "reason": str(error)}

    if new_user_data:
        user_id, user_email, user_name = new_user_data
        
     
        user_data_for_jwt = jwt_key_things(id=user_id, email=user_email, name=user_name)
        
        jwt_token = creating_jwt_key(user_data_for_jwt)
        
        return {"status": "user_created", "token": jwt_token}
    else:
        return {"status": "user_not_created"}