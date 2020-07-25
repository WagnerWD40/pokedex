import Display from './Display.mjs';

class FormWindow extends Display {
    constructor(htmlElement, slideDistance) {
        super(htmlElement, slideDistance)
    };

    getHtmlElement() {
        return this.htmlElement;
    };

    getVisibility() {
        return this.visibility;
    };

    toggleVisibility() {

        let tl = gsap.timeline();

        const initialHeight = 50;
        const finalHeight = 250;
        const slideDuration = 0.2;
        const rollDuration = 0.3;

        if (!this.visibility) {
            this.visibility = true;
            tl.to(this.htmlElement, {x: this.slideDistance, duration: slideDuration})
                .to(this.htmlElement, {height: finalHeight, duration: rollDuration})
                .to('.Form-Window span', {opacity: 1, duration: 0.2});
        } else {
            this.visibility = false;
            tl.to('.Form-Window span', {opacity: 0, duration: 0.2})
                .to(this.htmlElement, {height: initialHeight, duration: rollDuration})
                .to(this.htmlElement, {x: 0, duration: slideDuration});
        };
    };
};

export default FormWindow;
