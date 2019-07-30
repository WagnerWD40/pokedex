from bs4 import BeautifulSoup
from bs4 import NavigableString
import requests


def check_key(dic, key):
    if key in dic.keys():
        return True
    return False


POKEMON_NAMES = ['Abomasnow', 'Abra', 'Absol', 'Accelgor', 'Aegislash', 'Aerodactyl', 'Aggron', 'Aipom', 'Alakazam', 'Alcremie', 'Alomomola', 'Altaria', 'Amaura', 'Ambipom', 'Amoonguss', 'Ampharos', 'Anorith', 'Araquanid', 'Arbok', 'Arcanine', 'Arceus', 'Archen', 'Archeops', 'Ariados', 'Armaldo', 'Aromatisse', 'Aron', 'Articuno', 'Audino', 'Aurorus', 'Avalugg', 'Axew', 'Azelf', 'Azumarill', 'Azurill', 'Bagon', 'Baltoy', 'Banette', 'Barbaracle', 'Barboach', 'Basculin', 'Bastiodon', 'Bayleef', 'Beartic', 'Beautifly', 'Beedrill', 'Beheeyem', 'Beldum', 'Bellossom', 'Bellsprout', 'Bergmite', 'Bewear', 'Bibarel', 'Bidoof', 'Binacle', 'Bisharp', 'Blacephalon', 'Blastoise', 'Blaziken', 'Blissey', 'Blitzle', 'Boldore', 'Bonsly', 'Bouffalant', 'Bounsweet', 'Braixen', 'Braviary', 'Breloom', 'Brionne', 'Bronzong', 'Bronzor', 'Bruxish', 'Budew', 'Buizel', 'Bulbasaur', 'Buneary', 'Bunnelby', 'Burmy', 'Butterfree', 'Buzzwole', 'Cacnea', 'Cacturne', 'Camerupt', 'Carbink', 'Carnivine', 'Carracosta', 'Carvanha', 'Cascoon', 'Castform', 'Caterpie', 'Celebi', 'Celesteela', 'Chandelure', 'Chansey', 'Charizard', 'Charjabug', 'Charmander', 'Charmeleon', 'Chatot', 'Cherrim', 'Cherubi', 'Chesnaught', 'Chespin', 'Chikorita', 'Chimchar', 'Chimecho', 'Chinchou', 'Chingling', 'Cinccino', 'Clamperl', 'Clauncher', 'Clawitzer', 'Claydol', 'Clefable', 'Clefairy', 'Cleffa', 'Cloyster', 'Cobalion', 'Cofagrigus', 'Combee', 'Combusken', 'Comfey', 'Conkeldurr', 'Corphish', 'Corsola', 'Corviknight', 'Cosmoem', 'Cosmog', 'Cottonee', 'Crabominable', 'Crabrawler', 'Cradily', 'Cranidos', 'Crawdaunt', 'Cresselia', 'Croagunk', 'Crobat', 'Croconaw', 'Crustle', 'Cryogonal', 'Cubchoo', 'Cubone', 'Cutiefly', 'Cyndaquil', 'Darkrai', 'Darmanitan', 'Dartrix', 'Darumaka', 'Decidueye', 'Dedenne', 'Deerling', 'Deino', 'Delcatty', 'Delibird', 'Delphox', 'Deoxys', 'Dewgong', 'Dewott', 'Dewpider', 'Dhelmise', 'Dialga', 'Diancie', 'Diggersby', 'Diglett', 'Ditto', 'Dodrio', 'Doduo', 'Donphan', 'Doublade', 'Dragalge', 'Dragonair', 'Dragonite', 'Drampa', 'Drapion', 'Dratini', 'Drednaw', 'Drifblim', 'Drifloon', 'Drilbur', 'Drowzee', 'Druddigon', 'Ducklett', 'Dugtrio', 'Dunsparce', 'Duosion', 'Duraludon', 'Durant', 'Dusclops', 'Dusknoir', 'Duskull', 'Dustox', 'Dwebble', 'Eelektrik', 'Eelektross', 'Eevee', 'Ekans', 'Eldegoss', 'Electabuzz', 'Electivire', 'Electrike', 'Electrode', 'Elekid', 'Elgyem', 'Emboar', 'Emolga', 'Empoleon', 'Entei', 'Escavalier', 'Espeon', 'Espurr', 'Excadrill', 'Exeggcute', 'Exeggutor', 'Exploud', 'Farfetchd', 'Fearow', 'Feebas', 'Fennekin', 'Feraligatr', 'Ferroseed', 'Ferrothorn', 'Finneon', 'Flaaffy', 'Flabebe', 'Flareon', 'Fletchinder', 'Fletchling', 'Floatzel', 'Floette', 'Florges', 'Flygon', 'Fomantis', 'Foongus', 'Forretress', 'Fraxure', 'Frillish', 'Froakie', 'Frogadier', 'Froslass', 'Furfrou', 'Furret', 'Gabite', 'Gallade', 'Galvantula', 'Garbodor', 'Garchomp', 'Gardevoir', 'Gastly', 'Gastrodon', 'Genesect', 'Gengar', 'Geodude', 'Gible', 'Gigalith', 'Girafarig', 'Giratina', 'Glaceon', 'Glalie', 'Glameow', 'Gligar', 'Gliscor', 'Gloom', 'Gogoat', 'Golbat', 'Goldeen', 'Golduck', 'Golem', 'Golett', 'Golisopod', 'Golurk', 'Goodra', 'Goomy', 'Gorebyss', 'Gossifleur', 'Gothita', 'Gothitelle', 'Gothorita', 'Gourgeist', 'Granbull', 'Graveler', 'Greninja', 'Grimer', 'Grookey', 'Grotle', 'Groudon', 'Grovyle', 'Growlithe', 'Grubbin', 'Grumpig', 'Gulpin', 'Gumshoos', 'Gurdurr', 'Guzzlord', 'Gyarados', 'Hakamo-o', 'Happiny', 'Hariyama', 'Haunter', 'Hawlucha', 'Haxorus', 'Heatmor', 'Heatran', 'Heliolisk', 'Helioptile', 'Heracross', 'Herdier', 'Hippopotas', 'Hippowdon', 'Hitmonchan', 'Hitmonlee', 'Hitmontop', 'Ho-Oh', 'Honchkrow', 'Honedge', 'Hoopa', 'Hoothoot', 'Hoppip', 'Horsea', 'Houndoom', 'Houndour', 'Huntail', 'Hydreigon', 'Hypno', 'Igglybuff', 'Illumise', 'Impidimp', 'Incineroar', 'Infernape', 'Inkay', 'Ivysaur', 'Jangmo-o', 'Jellicent', 'Jigglypuff', 'Jirachi', 'Jolteon', 'Joltik', 'Jumpluff', 'Jynx', 'Kabuto', 'Kabutops', 'Kadabra', 'Kakuna', 'Kangaskhan', 'Karrablast', 'Kartana', 'Kecleon', 'Keldeo', 'Kingdra', 'Kingler', 'Kirlia', 'Klang', 'Klefki', 'Klink', 'Klinklang', 'Koffing', 'Komala', 'Kommo-o', 'Krabby', 'Kricketot', 'Kricketune', 'Krokorok', 'Krookodile', 'Kyogre', 'Kyurem', 'Lairon', 'Lampent', 'Landorus', 'Lanturn', 'Lapras', 'Larvesta', 'Larvitar', 'Latias', 'Latios', 'Leafeon', 'Leavanny', 'Ledian', 'Ledyba', 'Lickilicky', 'Lickitung', 'Liepard', 'Lileep', 'Lilligant', 'Lillipup', 'Linoone', 'Litleo', 'Litten', 'Litwick', 'Lombre', 'Lopunny', 'Lotad', 'Loudred', 'Lucario', 'Ludicolo', 'Lugia', 'Lumineon', 'Lunala', 'Lunatone', 'Lurantis', 'Luvdisc', 'Luxio', 'Luxray', 'Lycanroc', 'Machamp', 'Machoke', 'Machop', 'Magby', 'Magcargo', 'Magearna', 'Magikarp', 'Magmar', 'Magmortar', 'Magnemite', 'Magneton', 'Magnezone', 'Makuhita', 'Malamar', 'Mamoswine', 'Manaphy', 'Mandibuzz', 'Manectric', 'Mankey', 'Mantine', 'Mantyke', 'Maractus', 'Mareanie', 'Mareep', 'Marill', 'Marowak', 'Marshadow', 'Marshtomp', 'Masquerain', 'Mawile', 'Medicham', 'Meditite', 'Meganium', 'Melmetal', 'Meloetta', 'Meltan', 'Meowstic', 'Meowth', 'Mesprit', 'Metagross', 'Metang', 'Metapod', 'Mew', 'Mewtwo', 'Mienfoo', 'Mienshao', 'Mightyena', 'Milotic', 'Miltank', 'Mime-Jr', 'Mimikyu', 'Minccino', 'Minior', 'Minun', 'Misdreavus', 'Mismagius', 'Moltres', 'Monferno', 'Morelull', 'Mothim', 'Mr-Mime', 'Mudbray', 'Mudkip', 'Mudsdale', 'Muk', 'Munchlax', 'Munna', 'Murkrow', 'Musharna', 'Naganadel', 'Natu', 'Necrozma', 'Nidoking', 'Nidoqueen', 'Nidoran-f', 'Nidoran-m', 'Nidorina', 'Nidorino', 'Nihilego', 'Nincada', 'Ninetales', 'Ninjask', 'Noctowl', 'Noibat', 'Noivern', 'Nosepass', 'Numel', 'Nuzleaf', 'Octillery', 'Oddish', 'Omanyte', 'Omastar', 'Onix', 'Oranguru', 'Oricorio', 'Oshawott', 'Pachirisu', 'Palkia', 'Palossand', 'Palpitoad', 'Pancham', 'Pangoro', 'Panpour', 'Pansage', 'Pansear', 'Paras', 'Parasect', 'Passimian', 'Patrat', 'Pawniard', 'Pelipper', 'Persian', 'Petilil', 'Phanpy', 'Phantump', 'Pheromosa', 'Phione', 'Pichu', 'Pidgeot', 'Pidgeotto', 'Pidgey', 'Pidove', 'Pignite', 'Pikachu', 'Pikipek', 'Piloswine', 'Pineco', 'Pinsir', 'Piplup', 'Plusle', 'Poipole', 'Politoed', 'Poliwag', 'Poliwhirl', 'Poliwrath', 'Ponyta', 'Poochyena', 'Popplio', 'Porygon', 'Porygon2', 'Porygon-Z', 'Primarina', 'Primeape', 'Prinplup', 'Probopass', 'Psyduck', 'Pumpkaboo', 'Pupitar', 'Purrloin', 'Purugly', 'Pyroar', 'Pyukumuku', 'Quagsire', 'Quilava', 'Quilladin', 'Qwilfish', 'Raichu', 'Raikou', 'Ralts', 'Rampardos', 'Rapidash', 'Raticate', 'Rattata', 'Rayquaza', 'Regice', 'Regigigas', 'Regirock', 'Registeel', 'Relicanth', 'Remoraid', 'Reshiram', 'Reuniclus', 'Rhydon', 'Rhyhorn', 'Rhyperior', 'Ribombee', 'Riolu', 'Rockruff', 'Roggenrola', 'Rolycoly', 'Roselia', 'Roserade', 'Rotom', 'Rowlet', 'Rufflet', 'Sableye', 'Salamence', 'Salandit', 'Salazzle', 'Samurott', 'Sandile', 'Sandshrew', 'Sandslash', 'Sandygast', 'Sawk', 'Sawsbuck', 'Scatterbug', 'Sceptile', 'Scizor', 'Scolipede', 'Scorbunny', 'Scrafty', 'Scraggy', 'Scyther', 'Seadra', 'Seaking', 'Sealeo', 'Seedot', 'Seel', 'Seismitoad', 'Sentret', 'Serperior', 'Servine', 'Seviper', 'Sewaddle', 'Sharpedo', 'Shaymin', 'Shedinja', 'Shelgon', 'Shellder', 'Shellos', 'Shelmet', 'Shieldon', 'Shiftry', 'Shiinotic', 'Shinx', 'Shroomish', 'Shuckle', 'Shuppet', 'Sigilyph', 'Silcoon', 'Silvally', 'Simipour', 'Simisage', 'Simisear', 'Skarmory', 'Skiddo', 'Skiploom', 'Skitty', 'Skorupi', 'Skrelp', 'Skuntank', 'Slaking', 'Slakoth', 'Sliggoo', 'Slowbro', 'Slowking', 'Slowpoke', 'Slugma', 'Slurpuff', 'Smeargle', 'Smoochum', 'Sneasel', 'Snivy', 'Snorlax', 'Snorunt', 'Snover', 'Snubbull', 'Sobble', 'Solgaleo', 'Solosis', 'Solrock', 'Spearow', 'Spewpa', 'Spheal', 'Spinarak', 'Spinda', 'Spiritomb', 'Spoink', 'Spritzee', 'Squirtle', 'Stakataka', 'Stantler', 'Staraptor', 'Staravia', 'Starly', 'Starmie', 'Staryu', 'Steelix', 'Steenee', 'Stoutland', 'Stufful', 'Stunfisk', 'Stunky', 'Sudowoodo', 'Suicune', 'Sunflora', 'Sunkern', 'Surskit', 'Swablu', 'Swadloon', 'Swalot', 'Swampert', 'Swanna', 'Swellow', 'Swinub', 'Swirlix', 'Swoobat', 'Sylveon', 'Taillow', 'Talonflame', 'Tangela', 'Tangrowth', 'Tapu-Bulu', 'Tapu-Fini', 'Tapu-Koko', 'Tapu-Lele', 'Tauros', 'Teddiursa', 'Tentacool', 'Tentacruel', 'Tepig', 'Terrakion', 'Throh', 'Thundurus', 'Timburr', 'Tirtouga', 'Togedemaru', 'Togekiss', 'Togepi', 'Togetic', 'Torchic', 'Torkoal', 'Tornadus', 'Torracat', 'Torterra', 'Totodile', 'Toucannon', 'Toxapex', 'Toxicroak', 'Tranquill', 'Trapinch', 'Treecko', 'Trevenant', 'Tropius', 'Trubbish', 'Trumbeak', 'Tsareena', 'Turtonator', 'Turtwig', 'Tympole', 'Tynamo', 'Type-Null', 'Typhlosion', 'Tyranitar', 'Tyrantrum', 'Tyrogue', 'Tyrunt', 'Umbreon', 'Unfezant', 'Unown', 'Ursaring', 'Uxie', 'Vanillish', 'Vanillite', 'Vanilluxe', 'Vaporeon', 'Venipede', 'Venomoth', 'Venonat', 'Venusaur', 'Vespiquen', 'Vibrava', 'Victini', 'Victreebel', 'Vigoroth', 'Vikavolt', 'Vileplume', 'Virizion', 'Vivillon', 'Volbeat', 'Volcanion', 'Volcarona', 'Voltorb', 'Vullaby', 'Vulpix', 'Wailmer', 'Wailord', 'Walrein', 'Wartortle', 'Watchog', 'Weavile', 'Weedle', 'Weepinbell', 'Weezing', 'Whimsicott', 'Whirlipede', 'Whiscash', 'Whismur', 'Wigglytuff', 'Wimpod', 'Wingull', 'Wishiwashi', 'Wobbuffet', 'Woobat', 'Wooloo', 'Wooper', 'Wormadam', 'Wormadam', 'Wormadam', 'Wurmple', 'Wynaut', 'Xatu', 'Xerneas', 'Xurkitree', 'Yamask', 'Yamper', 'Yanma', 'Yanmega', 'Yungoos', 'Yveltal', 'Zacian', 'Zamazenta', 'Zangoose', 'Zapdos', 'Zebstrika', 'Zekrom', 'Zeraora', 'Zigzagoon', 'Zoroark', 'Zorua', 'Zubat', 'Zweilous', 'Zygarde']


