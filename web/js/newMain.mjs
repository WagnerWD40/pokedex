import Pokedex from './Pokedex.mjs';

function rotatePlus(pokedex, megaSwitch, alolanSwitch) {
    let nextNumber = pokedex.getNumber() + 1;

    if (nextNumber > 809) {
        nextNumber = 1;
    };

    pokedex.searchByNumber(nextNumber);
    megaSwitch.checked = false;
    alolanSwitch.checked = false;
    pokedex.setRightButtonAsPressed();
};

function rotateMinus(pokedex, megaSwitch, alolanSwitch) {
    let nextNumber = pokedex.getNumber() - 1;

    if (nextNumber < 1) {
        nextNumber = 809;
    };

    pokedex.searchByNumber(nextNumber);
    megaSwitch.checked = false;
    alolanSwitch.checked = false;
    pokedex.setLeftButtonAsPressed();
};

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
        rotateMinus(pokedex, megaSwitch, alolanSwitch);
    } else if (keyName == "ArrowRight") {
        rotatePlus(pokedex, megaSwitch, alolanSwitch);
    };
  });

pokedex.searchByNumber(1);

const pokeballTop = document.querySelector('#PokeballBackgroundTop');
const pokeballBottom = document.querySelector('#PokeballBackgroundBottom');

gsap.to(pokeballTop, 5, {rotation:360, ease: Linear.easeNone, repeat: -1});
gsap.to(pokeballBottom, 5, {rotation:-360, ease: Linear.easeNone, repeat: -1});