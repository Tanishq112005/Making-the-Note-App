from database import connection_db
from jwt_file import decoding_jwt_key
from type import Notes

async def creating_notes(notes_details: Notes):
    token = notes_details.jwt_token
    
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
            VALUES ($1, $2, $3);
        """
        
        try:
            async with connection_db.pool.acquire() as conn:
                await conn.execute(sql_query, note_title, note_description, owner_id)
            return {"msg": "success"}
        except Exception as e:
            print(f"Error while inserting new note: {e}")
            return {"msg": "failure", "reason": str(e)}
    return {"msg": "failure", "reason": "Invalid token"}