class Display {
    constructor(htmlElement) {
        this.htmlElement = htmlElement;
        this.visibility = false;
    };

    getHtmlElement() {
        return this.htmlElement;
    };

    getVisibility() {
        return this.visibility;
    };

    toggleVisibility = () => {
        if (this.visibility === false) {
            this.visibility = true;
            gsap.to(this.htmlElement, {x: 535, duration: 1});
        } else {
            this.visibility = false;
            gsap.to(this.htmlElement, {x: 0, duration: 1});
        };
    };

};

export default Display;