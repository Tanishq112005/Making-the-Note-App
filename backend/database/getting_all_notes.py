from type import Jwt_key_token
from jwt_file import decoding_jwt_key
from database import connection_db

async def getting_all_notes(token: Jwt_key_token):
    try:
        decoded_token = decoding_jwt_key(token.jwt_token)
        if "error" in decoded_token:
     
            return {"status": "failure", "reason": decoded_token["error"]}
    except Exception as e:
        return {"status": "failure", "reason": f"Error decoding JWT: {str(e)}"}

    if decoded_token:
        owner_id = decoded_token.get('id')
        sql = "SELECT note_title, note_content FROM notes WHERE note_owner_id = $1"

        try:
            async with connection_db.pool.acquire() as conn:
                notes_records = await conn.fetch(sql, owner_id)
                notes_list = [dict(record) for record in notes_records]
        
            return {"status": "success", "notes": notes_list}
        except Exception as e:
            print(f"Database error while fetching notes: {e}")
      
            return {"status": "failure", "reason": str(e)}

    return {"status": "failure", "reason": "Invalid token"}