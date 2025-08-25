import psycopg2

try : 
    conn = psycopg2.connect("postgresql://neondb_owner:npg_oSeuA6v2LGTq@ep-shy-dream-a1q2ece2-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")
except :
    print("Unable to connect the database")     
    
    