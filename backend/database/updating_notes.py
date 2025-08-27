from type import Notes_changing_details
from database import connection_db
async def updating_notes(notes_details : Notes_changing_details):
    sql_query = """
    UPDATE notes
    SET note_title = $1 , note_content = $2 
    WHERE note_id = $3;
    """
    try:
        async with connection_db.pool.acquire() as conn:
            await conn.execute(sql_query , notes_details.title , notes_details.descripiton , notes_details.notes_id )
        return {"msg" : "success"}
    except Exception as e:
        return {"msg" : "failure" , "reason" : str(e)} 
    
    
    