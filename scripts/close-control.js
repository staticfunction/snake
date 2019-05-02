class CloseControl {
    constructor(container, factory) {
        this.container = container;
        this.factory = factory;

        this.container.interactive = true;
        this.container.cursor = "pointer";

        this.container.on("mouseover", this.showHover.bind(this));
        this.container.on("mouseup", this.showNormal.bind(this));
        this.container.on("mouseout", this.showNormal.bind(this));
        this.showNormal();
    }

    showHover() {
        this.container.removeChildren();
        this.container.addChild(this.factory.CloseIconClicked());
    }

    showNormal() {
        this.container.removeChildren();
        this.container.addChild(this.factory.CloseIcon());
    }
}