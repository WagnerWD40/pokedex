import sqlite3
import pokedex_entries_db as pe

conn = sqlite3.connect('pokemon.db')
cursor = conn.cursor()

cursor.execute(
    """
        CREATE TABLE pokemon_entries
        (
            id INTEGER PRIMARY KEY,
            entry CHAR(250),
            pokemon_id INT
        )
    """
)

for pokemon in pe.pokedex_entries_db:
    cursor.execute(
        """
        SELECT id, name FROM pokemons
        WHERE name=?
        """, (pokemon,)
    )
    result = cursor.fetchone()
    if result:
        print(result, 'Found')
        (pokemon_id, rest) = result
        for entry in pe.pokedex_entries_db[pokemon]:
            data = (entry, pokemon_id)
            cursor.execute(
                """
                    INSERT INTO pokemon_entries
                    (
                        entry, pokemon_id
                    )
                    VALUES (?, ?)
                """, data
            )


conn.commit()
conn.close()



