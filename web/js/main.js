
function changeData(number) {
	let pokemon = eel.search_by_number(number)();
	let statBarMax = 200;

	pokemon.then((value)=> {
		let poke_name = value[0];
		let poke_number = value[1]['Number'];
		let poke_title = value[1]['Title'];
		let poke_type = value[1]['Type'];
		let poke_abilities = value[1]['Abilities'];
		let poke_hidden_abilities = value[1]['Hidden Abilities'];
		let poke_stats = value[1]['Stats'];

		pokemonEntry(poke_name);

		//Mega
		//Checks if pokemon has Mega 
		if (value[1]['Mega Stats']) {
			mega_checker = true;
		} else {
			mega_checker = false;
		}

		document.getElementById("megaBtn").classList.toggle("active-button", mega_checker);
		document.getElementById("megaBtn").classList.toggle("inactive-button", !mega_checker);

		//Special case for Y Megas

		if (mega_two) {
			poke_name = 'Mega ' + value[0] + ' Y';
			poke_type = value[1]['Mega 2 Type'];
			poke_abilities = value[1]['Mega 2 Abilities'];
			poke_hidden_abilities = '';
			poke_stats = value[1]['Mega 2 Stats'];			

		}

		//Change stats to/from Mega
		if (mega && !mega_two) {
			poke_name = 'Mega ' + value[0];

			if (poke_name === 'Mega Charizard' || poke_name === 'Mega Mewtwo') {
				poke_name += ' X'
			}

			if (value[1]['Mega Type']) {
				if (value[1]['Mega Type'][0] != 'Unknown') {
					poke_type = value[1]['Mega Type'];
				}
			}
			
			poke_abilities = value[1]['Mega Abilities'];
			poke_hidden_abilities = '';
			poke_stats = value[1]['Mega Stats'];
		} 

		//Alternative Forms
		//Checks if pokemon has Alternative Forms
		if (value[1]['Alt Form 1 Stats'] || value[1]['Alolan Stats'] ) {
			forms_checker = true;
			if (value[1]['Alt Form 1 Stats']) {
				alt_forms_checker = true;
			} else if (value[1]['Alolan Stats']) {
				alola_checker = true;
			}	
		} else {
			forms_checker = false;
			alt_forms_checker = false;
			alola_checker = false;
		}

		document.getElementById("formsBtn").classList.toggle("active-button", forms_checker);
		document.getElementById("formsBtn").classList.toggle("inactive-button", !forms_checker);

		//Change data to Alt Form/Alola
		if (forms) {
			if (alola_checker) {
				poke_name = 'Alolan ' + value[0];
				poke_type = value[1]['Alolan Type'];
				poke_abilities = value[1]['Alolan Abilities'];
				poke_stats = value[1]['Alolan Stats'];
				if (value[1]['Alolan Hidden Abilities']) { 
					poke_hidden_abilities = value[1]['Alolan Hidden Abilities'];
				}

			} else if (alt_forms_checker) {
				poke_name = value[0] + '/' + value[1]['Alt Form ' + String(form_number) + ' Stats']['Form Name'];
				if (value[1]['Alt Form ' + String(form_number) + ' Stats']['Form Type']) {
					poke_type = value[1]['Alt Form ' + String(form_number) + ' Stats']['Form Type'];
				}

				if (value[1]['Alt Form ' + String(form_number) + ' Stats']['Form Abilities']) {
					poke_abilities = value[1]['Alt Form ' + String(form_number) + ' Stats']['Form Abilities'];
				}

				if (value[1]['Alt Form ' + String(form_number) + ' Stats']['Form Hidden Abilities']) {
					poke_hidden_abilities = value[1]['Alt Form ' + String(form_number) + ' Stats']['Form Hidden Abilities'];
				}

				poke_stats = value[1]['Alt Form ' + String(form_number) + ' Stats'];
			}
		}

		//Details
		document.getElementById("poke_name").innerHTML = poke_name;
		document.getElementById("poke_number").innerHTML = poke_number;
		poke_title = poke_title || "";
		
		document.getElementById("poke_title").innerHTML = poke_title;

		//Pokemon Image
		document.getElementById("pokepic").src = ".\\imgs\\" + poke_name + ".png";
		if (poke_name == 'Type: Null') { //Because of the name of the file for Type: Null Pokemon
			document.getElementById("pokepic").src = ".\\imgs\\Type_Null.png";
		}
		
		if (mega) {
			document.getElementById("pokepic").src = ".\\imgs\\" + poke_name.slice(5) + "-Mega" + ".png";
		}

		if (mega_two) {
			document.getElementById("pokepic").src = ".\\imgs\\" + poke_name.slice(5) + "-Mega Y" + ".png";
		}

		if (forms) {
			if (alola_checker) {
				document.getElementById("pokepic").src = ".\\imgs\\" + value[0] + "-Alola" + ".png";		
			} else if (alt_forms_checker) {
				document.getElementById("pokepic").src = ".\\imgs\\" + value[0] + "-" + value[1]['Alt Form ' + String(form_number) + ' Stats']['Form Name'] + ".png";
			}
		}

		//Type
		document.getElementById("poke_type1").innerHTML = poke_type[0];
		document.getElementById("poke_type2").innerHTML = poke_type[1] || "";
		
		type_list.forEach(type => {
			document.getElementById("poke_type1").classList.remove(type);
		});
		document.getElementById("poke_type1").classList.add(poke_type[0].toLowerCase());
				
		if (poke_type[1]) {
			type_list.forEach(type => {
				document.getElementById("poke_type2").classList.remove(type);
			});
			document.getElementById("poke_type2").classList.add(poke_type[1].toLowerCase());
		}
		
		// Abilities

		const poke_ability_list = [
			poke_abilities[0],
			poke_abilities[1],
			poke_hidden_abilities[0],
			poke_hidden_abilities[1]
		]
		
		const poke_ability_id_list = [
			'#poke_ability1',
			'#poke_ability2',
			'#poke_hidden_ability1',
			'#poke_hidden_ability2'
		]

		poke_ability_id_list.forEach((ability, index)=> {
			document.getElementById(ability.slice(1)).innerHTML = poke_ability_list[index] || "";

			searchAbility(poke_ability_list[index]).then((data)=> {
				$(function () {
	  			$(ability).tooltip()	
	  							 .attr('data-original-title', data)
								 .tooltip('_fixTitle')
						 		 .tooltip('hide');
 		 		})
			});
		});	

		//Stats
		let id_list = [
			"poke_hp", 
			"poke_attack",
			"poke_defense",
			"poke_spattack",
			"poke_spdefense",
			"poke_speed",
			"poke_total"
		]

		let stats_list = [
			poke_stats['HP'],
			poke_stats['Attack'],
			poke_stats['Defense'],
			poke_stats['Sp. Attack'],
			poke_stats['Sp. Defense'],
			poke_stats['Speed'],
			poke_stats['Total']
		]

		id_list.forEach((id, index)=> {
			document.getElementById(id).innerHTML = stats_list[index];
		});

		//Bars
		id_list.slice(0, 6).forEach((id, index)=> {
			document.getElementById(id + "_bar").style = `width: calc(100% * ${Number(stats_list[index])}/${statBarMax})`;
		});

		if (value[1]['Alt Form ' + String(form_number + 1) + ' Stats']) {
			next_form_flag = true;
		} else {
			next_form_flag = false;
		}

		if (!forms && !mega && !mega_two) {
			searchMoveset();
		}

	});

}

