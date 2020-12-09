import sqlite3
import pokemon_db as db

conn = sqlite3.connect('pokemon.db')

cursor = conn.cursor()


'''
#  Create table Pokemons

cursor.execute(
    """
        CREATE TABLE pokemons
        (
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
        )
    """
)
'''

'''
# create table pokemon_forms

cursor.execute(
    """
         CREATE TABLE pokemon_forms
        (
            form_id INTEGER PRIMARY KEY,
            name CHAR(20),
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
            total INT,
            pokemon_id INT,
            FOREIGN KEY (pokemon_id) REFERENCES pokemons(id)
        )   
    """
)
'''



#
# print(db.pokemon_database['Abomasnow']['Number'])
# print(db.pokemon_database['Abomasnow']['Stats'])
# print(db.pokemon_database['Abomasnow']['Title'])
# print(db.pokemon_database['Abomasnow']['Type'])
# print(db.pokemon_database['Abomasnow']['Abilities'])
# print(db.pokemon_database['Abomasnow']['Hidden Abilities'])
'''
# MEGAS

pokemon_list = []

for key in db.pokemon_database:
    data = []
    if 'Mega Abilities' in db.pokemon_database[key]:

        data.append(f'Mega {key}')

        if 'Mega Type' in db.pokemon_database[key]:

            data.append(db.pokemon_database[key]['Mega Type'][0])

            if len(db.pokemon_database[key]['Mega Type']) > 1:

                data.append(db.pokemon_database[key]['Mega Type'][1])

            else:

                data.append('NULL')

        else:

            data.append(db.pokemon_database[key]['Type'][0])

            if len(db.pokemon_database[key]['Type']) > 1:

                data.append(db.pokemon_database[key]['Type'][1])

            else:
                data.append('NULL')

        data.append(db.pokemon_database[key]['Mega Abilities'][0])
        data.append('NULL')
        data.append('NULL')
        data.append('NULL')
        data.append('NULL')
        data.append('NULL')
        data.append(db.pokemon_database[key]['Mega Stats']['HP'])
        data.append(db.pokemon_database[key]['Mega Stats']['Attack'])
        data.append(db.pokemon_database[key]['Mega Stats']['Defense'])
        data.append(db.pokemon_database[key]['Mega Stats']['Sp. Attack'])
        data.append(db.pokemon_database[key]['Mega Stats']['Sp. Defense'])
        data.append(db.pokemon_database[key]['Mega Stats']['Speed'])
        data.append(db.pokemon_database[key]['Mega Stats']['Total'])
        data.append(int(db.pokemon_database[key]['Number'][1:]))
        pokemon_list.append(tuple(data))

print(pokemon_list)
'''
'''
# Alolan Forms

pokemon_list = []

for key in db.pokemon_database:
    data = []
    if 'Alolan Abilities' in db.pokemon_database[key]:

        data.append(f'Alolan {key}')

        if 'Alolan Type' in db.pokemon_database[key]:

            data.append(db.pokemon_database[key]['Alolan Type'][0])

            if len(db.pokemon_database[key]['Alolan Type']) > 1:

                data.append(db.pokemon_database[key]['Alolan Type'][1])

            else:

                data.append('NULL')

        else:

            data.append(db.pokemon_database[key]['Type'][0])

            if len(db.pokemon_database[key]['Type']) > 1:

                data.append(db.pokemon_database[key]['Type'][1])

            else:
                data.append('NULL')

        data.append(db.pokemon_database[key]['Alolan Abilities'][0])

        if len(db.pokemon_database[key]['Alolan Abilities']) > 1:
            data.append(db.pokemon_database[key]['Alolan Abilities'][1])

            if len(db.pokemon_database[key]['Alolan Abilities']) > 2:

                data.append(db.pokemon_database[key]['Alolan Abilities'][2])
            else:
                data.append('NULL')

        else:
            data.append('NULL')
            data.append('NULL')

        if 'Alolan Hidden Abilities' in db.pokemon_database[key]:
            data.append(db.pokemon_database[key]['Alolan Hidden Abilities'][0])
            if len(db.pokemon_database[key]['Alolan Hidden Abilities']) > 1:
                data.append(db.pokemon_database[key]['Alolan Hidden Abilities'][1])

                if len(db.pokemon_database[key]['Alolan Hidden Abilities']) > 2:

                    data.append(db.pokemon_database[key]['Alolan Hidden Abilities'][2])
                else:
                    data.append('NULL')

            else:
                data.append('NULL')
                data.append('NULL')
        else:
            data.append('NULL')
            data.append('NULL')
            data.append('NULL')
        data.append(db.pokemon_database[key]['Alolan Stats']['HP'])
        data.append(db.pokemon_database[key]['Alolan Stats']['Attack'])
        data.append(db.pokemon_database[key]['Alolan Stats']['Defense'])
        data.append(db.pokemon_database[key]['Alolan Stats']['Sp. Attack'])
        data.append(db.pokemon_database[key]['Alolan Stats']['Sp. Defense'])
        data.append(db.pokemon_database[key]['Alolan Stats']['Speed'])
        data.append(db.pokemon_database[key]['Alolan Stats']['Total'])
        data.append(int(db.pokemon_database[key]['Number'][1:]))
        pokemon_list.append(tuple(data))

print(len(pokemon_list[0]))
print(pokemon_list[0])
'''
pokemon_list = []

