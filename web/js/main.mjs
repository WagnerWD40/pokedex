import Pokedex from './Pokedex.mjs';

const pokedex = new Pokedex();

const megaSwitch = document.querySelector("#switch-shadow-mega");
const alolanSwitch = document.querySelector("#switch-shadow-alolan");

megaSwitch.addEventListener('change', () => {
    if (megaSwitch.checked) {
        pokedex.getMegaFormData(pokedex.getNumber());
    } else {
        pokedex.searchByNumber(pokedex.getNumber());
    };
});

alolanSwitch.addEventListener('change', () => {
    if (alolanSwitch.checked) {
        pokedex.getAlolanFormData(pokedex.getNumber());
    } else {
        pokedex.searchByNumber(pokedex.getNumber());
    };
});

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyName == "Enter") {
        pokedex.searchByName(pokedex.getSearchInputValue(),pokedex);
    } else if (keyName == "ArrowLeft") {
        pokedex.rotateMinus();
    } else if (keyName == "ArrowRight") {
        pokedex.rotatePlus();
    };
  });

pokedex.searchByNumber(1);

const pokeballTop = document.querySelector('#PokeballBackgroundTop');
const pokeballBottom = document.querySelector('#PokeballBackgroundBottom');

gsap.to(pokeballTop, 5, {rotation:360, ease: Linear.easeNone, repeat: -1});
gsap.to(pokeballBottom, 5, {rotation:-360, ease: Linear.easeNone, repeat: -1});