move_db = {}

for name in POKEMON_NAMES:
    print(name)

    url = 'https://pokemondb.net/pokedex/' + name
    with requests.get(url) as page:
        soup = BeautifulSoup(page.text, 'html.parser')

    h3 = soup.find_all('h3')

    move_db[name] = {}

    for category in h3:
        if category.string not in move_db[name].keys():
            move_db[name][category.string] = []
            data = list(category.next_siblings)
            if len(data) > 3:
                for item in data[3]:
                    #print(item)
                    if not isinstance(item, NavigableString) and not isinstance(item, str):
                        all_tr = item.find_all('tr')
                        for tr in all_tr:
                            move_data = tr.find_all('td')
                            if len(move_data) > 1:
                                data1, data2, *_ = move_data
                                move = (data1.string, data2.string)
                                if move:
                                    move_db[name][category.string].append(move)
        else:
            move_db[name][category.string + ' alt'] = []
            data = list(category.next_siblings)
            if len(data) > 3:
                for item in data[3]:
                    if not isinstance(item, NavigableString):
                        all_tr = item.find_all('tr')
                        for tr in all_tr:
                            move_data = tr.find_all('td')
                            if len(move_data) > 1:
                                data1, data2, *_ = move_data
                                move = (data1.string, data2.string)
                                if move:
                                    move_db[name][category.string + ' alt'].append(move)

    #for moveset in name.keys():
    #   print(moveset, name[moveset])
    pokemon = name

    if check_key(move_db[pokemon], 'Moves learnt by level up'):
        level_up1 = move_db[pokemon]['Moves learnt by level up']
    if check_key(move_db[pokemon], 'Moves learnt by level up alt'):
        level_up2 = move_db[pokemon]['Moves learnt by level up alt']
    if check_key(move_db[pokemon], "Moves learnt by TM"):
        tm1 = move_db[pokemon]["Moves learnt by TM"]
    if check_key(move_db[pokemon], "Moves learnt by TM alt"):
        tm2 = move_db[pokemon]["Moves learnt by TM alt"]

    if level_up1 and level_up2:
        if level_up1 == level_up2:
            if check_key(move_db[pokemon], 'Moves learnt by level up alt'):
                del move_db[pokemon]['Moves learnt by level up alt']
    if tm1 and tm2:
        if tm1 == tm2:
            if check_key(move_db[pokemon], "Moves learnt by TM alt"):
                del move_db[pokemon]["Moves learnt by TM alt"]

with open('learnset_db.py', 'w', encoding="utf-8") as file:
    file.write('# -*- coding: utf-8 -*-\n')
    file.write('learnset_db = {\n')
    for pokemon in sorted(move_db.keys()):
        file.write('"' + pokemon + '": ' + '{\n')
        for set in move_db[pokemon].keys():
            file.write('"' + set + '": ' + str(move_db[pokemon][set]) + ',\n')
        file.write("},\n")
    file.write("}")