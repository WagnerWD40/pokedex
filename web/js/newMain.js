class Pokedex {
    constructor() {
        this.name = document.querySelector(".PokemonName");
        this.image = document.querySelector(".PokemonImage");
        this.number = document.querySelector(".PokemonNumber");
        this.title = document.querySelector(".PokemonTitle");

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

    changeChildren(array, parent, changeStyle = false) {
        while(parent.hasChildNodes()) {
            parent.removeChild(parent.childNodes[0]);
        };

        array.forEach(item => {
            let li = document.createElement("li");
            let text = document.createTextNode(item);

            li.appendChild(text);

            if (changeStyle) {
                li.classList.add(item);
            };
            
            parent.appendChild(li);
        });        
    };

    changeAttribute(attribute, newValue, attributeBar = false) {
        attribute.innerHTML = newValue;

        if (attributeBar) {
            attributeBar.style.width = `${100 * newValue / this.maxAttributeValue}%`
        };
    };
};

window.onload = function () {
    const pokedex = new Pokedex();

    pokedex.setName("Vegitto");
    pokedex.setImage(".\\imgs\\Pikachu.png");
    pokedex.setNumber("#099");
    pokedex.setTitle("Mouse Pokemon");

    pokedex.setTypes(["Fire", "Ground"]);

    pokedex.setAbilities(["Moxie", "Intimidate"]);
    pokedex.setHiddenAbilities(["Hustle", "Soul Heart"]);

    pokedex.setHP(190);
    pokedex.setDefense(56);
    
}
