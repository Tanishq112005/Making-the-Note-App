from database import connecting_db 
from jwt_file import decoding_jwt_key
from type import Notes


def creating_notes(notes_details: Notes):
    token = notes_details.jwt_token
    decoded_token = None

    try:
       
        decoded_token = decoding_jwt_key(token)
        if "error" in decoded_token:
             return {"msg": "failure", "reason": decoded_token["error"]}
    except Exception as e:
        return {"msg": "failure", "reason": f"Error decoding JWT: {str(e)}"}

    if decoded_token:
        owner_id = decoded_token.get('id')
        note_title = notes_details.title
        note_description = notes_details.description 

        sql_query = """
            INSERT INTO notes (note_title, note_content, note_owner_id)
            VALUES (%s, %s, %s);
        """

        with connecting_db.conn.cursor() as cur:
            try:
              
                cur.execute(sql_query, (note_title, note_description, owner_id))
          
                connecting_db.conn.commit()
                return {"msg": "success"}
            except Exception as e:
                connecting_db.conn.rollback()
                print(f"Error while inserting new note: {e}")
           
                return {"msg": "failure", "reason": str(e)}