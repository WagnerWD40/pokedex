import sqlite3
import pokemon_db as db

# conn = sqlite3.connect('pokemon.db')
#
# cursor = conn.cursor()
#
# cursor.execute(
#     """
#         CREATE TABLE pokemons
#         (
#             id INT PRIMARY KEY,
#             name CHAR(20),
#             title CHAR(30),
#             type_1 CHAR(10),
#             type_2 CHAR(10),
#             abilities_1 CHAR(20),
#             abilities_2 CHAR(20),
#             abilities_3 CHAR(20),
#             hidden_abilities_1 CHAR(20),
#             hidden_abilities_2 CHAR(20),
#             hidden_abilities_3 CHAR(20),
#             hp INT,
#             attack INT,
#             defense INT,
#             sp_attack INT,
#             sp_defense INT,
#             speed INT,
#             total INT
#         )
#     """
# )
#
# conn.commit()
#
# conn.close()
#
# print(db.pokemon_database['Abomasnow']['Number'])
# print(db.pokemon_database['Abomasnow']['Stats'])
# print(db.pokemon_database['Abomasnow']['Title'])
# print(db.pokemon_database['Abomasnow']['Type'])
# print(db.pokemon_database['Abomasnow']['Abilities'])
# print(db.pokemon_database['Abomasnow']['Hidden Abilities'])

pokemon_list = []

for key in db.pokemon_database:
    data = []
    data.append(int(db.pokemon_database[key]['Number'][1:]))  # id
    data.append(key) # name
    data.append(db.pokemon_database[key]['Title'])

    for type in db.pokemon_database[key]['Type']:
        data.append(type)

    if len(db.pokemon_database[key]['Type']) < 2:
        data.append('NULL')

    for ability in db.pokemon_database[key]['Abilities']:
        data.append(ability)

    if len(db.pokemon_database[key]['Abilities']) < 3:
        data.append('NULL')

        if len(db.pokemon_database[key]['Abilities']) < 2:
            data.append('NULL')

    for hidden_ability in db.pokemon_database[key]['Hidden Abilities']:
        data.append(hidden_ability)

    if not db.pokemon_database[key]['Hidden Abilities']:
        data.append('NULL')

    if len(db.pokemon_database[key]['Hidden Abilities']) < 3:
        data.append('NULL')

        if len(db.pokemon_database[key]['Hidden Abilities']) < 2:
            data.append('NULL')

    data.append(int(db.pokemon_database[key]['Stats']['HP']))
    data.append(int(db.pokemon_database[key]['Stats']['Attack']))
    data.append(int(db.pokemon_database[key]['Stats']['Defense']))
    data.append(int(db.pokemon_database[key]['Stats']['Sp. Attack']))
    data.append(int(db.pokemon_database[key]['Stats']['Sp. Defense']))
    data.append(int(db.pokemon_database[key]['Stats']['Speed']))
    data.append(int(db.pokemon_database[key]['Stats']['Total']))
    pokemon_list.append(tuple(data))

correct_pokemon_list = []

for item in pokemon_list:
    if not len(item) < 18:
        correct_pokemon_list.append(item)
    else:
        print(item)

# '(487, 'Giratina', 'Renegade Pokemon', 'Ghost', 'Dragon', 'NULL', 'NULL', 'Telepathy', 'NULL', 'NULL', 150, 100,
#          120, 100, 120, 90, 680)'

# conn = sqlite3.connect('pokemon.db')
#
# cursor = conn.cursor()
#
# cursor.executemany(
#     'INSERT INTO pokemons VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', correct_pokemon_list
# )
#
# conn.commit()
#
# conn.close()

"""
id INT PRIMARY KEY,
name CHAR(20),
title CHAR(30),
type_1 CHAR(10),
type_2 CHAR(10),
abilities_1 CHAR(20),
abilities_2 CHAR(20),
abilities_3 CHAR(20),
hidden_abilities_1 CHAR(20),
hidden_abilities_2 CHAR(20),
hidden_abilities_3 CHAR(20),
hp INT,
attack INT,
defense INT,
sp_attack INT,
sp_defense INT,
speed INT,
total INT
"""