function dexSearch() {
	// Search the database for all pokemon base data

	mega = false;
	forms = false;	
	mega_two = false;
	
	let name_search = document.forms["search"]["search_name"];
	let pokemon_number = eel.search_by_name(name_search.value)();

	document.forms["search"].reset();
	
	pokemon_number.then((value)=> {
	 	
	 	active_pokemon = value;
	 	changeData(active_pokemon);
	 	console.log(active_pokemon);
	})
}

function dexRotate(direction) {
	// Mechanics for the two big buttons

	mega = false;
	forms = false;	
	mega_two = false;
	///next_form_flag = false;
	
	let number;
	let button;

	if (direction == "Right") {
		number = 1;
		button = "right_button"
	} else {
		number = -1;
		button = "left_button"
	}
	
	document.getElementById(button).style.transform = 'translate3d(3px, 3px, 0px)';
	active_pokemon = Number(active_pokemon);
	active_pokemon += number;
	
	if (active_pokemon < 1) {
		active_pokemon = 809;
	}
	
	if (active_pokemon > 809) {
		active_pokemon = 1;
	}			
	changeData(active_pokemon);
	setTimeout(() => {
		document.getElementById(button).style.transform = 'translate3d(0px, 0px, 0px)';
	}, 250);

}

function checkKey(e) {
	// Keyboard controls

    e = e || window.event;

    if (e.keyCode == '38') {
        // up arrow
        changeMega();
    }
    else if (e.keyCode == '40') {
        // down arrow
        changeForms();
    }
    else if (e.keyCode == '37') {
       // left arrow
       dexRotate("Left");
    }
    else if (e.keyCode == '39') {
       // right arrow
       dexRotate("Right");
    }
}

