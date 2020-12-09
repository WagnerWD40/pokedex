import Slider from './Slider.mjs';
import Button from './Button.mjs';
import MainButton from './MainButton.mjs';
import Display from './Display.mjs';
import FormWindow from './FormWindow.mjs';

class Pokedex {
    constructor() {
        // constants
        this.maxAttributeValue = 200;
        this.firstPokemon = 1;
        this.lastPokemon = 809;

        this.name = document.querySelector(".PokemonName");
        this.image = document.querySelector(".PokemonImage");
        this.number = document.querySelector(".PokemonNumber");
        this.title = document.querySelector(".PokemonTitle");
        this.pokedexEntry = document.querySelector(".EntryText");

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

        this.hasMegaForm = false;
        this.hasAlolanForm = false;
        this.hasAlternateForm = false;

        this.searchInput = document.querySelector(".SearchInput");

        this.detailsWindow = new Display(document.querySelector(".Details-Window"), 535);

        this.formWindow = new FormWindow(document.querySelector(".Form-Window"), -230);

        this.megaFormSwitch = document.querySelector("#switch-shadow-mega");
        this.alolanFormSwitch = document.querySelector("#switch-shadow-alolan");

        // Buttons
        this.buttonAlternativeForms = new Button(document.querySelector(".FormsButton"), "click", () => this.formWindow.toggleVisibility());
        this.buttonLeft = new MainButton(document.querySelector(".LeftButton"), "click", () => this.rotateMinus());
        this.buttonRight = new MainButton(document.querySelector(".RightButton"), "click", () => this.rotatePlus());
        this.buttonSearch = new Button(document.querySelector(".SearchButton"), "click", () => this.searchByName(() => this.getSearchInputValue()));
        this.buttonStatus = new Button(document.querySelector(".StatusButton"), "click", () => this.detailsWindow.toggleVisibility());

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

    async setPokedexEntry() {
        this.pokedexEntry.innerHTML = await eel.get_pokedex_entry(this.getNumber())();
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

    setLeftButtonAsPressed() {
        this.leftButton.classList.add("PressedButton");
        setTimeout(() => {
            this.leftButton.classList.remove("PressedButton");
        }, 200);
    };

    setRightButtonAsPressed() {
        this.rightButton.classList.add("PressedButton");
        setTimeout(() => {
            this.rightButton.classList.remove("PressedButton");
        }, 200);
    };

    getNumber = () => Number(this.number.innerHTML);

    getName = () => this.name.innerHTML;

    getSearchInputValue = () => this.searchInput.value;

    searchInputClear() {
        this.searchInput.value = "";
    };

    toggleMegaFormSwitchActivity() {
        return this.megaFormSwitch.disabled = !this.hasMegaForm;
    }

    toggleAlolanFormSwitchActivity() {
        return this.alolanFormSwitch.disabled = !this.hasAlolanForm;
    }

    toggleAlternateFormButtonActivity() {
        this.buttonAlternativeForms.setDisabled(!this.hasAlternateForm);
    }

    populateFormList(formsArray) {
        /*
        Creates the following HTML structure

        <li>
            <input type="radio" name="form1" />
            <span>Form 1</span>
        </li>

        for each item in formsArray and append it to formWindow
        */

        while(this.formWindow.getHtmlElement().hasChildNodes()) {
            this.formWindow.getHtmlElement().removeChild(this.formWindow.getHtmlElement().childNodes[0]);
        };

        if (formsArray) {

            const ul = document.createElement("ul");

            formsArray.forEach(item => {
                const formName = item[1].substring(this.getName().length + 1, item[1].length);

                const li = document.createElement("li");
                
                const input = document.createElement("input");
                input.type = "radio";
                input.name = "form";
                input.onclick = () => this.loadAlternateFormData(item[1], this);
                
                const span = document.createElement("span");
                const spanContent = document.createTextNode(formName);
                span.appendChild(spanContent);

                li.appendChild(input);
                li.appendChild(span);

                ul.appendChild(li);
        });

        const li = document.createElement("li");
                
        const input = document.createElement("input");
        input.type = "radio";
        input.name = "form";
        input.onclick = () => this.searchByNumber(this.getNumber(), this);
        
        const span = document.createElement("span");
        const spanContent = document.createTextNode("Common Form");
        span.appendChild(spanContent);

        li.appendChild(input);
        li.appendChild(span);

        ul.appendChild(li);

        this.formWindow.getHtmlElement().appendChild(ul);
       };
        
    };

    changeChildren(array, parent, changeStyle = false) {
        
        while(parent.hasChildNodes()) {
            parent.removeChild(parent.childNodes[0]);
        };

        array.forEach(async item => {
            if (item !== 'NULL') {
                let li = document.createElement("li");
                let text = document.createTextNode(item);

                if (!changeStyle) {
                    let tooltip = document.createElement("span");
                    let tooltipContent = await eel.get_ability_description(item)();
                    let tooltipText = document.createTextNode(tooltipContent);
    
                    tooltip.classList.add("Tooltiptext");
                    tooltip.appendChild(tooltipText);
                    
                    li.classList.add("TooltipParent");
                    li.appendChild(tooltip);
                };

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

            let barSize = 100 * newValue / this.maxAttributeValue;
            barSize = barSize > 100 ? 100 : barSize;

            attributeBar.style.width = `${barSize}%`;

            if (barSize >= this.maxAttributeValue / 4) {
                attributeBar.style.backgroundImage = 'linear-gradient(to right, rgb(16, 224, 44) 0%, rgb(124, 255, 227) 100%)';
            } else if (barSize >= this.maxAttributeValue / 5 && barSize < this.maxAttributeValue / 4) {
                attributeBar.style.backgroundImage = 'linear-gradient(to right, rgb(220, 224, 16) 0%, rgb(201, 253, 152) 100%)';
            } else if (barSize >= this.maxAttributeValue / 7 && barSize < this.maxAttributeValue / 5) {
                attributeBar.style.backgroundImage = 'linear-gradient(to right, rgb(232, 206, 79) 0%, rgb(255, 230, 4) 100%)';
            } else {
                attributeBar.style.backgroundImage = 'linear-gradient(to right, rgb(143, 75, 49) 0%, rgb(224, 23, 16) 100%)';
            };
        };
    };

    async updatePokemonData(data) {

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
        ] = data;
    
        this.setNumber(number);
        this.setName(name);
        this.setTitle(title);
        this.setImage(`.\\imgs\\${name}.png`);
        this.setTypes([type1, type2]);
        if (![ability1, ability2, ability3].every(ability => ability === 'NULL')) {
            this.setAbilities([ability1, ability2, ability3]);
        };
    
        if (![hiddenAbility1, hiddenAbility2, hiddenAbility3].every(ability => ability === 'NULL')) {
            this.setHiddenAbilities([hiddenAbility1, hiddenAbility2, hiddenAbility3]);
        };
        this.setHP(hp);
        this.setAttack(attack);
        this.setDefense(defense);
        this.setSpAttack(spAttack);
        this.setSpDefense(spDefense);
        this.setSpeed(speed);
        this.setTotal(total);
    
        this.setPokedexEntry();
    
        this.hasMegaForm = await eel.check_if_has_mega_form(number)();
        this.hasAlolanForm = await eel.check_if_has_alolan_form(number)();
        this.hasAlternateForm = await eel.check_if_has_alternate_form(number)();
        
        this.toggleMegaFormSwitchActivity();
        this.toggleAlolanFormSwitchActivity();
        this.toggleAlternateFormButtonActivity();
    
        this.getAlternateFormData(number);

    };

    async checkAvailableForms() {
        const pokemonNumber = this.getNumber();

        this.hasMegaForm = await eel.check_if_has_mega_form(pokemonNumber)();
        this.hasAlolanForm = await eel.check_if_has_alolan_form(pokemonNumber)();
        this.hasAlternateForm = await eel.check_if_has_alternate_form(pokemonNumber)();
    };

    async searchByNumber(number) {
        const res =  await eel.search_by_number(number)();
        this.updatePokemonData(res);
        this.checkAvailableForms();
    };

    async searchByName(name) {
        this.searchInputClear();
        const res = await eel.search_by_name(name)();
    
        if (res) {
            this.updatePokemonData(res);
            this.checkAvailableForms();
        };
    };

    async getMegaFormData(number) {
        const res = await eel.get_mega_form(number)();
    
        this.updatePokemonData(res);
    };
    
    async getAlolanFormData(number) {
        const res = await eel.get_alolan_form(number)();
        this.updatePokemonData(res);
    };
    
    async getAlternateFormData(number) {
        const res = await eel.get_alternate_forms(number)();
        this.populateFormList(res);
    
        return res ? true : false;
    };

    async loadAlternateFormData(formName) {
        const res = await eel.get_specific_alternate_form(formName)();
        this.updatePokemonData(res);
    };

    rotatePlus() {
        let nextNumber = this.getNumber() + 1;
    
        if (nextNumber > 809) {
            nextNumber = 1;
        };

        gsap.from(this.image, {
            opacity: 0.7, 
            x: 200, 
            duration: .5,
          });

        if (this.formWindow.getVisibility()) {
            this.formWindow.toggleVisibility();
        };
    
        this.searchByNumber(nextNumber);
        this.megaFormSwitch.checked = false;
        this.alolanFormSwitch.checked = false;
        this.setRightButtonAsPressed();
    };

    rotateMinus() {
        let nextNumber = this.getNumber() - 1;
    
        if (nextNumber < 1) {
            nextNumber = 809;
        };

        gsap.from(this.image, {
            opacity: 0.7, 
            x: -200, 
            duration: .5,
          });

        if (this.formWindow.getVisibility()) {
            this.formWindow.toggleVisibility();
        };
    
        this.searchByNumber(nextNumber);
        this.megaFormSwitch.checked = false;
        this.alolanFormSwitch.checked = false;
        this.setLeftButtonAsPressed();
    };

    
};

export default Pokedex;