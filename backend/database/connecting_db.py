import psycopg2
from keys import connection_string_of_database
try : 
    conn = psycopg2.connect(connection_string_of_database)
except :
    print("Unable to connect the database")     
    
    