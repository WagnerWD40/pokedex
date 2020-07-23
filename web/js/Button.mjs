class Button {
    constructor(htmlElement, eventType, eventFunction) {
        this.htmlElement = htmlElement;
        this.eventFunction = eventFunction;

        this.htmlElement.addEventListener(eventType, () => eventFunction())
    };

    setDisabled(boolean) {
        this.htmlElement.disabled = boolean;
    };

    onClick() {
        this.eventFunction();
    };

};

export default Button;