import psycopg2
import os

# Database connection details from Render dashboard
DB_HOST = "dpg-d5n9s1ggjchc7397tlr0-a.oregon-postgres.render.com"
DB_NAME = "fauna_guardianes_db"
DB_USER = "fauna_guardianes_db_user"
DB_PASSWORD = "nueCKAWB03lCmChcrQF9YAECO3ElulkC"
DB_PORT = "5432"

SQL_COMMAND = "DROP INDEX \"Reporte_email_key\";"

try:
    # Connect to your PostgreSQL database
    conn = psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT
    )
    cur = conn.cursor()

    # Execute the SQL command
    cur.execute(SQL_COMMAND)
    
    # Commit the changes
    conn.commit()
    
    print("¡Índice único eliminado con éxito!")
    print("El índice 'Reporte_email_key' ha sido eliminado.")

except Exception as e:
    print(f"Error al ejecutar el comando SQL: {e}")
    if conn:
        conn.rollback() # Rollback changes on error

finally:
    if cur:
        cur.close()
    if conn:
        conn.close()
