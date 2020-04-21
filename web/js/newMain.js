class Pokedex {
    constructor() {
        this.name = document.querySelector(".PokemonName");
        this.image = document.querySelector(".PokemonImage");
        this.number = document.querySelector(".PokemonNumber");
        this.title = document.querySelector(".PokemonTitle");
        this.pokedexEntry = document.querySelector(".InfoPokedexEntry");

        this.types = document.querySelector(".Types");
        this.abilities = document.querySelector(".Abilities");
        this.hiddenAbilities = document.querySelector(".HiddenAbilities");

        this.hp = document.querySelector(".HP");
        this.hpBar = document.querySelector(".HPBar");
        this.attack = document.querySelector(".Attack");
        this.attackBar = document.querySelector(".AttackBar");
        this.defense = document.querySelector(".Defense");
        this.defenseBar = document.querySelector(".DefenseBar");
        this.spAttack = document.querySelector(".SpAttack");
        this.spAttackBar = document.querySelector(".SpAttackBar");
        this.spDefense = document.querySelector(".SpDefense");
        this.spDefenseBar = document.querySelector(".SpDefenseBar");
        this.speed = document.querySelector(".Speed");
        this.speedBar = document.querySelector(".SpeedBar");
        this.total = document.querySelector(".Total");

        this.maxAttributeValue = 200;
    };

    setName(name) {
        this.name.innerHTML = name;
    };

    setNumber(number) {
        this.number.innerHTML = number;
    };

    setTitle(title) {
        this.title.innerHTML = title;
    };

    setImage(image) {
        this.image.src = image;
    };

    setPokedexEntry(text) {
        this.pokedexEntry.innerHTML = text;
    };

    setTypes(newTypes) {
        this.changeChildren(newTypes, this.types, true);
    };

    setAbilities(newAbilities) {
        this.changeChildren(newAbilities, this.abilities);
    };

    setHiddenAbilities(newHiddenAbilities) {
        this.changeChildren(newHiddenAbilities, this.hiddenAbilities);
    };

    setHP(newValue) {
        this.changeAttribute(this.hp, newValue, this.hpBar);
    };

    setAttack(newValue) {
        this.changeAttribute(this.attack, newValue, this.attackBar);
    };

    setDefense(newValue) {
        this.changeAttribute(this.defense, newValue, this.defenseBar);
    };

    setSpAttack(newValue) {
        this.changeAttribute(this.spAttack, newValue, this.spAttackBar);
    };

    setSpDefense(newValue) {
        this.changeAttribute(this.spDefense, newValue, this.spDefenseBar);
    };
    
    setSpeed(newValue) {
        this.changeAttribute(this.speed, newValue, this.speedBar);
    };
    
    setTotal(newValue) {
        this.changeAttribute(this.total, newValue);
    };

    getNumber() {
        return Number(this.number.innerHTML);
    };

    changeChildren(array, parent, changeStyle = false) {
        while(parent.hasChildNodes()) {
            parent.removeChild(parent.childNodes[0]);
        };

        array.forEach(item => {
            if (item !== 'NULL') {
                let li = document.createElement("li");
                let text = document.createTextNode(item);
    
                li.appendChild(text);
    
                if (changeStyle) {
                    li.classList.add(item);
                };
                
                parent.appendChild(li);
            };
        });        
    };

    changeAttribute(attribute, newValue, attributeBar = false) {
        attribute.innerHTML = newValue;

        if (attributeBar) {
            attributeBar.style.width = `${100 * newValue / this.maxAttributeValue}%`
        };
    };
};

async function searchByNumber(number, pokedex) {
    const res =  await eel.search_by_number(number)();
    loadData(res, pokedex);
};

function loadData(res, pokedex) {
    
    const [
        number,
        name,
        title,
        type1,
        type2,
        ability1,
        ability2,
        ability3,
        hiddenAbility1,
        hiddenAbility2,
        hiddenAbility3,
        hp,
        attack,
        defense,
        spAttack,
        spDefense,
        speed,
        total,
    ] = res;

    pokedex.setNumber(number);
    pokedex.setName(name);
    pokedex.setTitle(title);
    pokedex.setImage(`.\\imgs\\${name}.png`);
    pokedex.setTypes([type1, type2]);
    pokedex.setAbilities([ability1, ability2, ability3]);
    pokedex.setHiddenAbilities([hiddenAbility1, hiddenAbility2, hiddenAbility3]);
    pokedex.setHP(hp);
    pokedex.setAttack(attack);
    pokedex.setDefense(defense);
    pokedex.setSpAttack(spAttack);
    pokedex.setSpDefense(spDefense);
    pokedex.setSpeed(speed);
    pokedex.setTotal(total);

    return pokedex;
}

function rotatePlus(pokedex) {
    let nextNumber = pokedex.getNumber() + 1;

    if (nextNumber > 809) {
        nextNumber = 1;
    };

    searchByNumber(nextNumber, pokedex);
};

function rotateMinus(pokedex) {
    let nextNumber = pokedex.getNumber() - 1;

    if (nextNumber < 1) {
        nextNumber = 809;
    };

    searchByNumber(nextNumber, pokedex);
};

const pokedex = window.onload = function () {
    const pokedex = new Pokedex();

    const rightButton = document.querySelector('.RightButton');
    const leftButton = document.querySelector('.LeftButton');

    rightButton.addEventListener('click', () => rotatePlus(pokedex));
    leftButton.addEventListener('click', () => rotateMinus(pokedex));
    
    searchByNumber(1, pokedex);

    return pokedex;
};
