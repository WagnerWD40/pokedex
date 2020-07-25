import Button from './Button.mjs';

class MainButton extends Button {

    constructor(htmlElement, eventType, eventFunction) {
        super(htmlElement, eventType, eventFunction)
    };

    onClick() {
        let tl = gsap.timeline();
        
        tl.to(this.htmlElement, {y: 4, duration: 0.1})
            .to(this.htmlElement, {y: 0, duration: 0.1});
    };
};

export default MainButton;