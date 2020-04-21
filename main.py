# -*- coding: ISO-8859-1 -*-
import sqlite3
import eel

connection = sqlite3.connect('pokemon.db')
cursor = connection.cursor()

eel.init('web', allowed_extensions=['.js', '.html', '.css'])

@eel.expose
def search_by_number(number):

    cursor.execute(
        'SELECT * FROM pokemons WHERE id=?', (number,)
    )

    return list(cursor.fetchone())


eel.start('newMain.html', size=(1600, 1000), mode='chrome-app', options={'chromeFlags': ['--disable-http-cache']})
#search_by_number(1)

connection.close()
