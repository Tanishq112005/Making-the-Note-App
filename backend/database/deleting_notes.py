from database import connection_db
async def deleting_function(notes_id : int):
    sql_query = """
    DELETE FROM notes 
    WHERE note_id = $1 ;
    """
    try :
        async with connection_db.pool.acquire() as conn:
            await conn.execute(sql_query , notes_id) 
        return {"msg" : "success"}
    except Exception as e:
        return {"msg" : "failure" , "reason" : str(e)}    
                       
                       
                    