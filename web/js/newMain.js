class Pokedex {
    constructor() {
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

        this.maxAttributeValue = 200;

        this.megaFormSwitch = document.querySelector("#switch-shadow-mega");
        this.hasMegaForm = false;

        this.alolanFormSwitch = document.querySelector("#switch-shadow-alolan");
        this.hasAlolanForm = false;

        this.alternateFormButton = document.querySelector(".FormsButton");
        this.hasAlternateForm = false;

        this.leftButton = document.querySelector(".LeftButton");
        this.rightButton = document.querySelector(".RightButton");

        this.searchInput = document.querySelector(".SearchInput");

        this.detailsWindow = new Display(document.querySelector(".Details"), 'Open', 'Close');

        this.formList = new Display(document.querySelector(".FormList"), "OpenFormList", "CloseFormList");
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

    getNumber() {
        return Number(this.number.innerHTML);
    };

    getName() {
        return this.name.innerHTML;
    };

    getSearchInputValue() {
        return this.searchInput.value;
    };

    searchInputClear() {
        this.searchInput.value = "";
    };

    toggleMegaFormSwitchActivity() {
        return this.megaFormSwitch.disabled = !this.hasMegaForm;
    };

    toggleAlolanFormSwitchActivity() {
        return this.alolanFormSwitch.disabled = !this.hasAlolanForm;
    };

    toggleAlternateFormButtonActivity() {
        return this.alternateFormButton.disabled = !this.hasAlternateForm;
    };

    populateFormList(formsArray) {
        /*
        Creates the following HTML structure

        <li>
            <input type="radio" name="form1" />
            <span>Form 1</span>
        </li>

        for each item in formsArray and append it to formList
        */

        while(this.formList.getHtmlElement().hasChildNodes()) {
            this.formList.getHtmlElement().removeChild(this.formList.getHtmlElement().childNodes[0]);
        };

        if (formsArray) {

            const ul = document.createElement("ul");

            formsArray.forEach(item => {
                const formName = item[1].substring(this.getName().length + 1, item[1].length);

                const li = document.createElement("li");
                
                const input = document.createElement("input");
                input.type = "radio";
                input.name = "form";
                input.onclick = () => loadAlternateFormData(item[1], this);
                
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

        this.formList.getHtmlElement().appendChild(ul);
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
                attributeBar.style.backgroundImage = 'linear-gradient(to right, rgb(124, 255, 227) 0%, rgb(16, 224, 44) 100%)';
            } else if (barSize >= this.maxAttributeValue / 5 && barSize < this.maxAttributeValue / 4) {
                attributeBar.style.backgroundImage = 'linear-gradient(to right, rgb(201, 253, 152) 0%, rgb(220, 224, 16) 100%)';
            } else if (barSize >= this.maxAttributeValue / 7 && barSize < this.maxAttributeValue / 5) {
                attributeBar.style.backgroundImage = 'linear-gradient(to right, rgb(255, 254, 172) 0%, rgb(255, 230, 4) 100%)';
            } else {
                attributeBar.style.backgroundImage = 'linear-gradient(to right, rgb(253, 209, 152) 0%, rgb(224, 23, 16) 100%)';
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
    
        if (!this.hasAlternateForm && this.formList.getHtmlElement().classList.contains("OpenFormList") ) {

            this.formList.toggleVisibility;
            
            return;
        };
    
        getAlternateFormData(number, this);

    };

    async searchByNumber(number) {
        const res =  await eel.search_by_number(number)();
        this.updatePokemonData(res);
    };

    async searchByName(name) {
        this.searchInputClear();
        const res = await eel.search_by_name(name)();
    
        if (res) {
            this.updatePokemonData(res);
        };
    };
};

class Button {
    constructor(htmlElement, onClickFunction) {
        this.htmlElement = htmlElement;
        this.onClickFunction = onClickFunction;

        this.htmlElement.addEventListener('click', () => onClickFunction())
    };
;}

class Display {
    constructor(htmlElement, visibilityShowClass, visibilityHideClass) {
        this.htmlElement = htmlElement;
        this.visibility = false;
        this.visibilityShowClass = visibilityShowClass;
        this.visibilityHideClass = visibilityHideClass;
    };

    getHtmlElement() {
        return this.htmlElement;
    };

    getVisibility() {
        return this.visibility;
    };

    toggleVisibility() {
        if (this.visibility === false) {
            this.visibility = true;
        } else {
            this.visibility = false;
        };
        this.htmlElement.classList.toggle(this.visibilityShowClass);
        this.htmlElement.classList.toggle(this.visibilityHideClass);
    };

};

async function getMegaFormData(number, pokedex) {
    const res = await eel.get_mega_form(number)();

    pokedex.updatePokemonData(res);
};

async function getAlolanFormData(number, pokedex) {
    const res = await eel.get_alolan_form(number)();
    pokedex.updatePokemonData(res);
};

async function getAlternateFormData(number, pokedex) {
    const res = await eel.get_alternate_forms(number)();
    pokedex.populateFormList(res);

    return res ? true : false;
};

async function loadAlternateFormData(formName, pokedex) {

    const res = await eel.get_specific_alternate_form(formName)();

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

    console.log(name);

    pokedex.setNumber(number);
    pokedex.setTitle(title);
    pokedex.setImage(`.\\imgs\\${name}.png`);
    pokedex.setTypes([type1, type2]);

    if (![ability1, ability2, ability3].every(ability => ability === 'NULL')) {
        pokedex.setAbilities([ability1, ability2, ability3]);
    };

    if (![hiddenAbility1, hiddenAbility2, hiddenAbility3].every(ability => ability === 'NULL')) {
        pokedex.setHiddenAbilities([hiddenAbility1, hiddenAbility2, hiddenAbility3]);
    };
    
    pokedex.setHP(hp);
    pokedex.setAttack(attack);
    pokedex.setDefense(defense);
    pokedex.setSpAttack(spAttack);
    pokedex.setSpDefense(spDefense);
    pokedex.setSpeed(speed);
    pokedex.setTotal(total);
};

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

const pokedex = window.onload = function () {
    const pokedex = new Pokedex();

    const rightButton = document.querySelector('.RightButton');
    const leftButton = document.querySelector('.LeftButton');
    const megaSwitch = document.querySelector("#switch-shadow-mega");
    const alolanSwitch = document.querySelector("#switch-shadow-alolan");
    const searchButton = document.querySelector(".SearchButton");
    const statusButton = document.querySelector(".StatusButton");
    const formsButton = document.querySelector(".FormsButton");

    megaSwitch.addEventListener('change', () => {
        if (megaSwitch.checked) {
            getMegaFormData(pokedex.getNumber(), pokedex);
        } else {
            pokedex.searchByNumber(pokedex.getNumber());
        };
    });

    alolanSwitch.addEventListener('change', () => {
        if (alolanSwitch.checked) {
            getAlolanFormData(pokedex.getNumber(), pokedex);
        } else {
            pokedex.searchByNumber(pokedex.getNumber());
        };
    });

    rightButton.addEventListener('click', () => rotatePlus(pokedex, megaSwitch, alolanSwitch));
    leftButton.addEventListener('click', () => rotateMinus(pokedex, megaSwitch, alolanSwitch));
    searchButton.addEventListener('click', () => pokedex.searchByName(pokedex.getSearchInputValue(),pokedex));
    statusButton.addEventListener('click', () => pokedex.detailsWindow.toggleVisibility());
    formsButton.addEventListener('click', () => pokedex.formList.toggleVisibility());
    
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

    return pokedex;
};

