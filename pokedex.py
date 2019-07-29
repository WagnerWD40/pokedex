# -*- coding: ISO-8859-1 -*-
import pokemon_db as db
import pokedex_entries_db as entries_db
import abilities_db as a_db
import eel
from random import choice

eel.init('web', allowed_extensions=['.js', '.html', '.css'])


@eel.expose
def search_by_number(number):
    number = int(number)
    number = str(number)
    if len(number) < 3:  # 3 is the number of digits of a pokemon number ('#001')
        number = '0' * (3 - len(number)) + number
    number = '#' + number

    for key in db.pokemon_database:
        if db.pokemon_database[key]['Number'] == number:
            print(key, db.pokemon_database[key])

            return key, db.pokemon_database[key]


@eel.expose
def search_by_name(name):
    name = str(name).title()

    if name in db.pokemon_database.keys():

        return db.pokemon_database[name]['Number'][1:]
    else:

        return 1


@eel.expose
def search_ability(ability):
    if ability in a_db.abilities_database.keys():
        return a_db.abilities_database[ability]


@eel.expose
def search_pokedex_entry(pokemon_name):
    if pokemon_name in entries_db.pokedex_entries_db.keys():
        return choice(entries_db.pokedex_entries_db[pokemon_name])


eel.start('main.html', size=(1250, 720), mode='chrome-app', options={'chromeFlags': ['--disable-http-cache']})

# TODO Attack Dex
# TODO Image transitions
# TODO Colors of stats bars
# TODO Min-Max stats as tooltips(maybe)
