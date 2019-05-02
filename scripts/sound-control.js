class SoundControl {
    constructor(container, soundElements, factory) {
        this.container = container;
        this.soundElements = soundElements;
        this.factory = factory;
        
        this.container.interactive = true;
        this.container.cursor = "pointer";

        this.showSoundOn();

        this.container.on('click', this.onTap.bind(this));
    }

    onTap() {
        this.soundOn = !this.soundOn;

        if(this.soundOn) {
            this.setVolume(1);
            this.showSoundOn();
        }
        else {
            this.setVolume(0);
            this.showSoundOff();
        }
    }

    showSoundOff() {
        this.container.removeChildren();
        this.container.addChild(this.factory.SoundOn());

    }

    showSoundOn() {
        this.container.removeChildren();
        this.container.addChild(this.factory.SoundOff());
    }
 
    setVolume(volume) {
        this.soundElements.forEach(soundElement => {
            soundElement.volume = volume;
        })
    }


}