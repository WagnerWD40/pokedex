from bs4 import BeautifulSoup
from os import path
import requests, re, shutil

POKEMON_NAMES = []  #urls
pokemon_database = {}

# Searching all pokemon names
pokemon_names_url = 'https://bulbapedia.bulbagarden.net/wiki/List_of_Pok%C3%A9mon_by_name'
page = requests.get(pokemon_names_url)

soup = BeautifulSoup(page.text, 'html.parser')
page.close()
raw_data = soup.find_all(style='background:#FFF;')
names = re.compile(r'<a href="/wiki/(.+)_\(Pok%C3%A9mon\)')

for item in raw_data:
    item = str(item)
    data = names.search(item)
    if data:
        POKEMON_NAMES.append(data.group(1))

#print(POKEMON_NAMES)
#print(len(POKEMON_NAMES))

# Searching stats
for index, pokemon_url in enumerate(POKEMON_NAMES):  # SLICING FOR TEST

    url = 'https://bulbapedia.bulbagarden.net/wiki/' + pokemon_url
    page = requests.get(url)

    soup = BeautifulSoup(page.text, 'html.parser')
    page.close()
    correct_name = soup.find(id="firstHeading")
    pokemon = correct_name.string[:-10]
    print(pokemon) ########################

    # IMG DOWNLOADER
    img = soup.find(alt=pokemon)
    if img:
        img_link = img.get('src')
        img_url = "https:" + img_link

        if not path.exists(".\\web\\imgs\\" + pokemon + ".png"):
            response = requests.get(img_url, stream=True)
            with open(".\\web\\imgs\\" + pokemon + ".png", 'wb') as out_file:
                shutil.copyfileobj(response.raw, out_file)
            del response

    # RETRIEVES ALL THE STATS(MEGAS, ETC)
    table_stats = soup.find_all(style="float:right")
    stats = []

    for line in table_stats:
        for item in line:
            stats.append(item)  # poke stats
    if stats: # checks if pokemon is valid (have stats)
        if len(stats) > 7:   # has more than 1 set of Stats
            if all([abs(int(stats[13]) - int(stats[6])) <= 30,  # has been buffed by 10~30 points
            abs(int(stats[13]) - int(stats[6])) > 0  # if it was 0, there are secondary forms with the same Total stats
            ]):
                stats = stats[7:]

        pokemon_database[pokemon] = {}
        pokemon_database[pokemon]['Stats'] = {}
        pokemon_database[pokemon]['Stats']['HP'] = stats[0]
        pokemon_database[pokemon]['Stats']['Attack'] = stats[1]
        pokemon_database[pokemon]['Stats']['Defense'] = stats[2]
        pokemon_database[pokemon]['Stats']['Sp. Attack'] = stats[3]
        pokemon_database[pokemon]['Stats']['Sp. Defense'] = stats[4]
        pokemon_database[pokemon]['Stats']['Speed'] = stats[5]
        pokemon_database[pokemon]['Stats']['Total'] = stats[6]

        # Retrieves the type(grass, poison, etc)
        table_type = soup.find_all(style="color:#FFF;")
        types = [poke_type.string for poke_type in table_type]
        pokemon_database[pokemon]['Type'] = []
        pokemon_database[pokemon]['Type'].append(table_type[0].string)
        if table_type[1].string != 'Unknown':
            pokemon_database[pokemon]['Type'].append(table_type[1].string)

        span = soup.find_all('span')
        if span[6].string:
            pokemon_database[pokemon]['Title'] = span[6].string[:-7] + 'Pokemon'
        else:
            pokemon_database[pokemon]['Title'] = span[6].span.string + ' Pokemon'
        number = soup.find_all(title='List of Pokémon by National Pokédex number')
        pokemon_database[pokemon]['Number'] = number[1].string
        # span[8].string = japanese name

        # Abilities ----
        abilities = []
        hidden_abilities = []
        mega_abilities = []
        alolan_abilities = []
        alolan_hidden_abilities = []
        tables = soup.findAll('table')
        td = tables[15].find_all('td')
        for item in td:

            if item.span.string != 'Cacophony':
                second_check = item.find_all('a')  # checks if a second normal ability exists
                if len(second_check) > 1:
                    abilities.append(second_check[1].span.string)
                if not item.small:
                    abilities.append(item.span.string)
                elif item.small.string == pokemon:
                    abilities.append(item.span.string)
                elif item.small.string:
                    if all([item.small.string.startswith('Alolan'),
                            item.small.string.endswith('Hidden Ability')]):
                        alolan_hidden_abilities.append(item.span.string)
                    elif item.small.string.endswith('Hidden Ability'):
                        hidden_abilities.append(item.span.string)
                    elif item.small.string.startswith('Mega'):
                        mega_abilities.append(item.span.string)
                    elif item.small.string.startswith('Alolan'):
                        alolan_abilities.append(item.span.string)

        #print(stats) ###############################

        pokemon_database[pokemon]['Abilities'] = abilities
        pokemon_database[pokemon]['Hidden Abilities'] = hidden_abilities

        if mega_abilities or pokemon == 'Latios' or pokemon == 'Latias':
            if types[2] != 'Unknown':
                pokemon_database[pokemon]['Mega Type'] = [types[2]]
            if types[3] != 'Unknown':
                pokemon_database[pokemon]['Mega Type'].append(types[3])
            pokemon_database[pokemon]['Mega Abilities'] = mega_abilities
            pokemon_database[pokemon]['Mega Stats'] = {}
            pokemon_database[pokemon]['Mega Stats']['HP'] = stats[7]
            pokemon_database[pokemon]['Mega Stats']['Attack'] = stats[8]
            pokemon_database[pokemon]['Mega Stats']['Defense'] = stats[9]
            pokemon_database[pokemon]['Mega Stats']['Sp. Attack'] = stats[10]
            pokemon_database[pokemon]['Mega Stats']['Sp. Defense'] = stats[11]
            pokemon_database[pokemon]['Mega Stats']['Speed'] = stats[12]
            pokemon_database[pokemon]['Mega Stats']['Total'] = stats[13]

        if alolan_abilities:
            if types[2] != 'Unknown':
                pokemon_database[pokemon]['Alolan Type'] = [types[2]]
            if types[3] != 'Unknown':
                pokemon_database[pokemon]['Alolan Type'].append(types[3])
            pokemon_database[pokemon]['Alolan Abilities'] = alolan_abilities
            pokemon_database[pokemon]['Alolan Stats'] = {}
            if len(stats) > 7:
                pokemon_database[pokemon]['Alolan Stats']['HP'] = stats[7]
                pokemon_database[pokemon]['Alolan Stats']['Attack'] = stats[8]
                pokemon_database[pokemon]['Alolan Stats']['Defense'] = stats[9]
                pokemon_database[pokemon]['Alolan Stats']['Sp. Attack'] = stats[10]
                pokemon_database[pokemon]['Alolan Stats']['Sp. Defense'] = stats[11]
                pokemon_database[pokemon]['Alolan Stats']['Speed'] = stats[12]
                pokemon_database[pokemon]['Alolan Stats']['Total'] = stats[13]
            else:
                pokemon_database[pokemon]['Alolan Stats']['HP'] = stats[0]
                pokemon_database[pokemon]['Alolan Stats']['Attack'] = stats[1]
                pokemon_database[pokemon]['Alolan Stats']['Defense'] = stats[2]
                pokemon_database[pokemon]['Alolan Stats']['Sp. Attack'] = stats[3]
                pokemon_database[pokemon]['Alolan Stats']['Sp. Defense'] = stats[4]
                pokemon_database[pokemon]['Alolan Stats']['Speed'] = stats[5]
                pokemon_database[pokemon]['Alolan Stats']['Total'] = stats[6]
        if alolan_hidden_abilities:
            pokemon_database[pokemon]['Alolan Hidden Abilities'] = alolan_hidden_abilities

        if len(stats) > 7 and not mega_abilities and not alolan_abilities:  # pokemon has alternative forms
            alt_forms = (len(stats) // 7) - 1  # 7 stats for each form, minus the base form
            h5 = soup.findAll('h5')
            form_names = [form.string for form in h5]
            form_name_index = alt_forms
            #print(form_names)       ##########################

            for form in range(alt_forms):
                form_number = form + 1
                form_start_index = 7 * form_number
                form_label = 'Alt Form ' + str(form_number) + ' Stats'
                pokemon_database[pokemon][form_label] = {}
                pokemon_database[pokemon][form_label]['Form Name'] = form_names[-form_name_index]
                if types[form_number * 2] != 'Unknown':
                    pokemon_database[pokemon][form_label]['Form Type'] = [types[form_number * 2]]
                if types[(form_number * 2) + 1] != 'Unknown':
                    pokemon_database[pokemon][form_label]['Form Type'].append(types[(form_number * 2) + 1])
                pokemon_database[pokemon][form_label]['HP'] = stats[form_start_index]
                pokemon_database[pokemon][form_label]['Attack'] = stats[form_start_index + 1]
                pokemon_database[pokemon][form_label]['Defense'] = stats[form_start_index + 2]
                pokemon_database[pokemon][form_label]['Sp. Attack'] = stats[form_start_index + 3]
                pokemon_database[pokemon][form_label]['Sp. Defense'] = stats[form_start_index + 4]
                pokemon_database[pokemon][form_label]['Speed'] = stats[form_start_index + 5]
                pokemon_database[pokemon][form_label]['Total'] = stats[form_start_index + 6]
                form_name_index -= 1



    #print(abilities)

# TEST
#print(pokemon_database['Abra'])
#print(pokemon_database['Abomasnow'])
#print(pokemon_database['Absol'])
#print(pokemon_database['Accelgor'])

#print(pokemon_database)


with open('pokemon_db_test.py', 'w', encoding="utf-8") as file:
    file.write('# -*- coding: utf-8 -*-\n')
    file.write('pokemon_database = {\n')
    for key in sorted(pokemon_database.keys()):
        file.write('"' + key + '":' + str(pokemon_database[key]) + ',\n')
    file.write('}')