function searchAbility(ability) {
	// search the abilities description for the Ability Tooltips

	let search = eel.search_ability(ability)();
	let result;

	result = search.then((value)=> {
		let description = value;
		return description;
	})
	return result;
}

function changeMega() {
	// Mechanics to aid in showing the Mega forms

	if (!mega && mega_checker) {
		mega = true;
		changeData(active_pokemon);
	} else if (mega && !mega_two && active_pokemon == 6) {
		mega = true;
		mega_two = true;
		changeData(active_pokemon);
	} else if (mega && !mega_two && active_pokemon == 150) {
		mega = true;
		mega_two = true;
		changeData(active_pokemon);
	} else if (mega && mega_two) {
		mega = false;
		mega_two = false;
		changeData(active_pokemon);
	} else {
		mega = false;
		mega_two = false;
		changeData(active_pokemon);
	}
}

function changeForms() {
	// The mechanics for showing a the different forms of a pokemon

	if (!forms && forms_checker) {
		forms = true;
		changeData(active_pokemon);
	} else if (forms && next_form_flag) {
		form_number += 1;
		changeData(active_pokemon);
	} else {
		form_number = 1;
		forms = false;
		changeData(active_pokemon);
	}
}

function pokemonEntry(poke_name) {
	// Search the database for the Pokemon Entry data to be displayed

	let entry = eel.search_pokedex_entry(poke_name)();
	entry.then(data => document.getElementById("dex_entry").innerHTML = data);
}

function showHide() {
	// Show and hide the right hand menu

	document.getElementById('info_tab').classList.toggle("info-invisible");
	document.getElementById('moveset_tab').classList.toggle("info-invisible");
	document.getElementById('info_tab').classList.toggle("info-visible");
	document.getElementById('moveset_tab').classList.toggle("info-visible");	
}


function searchMoveset() {
	// Search the database for the Learnset of the pokemon and populate the move list

	let pokemon = document.getElementById("poke_name").innerHTML;
	let moveset = eel.search_moveset(pokemon)();
	
	moveset.then((data)=> {
		let move_list =	data;
		let table = '';
		test.length = 0;

		for (let move in move_list) {
			table += '<tr>\n';
			table += '<td class="level">' + String(move_list[move][0]) + '</td>\n';
			table += '<td id="' + move_list[move][1] + '" onmouseover="moveShowStats(this.id);">' + move_list[move][1] + '</td>\n';
			table += '</tr>\n';

		document.getElementById("move_table").innerHTML = table;

		}

	}); 
}

function moveShowStats(move) {
	// Fills in the move info block 
	const move_class_css_class = [
		"physical",
		"special",
		"status"
	]

	const move_info_ids = [
		"move_type",
		"move_power_value",
		"move_accuracy_value",
		"move_class",
		"move_effects"
	]

	let move_data = eel.search_move(move)();

	document.getElementById("move_name").innerHTML = move;
	
	move_data.then((data)=> {
		const data_list = [
			data["Type"],
			data["Power"],
			data["Accuracy"],
			data["Class"],
			data["Effects"]
		]

		move_info_ids.forEach((id, index)=> {
			document.getElementById(id).innerHTML = data_list[index];
		});

		//STYLE

		type_list.forEach(type => {
			document.getElementById("move_type").classList.toggle(type, type === data["Type"].toLowerCase())
			document.getElementById("move_power").classList.toggle(type, type === data["Type"].toLowerCase())
			document.getElementById("move_accuracy").classList.toggle(type, type === data["Type"].toLowerCase())
		});
	
		move_class_css_class.forEach(move_class => {
			document.getElementById("move_class").classList.toggle(move_class, move_class === data["Class"].toLowerCase());
		});

	});
}

document.onkeydown = checkKey;

