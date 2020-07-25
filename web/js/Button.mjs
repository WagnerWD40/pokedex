class Button {
    constructor(htmlElement, eventType, eventFunction) {
        this.htmlElement = htmlElement;
        this.eventFunction = eventFunction;
        this.isClicked = false;

        this.htmlElement.addEventListener(eventType, () => eventFunction());
        this.htmlElement.addEventListener(eventType, () => this.onClick());
    };

    setDisabled(boolean) {
        this.htmlElement.disabled = boolean;
    };

    onClick() {
        if (!this.isClicked) {
            this.isClicked = true;
            gsap.to(this.htmlElement, {y: 1, backgroundColor: '#44a50b',duration: 0.1});
        } else if (this.isClicked) {
            this.isClicked = false;
            gsap.to(this.htmlElement, {y: 0, backgroundColor: '#52cc0c', duration: 0.1});
        };
    };

};

export default Button;