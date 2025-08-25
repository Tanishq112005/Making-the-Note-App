import asyncpg
from keys import connection_string_of_database

pool = None

async def create_pool():
    global pool
    if pool is None:
        try:
            pool = await asyncpg.create_pool(connection_string_of_database)
            print("Asyncpg connection pool created successfully.")
        except Exception as e:
            print(f"Error creating connection pool: {e}")
            pool = None

async def close_pool():
    global pool
    if pool:
        await pool.close()
        print("Asyncpg connection pool closed.")
