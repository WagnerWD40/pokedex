import sqlite3
import move_db as db

conn = sqlite3.connect('pokemon.db')
cursor = conn.cursor()

cursor.execute(
    """
        CREATE TABLE pokemon_moves
        (
            id INTEGER PRIMARY KEY,
            name VARCHAR(20),
            type VARCHAR(20),
            class VARCHAR(10),
            power VARCHAR(10),
            accuracy INT,
            pp INT,
            target VARCHAR(20),
            contact BOOL,
            effects VARCHAR(255)
        )
    """
)

move_list = []

for move, status in db.move_db.items():
    data = []
    data.append(move)
    data.append(status['Type'])
    data.append(status['Class'])
    data.append(status['Power'])
    try:
        data.append(int(status['Accuracy']))
    except ValueError:
        data.append('NULL')
    data.append(status['PP'])
    data.append(status['Target'])
    if status['Contact'] == 'Yes':
        data.append(True)
    else:
        data.append(False)
    data.append(status['Effects'])
    move_list.append(tuple(data))

cursor.executemany(
    """
        INSERT INTO pokemon_moves
        (
            name,
            type,
            class,
            power,
            accuracy,
            pp,
            target,
            contact,
            effects
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, move_list
)

conn.commit()
conn.close()
