
function changeData(number) {
	let pokemon = eel.search_by_number(number)();
	let statBarMax = 200;

	pokemon.then(function (value) {
		let poke_name = value[0];
		let poke_number = value[1]['Number'];
		let poke_title = value[1]['Title'];
		let poke_type = value[1]['Type'];
		let poke_abilities = value[1]['Abilities'];
		let poke_hidden_abilities = value[1]['Hidden Abilities'];
		let poke_stats = value[1]['Stats'];

		//Mega
		//Checks if pokemon has Mega 
		if (value[1]['Mega Stats']) {
			mega_checker = true;
			document.getElementById("megaBtn").style.background = "#4287f5";
			document.getElementById("megaBtn").style.color = "white";			
		} else {
			mega_checker = false;
			document.getElementById("megaBtn").style.background = "black";
			document.getElementById("megaBtn").style.color = "black";			
		}
		
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
			document.getElementById("formsBtn").style.background = "#4287f5";
			document.getElementById("formsBtn").style.color = "white";	
			if (value[1]['Alt Form 1 Stats']) {
				alt_forms_checker = true;
			} else if (value[1]['Alolan Stats']) {
				alola_checker = true;
			}	
		} else {
			forms_checker = false;
			alt_forms_checker = false;
			alola_checker = false;
			document.getElementById("formsBtn").style.background = "black";
			document.getElementById("formsBtn").style.color = "black";			
		}

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
		document.getElementById("poke_type1").style.background = type_colors[poke_type[0]];
		document.getElementById("poke_type2").innerHTML = poke_type[1] || "";
		document.getElementById("poke_type2").style.background = type_colors[poke_type[1]];

		//Abilities
		//Ability 1
		document.getElementById("poke_ability1").innerHTML = poke_abilities[0];
		
		searchAbility(poke_abilities[0]).then(function (data) {
			$(function () {
  			$('#poke_ability1').tooltip()	
  							 .attr('data-original-title', data)
							 .tooltip('fixTitle')
					 		.tooltip('show');
			})
			
		});	
		//Ability 2
		document.getElementById("poke_ability2").innerHTML = poke_abilities[1] || "";
		
		searchAbility(poke_abilities[1]).then(function (data) {
			$(function () {
  			$('#poke_ability2').tooltip()	
  							 .attr('data-original-title', data)
							 .tooltip('fixTitle')
					 		.tooltip('show');
			})
			
		});	
		//Hidden Ability 1
		document.getElementById("poke_hidden_ability1").innerHTML = poke_hidden_abilities[0] || "";
		
		searchAbility(poke_hidden_abilities[0]).then(function (data) {
			$(function () {
  			$('#poke_hidden_ability1').tooltip()	
  							 .attr('data-original-title', data)
							 .tooltip('fixTitle')
					 		.tooltip('show');
			})
			
		});	
		//Hidden Ability 2
		document.getElementById("poke_hidden_ability2").innerHTML = poke_hidden_abilities[1] || "";
		
		searchAbility(poke_hidden_abilities[1]).then(function (data) {
			$(function () {
  			$('#poke_hidden_ability2').tooltip()	
  							 .attr('data-original-title', data)
							 .tooltip('fixTitle')
					 		.tooltip('show');
			})
			
		});							

		//Stats
		document.getElementById("poke_hp").innerHTML = poke_stats['HP'];
		document.getElementById("poke_attack").innerHTML = poke_stats['Attack'];
		document.getElementById("poke_defense").innerHTML = poke_stats['Defense'];
		document.getElementById("poke_spattack").innerHTML = poke_stats['Sp. Attack'];
		document.getElementById("poke_spdefense").innerHTML = poke_stats['Sp. Defense'];
		document.getElementById("poke_speed").innerHTML = poke_stats['Speed'];
		document.getElementById("poke_total").innerHTML = poke_stats['Total'];

		//Bars
		document.getElementById("poke_hp_bar").style = `width: calc(100% * ${Number(poke_stats['HP'])}/${statBarMax})`;
		document.getElementById("poke_attack_bar").style = `width: calc(100% * ${Number(poke_stats['Attack'])}/${statBarMax})`;
		document.getElementById("poke_defense_bar").style = `width: calc(100% * ${Number(poke_stats['Defense'])}/${statBarMax})`;
		document.getElementById("poke_spattack_bar").style = `width: calc(100% * ${Number(poke_stats['Sp. Attack'])}/${statBarMax})`;
		document.getElementById("poke_spdefense_bar").style = `width: calc(100% * ${Number(poke_stats['Sp. Defense'])}/${statBarMax})`;
		document.getElementById("poke_speed_bar").style = `width: calc(100% * ${Number(poke_stats['Speed'])}/${statBarMax})`;

		if (value[1]['Alt Form ' + String(form_number + 1) + ' Stats']) {
			next_form_flag = true;
		} else {
			next_form_flag = false;
		}

		if (charizard_mewtwo) {
			mega_two = true;
		}		
	});
}

function dexSearch() {
	mega = false;
	forms = false;	
	mega_two = false;
	charizard_mewtwo = false;	
	
	let name_search = document.forms["search"]["search_name"];
	let pokemon_number = eel.search_by_name(name_search.value)();

	document.forms["search"].reset();
	pokemon_number.then(function (value) {
	 	
	 	active_pokemon = value;
	 	changeData(active_pokemon);
	 	console.log(active_pokemon);
	})
}

function dexRotate(direction) {
	mega = false;
	forms = false;	
	mega_two = false;
	charizard_mewtwo = false;
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
	let search = eel.search_ability(ability)();
	let result;

	result = search.then(function (value) {
		let description = value;
		return description;
	})
	return result;
}

function changeMega() {
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

changeData(active_pokemon);
		
const type_colors = {
	'Normal': '#a19168',
	'Fire':'#d13017',
	'Fighting':'#851504',
	'Water':'#1c8dd9',
	'Flying':'#cfecff',
	'Grass':'#06bf44',
	'Poison':'#9d25b8',
	'Electric':'#fff53b',
	'Ground':'#cf9204',
	'Psychic':'#c90a80',
	'Rock':'#7a5b0c',
	'Ice':'#5bdede',
	'Bug':'#366301',
	'Dragon':'#020cd1',
	'Ghost':'#5d0063',
	'Dark':'#413442',
	'Steel':'#ababab',
	'Fairy':'#ffbdf5',
	'???':'#758f6f'
}
