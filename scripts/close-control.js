class CloseControl {
    constructor(container, factory) {
        this.container = container;
        this.factory = factory;

        this.container.interactive = true;
        this.container.cursor = "pointer";

        this.on("mouseover", this.showHover.bind(this));
        this.on("mouseup", this.showNormal.bind(this));

        this.showNormal();
    }

    showHover() {

    }

    showNormal() {

    }
}