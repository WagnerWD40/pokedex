import sqlite3
import abilities_db as db

conn = sqlite3.connect('pokemon.db')
cursor = conn.cursor()

cursor.execute(
    """
        CREATE TABLE pokemon_abilities
        (
            id INTEGER PRIMARY KEY,
            name VARCHAR(20),
            description VARCHAR(625)
        )
    """
)

for item, description in db.abilities_database.items():
    cursor.execute(
        """
        INSERT INTO pokemon_abilities
        (
            name,
            description
        )
        VALUES (?, ?)
        """, (item, description)
    )


print('Finished')
conn.commit()
conn.close()