form = 'Alt Form 5 Stats'

for key in db.pokemon_database:
    data = []
    if form in db.pokemon_database[key]:

        data.append(f'{key} {db.pokemon_database[key][form]["Form Name"]}')

        if 'Form Type' in db.pokemon_database[key][form]:

            data.append(db.pokemon_database[key][form]['Form Type'][0])

            if len(db.pokemon_database[key][form]['Form Type']) > 1:

                data.append(db.pokemon_database[key][form]['Form Type'][1])

            else:

                data.append('NULL')

        else:

            data.append(db.pokemon_database[key]['Type'][0])

            if len(db.pokemon_database[key]['Type']) > 1:

                data.append(db.pokemon_database[key]['Type'][1])

            else:
                data.append('NULL')

        if 'Form Abilities' in db.pokemon_database[key][form]:
            data.append(db.pokemon_database[key][form]['Form Abilities'][0])

            if len(db.pokemon_database[key][form]['Form Abilities']) > 1:
                data.append(db.pokemon_database[key][form]['Form Abilities'][1])

                if len(db.pokemon_database[key][form]['Form Abilities']) > 2:

                    data.append(db.pokemon_database[key][form]['Form Abilities'][2])
                else:
                    data.append('NULL')

            else:
                data.append('NULL')
                data.append('NULL')
        else:
            data.append('NULL')
            data.append('NULL')
            data.append('NULL')

        if 'Form Hidden Abilities' in db.pokemon_database[key][form]:
            data.append(db.pokemon_database[key][form]['Alolan Hidden Abilities'][0])
            if len(db.pokemon_database[key][form]['Alolan Hidden Abilities']) > 1:
                data.append(db.pokemon_database[key][form]['Alolan Hidden Abilities'][1])

                if len(db.pokemon_database[key][form]['Alolan Hidden Abilities']) > 2:

                    data.append(db.pokemon_database[key][form]['Alolan Hidden Abilities'][2])
                else:
                    data.append('NULL')

            else:
                data.append('NULL')
                data.append('NULL')
        else:
            data.append('NULL')
            data.append('NULL')
            data.append('NULL')
        data.append(db.pokemon_database[key][form]['HP'])
        data.append(db.pokemon_database[key][form]['Attack'])
        data.append(db.pokemon_database[key][form]['Defense'])
        data.append(db.pokemon_database[key][form]['Sp. Attack'])
        data.append(db.pokemon_database[key][form]['Sp. Defense'])
        data.append(db.pokemon_database[key][form]['Speed'])
        data.append(db.pokemon_database[key][form]['Total'])
        data.append(int(db.pokemon_database[key]['Number'][1:]))
        pokemon_list.append(tuple(data))

print(len(pokemon_list[0]))
print(pokemon_list[0])


# Insert Pokemon Forms in DB
cursor.executemany(
    "INSERT INTO pokemon_forms"
    "(name, type_1, type_2, abilities_1, abilities_2, abilities_3, hidden_abilities_1,"
    "hidden_abilities_2, hidden_abilities_3, hp, attack, defense, sp_attack, sp_defense, speed, total, pokemon_id) "
    "VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", pokemon_list
)


"""
for key in db.pokemon_database:
    data = []
    print(db.pokemon_database[key])
    
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
"""
"""
# Insert Pokemons in DB
cursor.executemany(
    "INSERT INTO pokemons VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", correct_pokemon_list
)
"""

conn.commit()

conn.close()
