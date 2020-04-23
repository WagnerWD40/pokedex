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


@eel.expose
def check_if_has_mega_form(number):

    cursor.execute(
        """
        SELECT * FROM pokemon_forms
        INNER JOIN pokemons ON pokemon_forms.pokemon_id=pokemons.id
        WHERE pokemon_id=?
        AND pokemon_forms.name LIKE 'Mega%'
        """, (number,)
    )

    return True if cursor.fetchone() else False


@eel.expose
def check_if_has_alolan_form(number):

    cursor.execute(
        """
        SELECT * FROM pokemon_forms
        INNER JOIN pokemons ON pokemon_forms.pokemon_id=pokemons.id
        WHERE pokemon_id=?
        AND pokemon_forms.name LIKE 'Alolan%'
        """, (number,)
    )

    return True if cursor.fetchone() else False


@eel.expose
def get_mega_form(number):

    cursor.execute(
        """
        SELECT pokemons.id, pokemon_forms.name, pokemons.title, pokemon_forms.type_1, pokemon_forms.type_2,
        pokemon_forms.abilities_1, pokemon_forms.abilities_2, pokemon_forms.abilities_3,
        pokemon_forms.hidden_abilities_1, pokemon_forms.hidden_abilities_2, pokemon_forms.hidden_abilities_3,
        pokemon_forms.hp, pokemon_forms.attack, pokemon_forms.defense, pokemon_forms.sp_attack,
        pokemon_forms.sp_defense, pokemon_forms.speed, pokemon_forms.total
        FROM pokemon_forms
        INNER JOIN pokemons ON pokemon_forms.pokemon_id=pokemons.id
        WHERE pokemon_id = ?
        AND pokemon_forms.name LIKE 'Mega%';
        """, (number,)
    )

    return list(cursor.fetchone())


@eel.expose
def get_alolan_form(number):

    cursor.execute(
        """
        SELECT pokemons.id, pokemon_forms.name, pokemons.title, pokemon_forms.type_1, pokemon_forms.type_2,
        pokemon_forms.abilities_1, pokemon_forms.abilities_2, pokemon_forms.abilities_3,
        pokemon_forms.hidden_abilities_1, pokemon_forms.hidden_abilities_2, pokemon_forms.hidden_abilities_3,
        pokemon_forms.hp, pokemon_forms.attack, pokemon_forms.defense, pokemon_forms.sp_attack,
        pokemon_forms.sp_defense, pokemon_forms.speed, pokemon_forms.total
        FROM pokemon_forms
        INNER JOIN pokemons ON pokemon_forms.pokemon_id=pokemons.id
        WHERE pokemon_id = ?
        AND pokemon_forms.name LIKE 'Alolan%';
        """, (number,)
    )

    return list(cursor.fetchone())


@eel.expose
def get_pokedex_entry(number):

    cursor.execute(
        """
            SELECT entry FROM pokemon_entries
            INNER JOIN pokemons ON pokemon_entries.pokemon_id = pokemons.id
            WHERE pokemons.id=?
            ORDER BY random() LIMIT 1;
        """, (number,)
    )

    return list(cursor.fetchone())


@eel.expose
def get_ability_description(ability):

    cursor.execute(
        """
            SELECT description FROM pokemon_abilities
            WHERE name=?;
        """, (ability,)
    )

    return list(cursor.fetchone())

eel.start('newMain.html', size=(1600, 1000), mode='chrome-app', options={'chromeFlags': ['--disable-http-cache']})

connection.close()
