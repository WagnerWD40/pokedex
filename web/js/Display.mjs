class Display {
    constructor(htmlElement, slideDistance) {
        this.htmlElement = htmlElement;
        this.slideDistance = slideDistance;
        this.visibility = false;
    };

    getHtmlElement() {
        return this.htmlElement;
    };

    getVisibility() {
        return this.visibility;
    };

    toggleVisibility() {
        if (!this.visibility) {
            this.visibility = true;
            gsap.to(this.htmlElement, {x: this.slideDistance, duration: 1});
        } else {
            this.visibility = false;
            gsap.to(this.htmlElement, {x: 0, duration: 1});
        };
    };
};

export default Display;