let mega_checker = false; 	 //flag to check if pokemon has a mega form
let mega = false;			//flag for active form in screen
let forms_checker = false; 	 //flag to check if pokemon has a alt forms
let forms = false;			//flag for active form in screen
let alt_forms_checker = false;	//flag to check if the form is a transformation
let form_number = 1;			//sets active form for alternate forms
let next_form_flag = false;		//checks if next form is valid
let alola_checker = false;		//flag to check if the form is Alolan
let mega_two = false;			//band-aid for the Y megas			
let active_pokemon = 1;

const test = [];

const type_list = [
	"normal", 
	"fire", 
	"fighting", 
	"water", 
	"flying", 
	"grass", 
	"poison", 
	"electric", 
	"ground", 
	"psychic", 
	"rock", 
	"ice", 
	"bug", 
	"dragon", 
	"ghost", 
	"dark", 
	"steel", 
	"fairy"
	]

changeData(active_pokemon);

$( function() {
    const pokemon_list = ['Abomasnow', 'Abra', 'Absol', 'Accelgor', 'Aegislash', 'Aerodactyl', 
    'Aggron', 'Aipom', 'Alakazam', 'Alcremie', 'Alomomola', 'Altaria', 'Amaura', 'Ambipom', 
    'Amoonguss', 'Ampharos', 'Anorith', 'Araquanid', 'Arbok', 'Arcanine', 'Arceus', 'Archen', 
    'Archeops', 'Ariados', 'Armaldo', 'Aromatisse', 'Aron', 'Articuno', 'Audino', 'Aurorus', 
    'Avalugg', 'Axew', 'Azelf', 'Azumarill', 'Azurill', 'Bagon', 'Baltoy', 'Banette', 
    'Barbaracle', 'Barboach', 'Basculin', 'Bastiodon', 'Bayleef', 'Beartic', 'Beautifly', 
    'Beedrill', 'Beheeyem', 'Beldum', 'Bellossom', 'Bellsprout', 'Bergmite', 'Bewear', 
    'Bibarel', 'Bidoof', 'Binacle', 'Bisharp', 'Blacephalon', 'Blastoise', 'Blaziken', 
    'Blissey', 'Blitzle', 'Boldore', 'Bonsly', 'Bouffalant', 'Bounsweet', 'Braixen', 'Braviary', 
    'Breloom', 'Brionne', 'Bronzong', 'Bronzor', 'Bruxish', 'Budew', 'Buizel', 'Bulbasaur', 
    'Buneary', 'Bunnelby', 'Burmy', 'Butterfree', 'Buzzwole', 'Cacnea', 'Cacturne', 'Camerupt', 
    'Carbink', 'Carnivine', 'Carracosta', 'Carvanha', 'Cascoon', 'Castform', 'Caterpie', 
    'Celebi', 'Celesteela', 'Chandelure', 'Chansey', 'Charizard', 'Charjabug', 'Charmander', 
    'Charmeleon', 'Chatot', 'Cherrim', 'Cherubi', 'Chesnaught', 'Chespin', 'Chikorita', 
    'Chimchar', 'Chimecho', 'Chinchou', 'Chingling', 'Cinccino', 'Clamperl', 'Clauncher', 
    'Clawitzer', 'Claydol', 'Clefable', 'Clefairy', 'Cleffa', 'Cloyster', 'Cobalion', 
    'Cofagrigus', 'Combee', 'Combusken', 'Comfey', 'Conkeldurr', 'Corphish', 'Corsola', 
    'Corviknight', 'Cosmoem', 'Cosmog', 'Cottonee', 'Crabominable', 'Crabrawler', 'Cradily', 
    'Cranidos', 'Crawdaunt', 'Cresselia', 'Croagunk', 'Crobat', 'Croconaw', 'Crustle', 
    'Cryogonal', 'Cubchoo', 'Cubone', 'Cutiefly', 'Cyndaquil', 'Darkrai', 'Darmanitan', 
    'Dartrix', 'Darumaka', 'Decidueye', 'Dedenne', 'Deerling', 'Deino', 'Delcatty', 
    'Delibird', 'Delphox', 'Deoxys', 'Dewgong', 'Dewott', 'Dewpider', 'Dhelmise', 'Dialga', 
    'Diancie', 'Diggersby', 'Diglett', 'Ditto', 'Dodrio', 'Doduo', 'Donphan', 'Doublade', 
    'Dragalge', 'Dragonair', 'Dragonite', 'Drampa', 'Drapion', 'Dratini', 'Drednaw', 
    'Drifblim', 'Drifloon', 'Drilbur', 'Drowzee', 'Druddigon', 'Ducklett', 'Dugtrio', 
    'Dunsparce', 'Duosion', 'Duraludon', 'Durant', 'Dusclops', 'Dusknoir', 'Duskull', 
    'Dustox', 'Dwebble', 'Eelektrik', 'Eelektross', 'Eevee', 'Ekans', 'Eldegoss', 'Electabuzz', 
    'Electivire', 'Electrike', 'Electrode', 'Elekid', 'Elgyem', 'Emboar', 'Emolga', 'Empoleon', 
    'Entei', 'Escavalier', 'Espeon', 'Espurr', 'Excadrill', 'Exeggcute', 'Exeggutor', 'Exploud', 
    'Farfetch%27d', 'Fearow', 'Feebas', 'Fennekin', 'Feraligatr', 'Ferroseed', 'Ferrothorn', 
    'Finneon', 'Flaaffy', 'Flareon', 'Fletchinder', 'Fletchling', 
    'Floatzel', 'Floette', 'Florges', 'Flygon', 'Fomantis', 'Foongus', 'Forretress', 'Fraxure', 
    'Frillish', 'Froakie', 'Frogadier', 'Froslass', 'Furfrou', 'Furret', 'Gabite', 'Gallade', 
    'Galvantula', 'Garbodor', 'Garchomp', 'Gardevoir', 'Gastly', 'Gastrodon', 'Genesect', 
    'Gengar', 'Geodude', 'Gible', 'Gigalith', 'Girafarig', 'Giratina', 'Glaceon', 'Glalie', 
    'Glameow', 'Gligar', 'Gliscor', 'Gloom', 'Gogoat', 'Golbat', 'Goldeen', 'Golduck', 'Golem', 
    'Golett', 'Golisopod', 'Golurk', 'Goodra', 'Goomy', 'Gorebyss', 'Gossifleur', 'Gothita', 
    'Gothitelle', 'Gothorita', 'Gourgeist', 'Granbull', 'Graveler', 'Greninja', 'Grimer', 
    'Grookey', 'Grotle', 'Groudon', 'Grovyle', 'Growlithe', 'Grubbin', 'Grumpig', 'Gulpin', 
    'Gumshoos', 'Gurdurr', 'Guzzlord', 'Gyarados', 'Hakamo-o', 'Happiny', 'Hariyama', 'Haunter', 
    'Hawlucha', 'Haxorus', 'Heatmor', 'Heatran', 'Heliolisk', 'Helioptile', 'Heracross', 
    'Herdier', 'Hippopotas', 'Hippowdon', 'Hitmonchan', 'Hitmonlee', 'Hitmontop', 'Ho-Oh', 
    'Honchkrow', 'Honedge', 'Hoopa', 'Hoothoot', 'Hoppip', 'Horsea', 'Houndoom', 'Houndour', 
    'Huntail', 'Hydreigon', 'Hypno', 'Igglybuff', 'Illumise', 'Impidimp', 'Incineroar', 
    'Infernape', 'Inkay', 'Ivysaur', 'Jangmo-o', 'Jellicent', 'Jigglypuff', 'Jirachi', 'Jolteon', 
    'Joltik', 'Jumpluff', 'Jynx', 'Kabuto', 'Kabutops', 'Kadabra', 'Kakuna', 'Kangaskhan', 
    'Karrablast', 'Kartana', 'Kecleon', 'Keldeo', 'Kingdra', 'Kingler', 'Kirlia', 'Klang', 
    'Klefki', 'Klink', 'Klinklang', 'Koffing', 'Komala', 'Kommo-o', 'Krabby', 'Kricketot', 
    'Kricketune', 'Krokorok', 'Krookodile', 'Kyogre', 'Kyurem', 'Lairon', 'Lampent', 'Landorus', 
    'Lanturn', 'Lapras', 'Larvesta', 'Larvitar', 'Latias', 'Latios', 'Leafeon', 'Leavanny', 
    'Ledian', 'Ledyba', 'Lickilicky', 'Lickitung', 'Liepard', 'Lileep', 'Lilligant', 'Lillipup', 
    'Linoone', 'Litleo', 'Litten', 'Litwick', 'Lombre', 'Lopunny', 'Lotad', 'Loudred', 'Lucario', 
    'Ludicolo', 'Lugia', 'Lumineon', 'Lunala', 'Lunatone', 'Lurantis', 'Luvdisc', 'Luxio', 
    'Luxray', 'Lycanroc', 'Machamp', 'Machoke', 'Machop', 'Magby', 'Magcargo', 'Magearna', 
    'Magikarp', 'Magmar', 'Magmortar', 'Magnemite', 'Magneton', 'Magnezone', 'Makuhita', 
    'Malamar', 'Mamoswine', 'Manaphy', 'Mandibuzz', 'Manectric', 'Mankey', 'Mantine', 'Mantyke', 
    'Maractus', 'Mareanie', 'Mareep', 'Marill', 'Marowak', 'Marshadow', 'Marshtomp', 
    'Masquerain', 'Mawile', 'Medicham', 'Meditite', 'Meganium', 'Melmetal', 'Meloetta', 'Meltan', 
    'Meowstic', 'Meowth', 'Mesprit', 'Metagross', 'Metang', 'Metapod', 'Mew', 'Mewtwo', 'Mienfoo', 
    'Mienshao', 'Mightyena', 'Milotic', 'Miltank', 'Mime_Jr.', 'Mimikyu', 'Minccino', 'Minior', 
    'Minun', 'Misdreavus', 'Mismagius', 'Moltres', 'Monferno', 'Morelull', 'Mothim', 'Mr._Mime', 
    'Mudbray', 'Mudkip', 'Mudsdale', 'Muk', 'Munchlax', 'Munna', 'Murkrow', 'Musharna', 
    'Naganadel', 'Natu', 'Necrozma', 'Nidoking', 'Nidoqueen','Nidorina', 'Nidorino', 'Nihilego', 
    'Nincada', 'Ninetales', 'Ninjask', 'Noctowl', 'Noibat', 'Noivern', 'Nosepass', 'Numel', 
    'Nuzleaf', 'Octillery', 'Oddish', 'Omanyte', 'Omastar', 'Onix', 'Oranguru', 'Oricorio', 
    'Oshawott', 'Pachirisu', 'Palkia', 'Palossand', 'Palpitoad', 'Pancham', 'Pangoro', 'Panpour', 
    'Pansage', 'Pansear', 'Paras', 'Parasect', 'Passimian', 'Patrat', 'Pawniard', 'Pelipper', 
    'Persian', 'Petilil', 'Phanpy', 'Phantump', 'Pheromosa', 'Phione', 'Pichu', 'Pidgeot', 
    'Pidgeotto', 'Pidgey', 'Pidove', 'Pignite', 'Pikachu', 'Pikipek', 'Piloswine', 'Pineco', 
    'Pinsir', 'Piplup', 'Plusle', 'Poipole', 'Politoed', 'Poliwag', 'Poliwhirl', 'Poliwrath', 
    'Ponyta', 'Poochyena', 'Popplio', 'Porygon', 'Porygon2', 'Porygon-Z', 'Primarina', 
    'Primeape', 'Prinplup', 'Probopass', 'Psyduck', 'Pumpkaboo', 'Pupitar', 'Purrloin', 
    'Purugly', 'Pyroar', 'Pyukumuku', 'Quagsire', 'Quilava', 'Quilladin', 'Qwilfish', 'Raichu', 
    'Raikou', 'Ralts', 'Rampardos', 'Rapidash', 'Raticate', 'Rattata', 'Rayquaza', 'Regice', 
    'Regigigas', 'Regirock', 'Registeel', 'Relicanth', 'Remoraid', 'Reshiram', 'Reuniclus', 
    'Rhydon', 'Rhyhorn', 'Rhyperior', 'Ribombee', 'Riolu', 'Rockruff', 'Roggenrola', 'Rolycoly', 
    'Roselia', 'Roserade', 'Rotom', 'Rowlet', 'Rufflet', 'Sableye', 'Salamence', 'Salandit', 
    'Salazzle', 'Samurott', 'Sandile', 'Sandshrew', 'Sandslash', 'Sandygast', 'Sawk', 'Sawsbuck', 
    'Scatterbug', 'Sceptile', 'Scizor', 'Scolipede', 'Scorbunny', 'Scrafty', 'Scraggy', 'Scyther', 
    'Seadra', 'Seaking', 'Sealeo', 'Seedot', 'Seel', 'Seismitoad', 'Sentret', 'Serperior', 
    'Servine', 'Seviper', 'Sewaddle', 'Sharpedo', 'Shaymin', 'Shedinja', 'Shelgon', 'Shellder', 
    'Shellos', 'Shelmet', 'Shieldon', 'Shiftry', 'Shiinotic', 'Shinx', 'Shroomish', 'Shuckle', 
    'Shuppet', 'Sigilyph', 'Silcoon', 'Silvally', 'Simipour', 'Simisage', 'Simisear', 'Skarmory', 
    'Skiddo', 'Skiploom', 'Skitty', 'Skorupi', 'Skrelp', 'Skuntank', 'Slaking', 'Slakoth', 
    'Sliggoo', 'Slowbro', 'Slowking', 'Slowpoke', 'Slugma', 'Slurpuff', 'Smeargle', 'Smoochum', 
    'Sneasel', 'Snivy', 'Snorlax', 'Snorunt', 'Snover', 'Snubbull', 'Sobble', 'Solgaleo', 
    'Solosis', 'Solrock', 'Spearow', 'Spewpa', 'Spheal', 'Spinarak', 'Spinda', 'Spiritomb', 
    'Spoink', 'Spritzee', 'Squirtle', 'Stakataka', 'Stantler', 'Staraptor', 'Staravia', 'Starly', 
    'Starmie', 'Staryu', 'Steelix', 'Steenee', 'Stoutland', 'Stufful', 'Stunfisk', 'Stunky', 
    'Sudowoodo', 'Suicune', 'Sunflora', 'Sunkern', 'Surskit', 'Swablu', 'Swadloon', 'Swalot', 
    'Swampert', 'Swanna', 'Swellow', 'Swinub', 'Swirlix', 'Swoobat', 'Sylveon', 'Taillow', 
    'Talonflame', 'Tangela', 'Tangrowth', 'Tapu_Bulu', 'Tapu_Fini', 'Tapu_Koko', 'Tapu_Lele', 
    'Tauros', 'Teddiursa', 'Tentacool', 'Tentacruel', 'Tepig', 'Terrakion', 'Throh', 'Thundurus', 
    'Timburr', 'Tirtouga', 'Togedemaru', 'Togekiss', 'Togepi', 'Togetic', 'Torchic', 'Torkoal', 
    'Tornadus', 'Torracat', 'Torterra', 'Totodile', 'Toucannon', 'Toxapex', 'Toxicroak', 
    'Tranquill', 'Trapinch', 'Treecko', 'Trevenant', 'Tropius', 'Trubbish', 'Trumbeak', 'Tsareena', 
    'Turtonator', 'Turtwig', 'Tympole', 'Tynamo', 'Type:_Null', 'Typhlosion', 'Tyranitar', 
    'Tyrantrum', 'Tyrogue', 'Tyrunt', 'Umbreon', 'Unfezant', 'Unown', 'Ursaring', 'Uxie', 
    'Vanillish', 'Vanillite', 'Vanilluxe', 'Vaporeon', 'Venipede', 'Venomoth', 'Venonat', 
    'Venusaur', 'Vespiquen', 'Vibrava', 'Victini', 'Victreebel', 'Vigoroth', 'Vikavolt', 
    'Vileplume', 'Virizion', 'Vivillon', 'Volbeat', 'Volcanion', 'Volcarona', 'Voltorb', 
    'Vullaby', 'Vulpix', 'Wailmer', 'Wailord', 'Walrein', 'Wartortle', 'Watchog', 'Weavile', 
    'Weedle', 'Weepinbell', 'Weezing', 'Whimsicott', 'Whirlipede', 'Whiscash', 'Whismur', 
    'Wigglytuff', 'Wimpod', 'Wingull', 'Wishiwashi', 'Wobbuffet', 'Woobat', 'Wooloo', 'Wooper', 
    'Wormadam', 'Wormadam', 'Wormadam', 'Wurmple', 'Wynaut', 'Xatu', 'Xerneas', 'Xurkitree', 
    'Yamask', 'Yamper', 'Yanma', 'Yanmega', 'Yungoos', 'Yveltal', 'Zacian', 'Zamazenta', 
    'Zangoose', 'Zapdos', 'Zebstrika', 'Zekrom', 'Zeraora', 'Zigzagoon', 'Zoroark', 'Zorua', 
    'Zubat', 'Zweilous', 'Zygarde'];
    
    $( "#search_box" ).autocomplete({
      source: pokemon_list
    });
});
