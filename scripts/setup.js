function init(app) {
    loadSprites(factory => {
        
        app.stage.addChild(factory.Board());
        
        let soundControlContainer = new PIXI.Container();
        app.stage.addChild(soundControlContainer);
        soundControlContainer.x = 700;
        soundControlContainer.y = 2;


        let container = new PIXI.Container();
        container.width = container.height = 800;
        container.y = 214;
        
        app.stage.addChild(container);

        let board = new Board(800, 800, 50);
    
        let game = new Game(container, board, factory);
        game.start();

        let scoreSound = document.getElementById("scoreSound");
        let themeSound = document.getElementById("themeSound");

        let soundControl = new SoundControl(soundControlContainer, [scoreSound, themeSound], factory);

        addEventListener("keyup", () => {
            if(themeSound.paused)
                themeSound.play();
        })
        
        game.onScore(() => {
            scoreSound.pause();
            scoreSound.currentTime = 0;
            scoreSound.play();


        })

        app.ticker.add(game.onTick.bind(game));
    })
        
}
function loadSprites(callback) {
    PIXI.loader
        .add("assets/Board.jpg")
        .add("assets/Close.png")
        .add("assets/Close-on-click.png")
        .add("assets/Snake-body.png")
        .add("assets/Snake-head.png")
        .add("assets/Sound-off.png")
        .add("assets/Sound-on.png")
        .add("assets/Target.png")
        .load(() => {
            let factory = {
                Target: () => { 
                    let target = new PIXI.Sprite(PIXI.loader.resources["assets/Target.png"].texture) 
                    target.anchor.x = 0.125;
                    target.anchor.y = 0.125;
                    return target;
                },
                SnakeHead: () => {
                    let snakeHead = new PIXI.Sprite(PIXI.loader.resources["assets/Snake-head.png"].texture);
                    snakeHead.anchor.x = 0.150;
                    snakeHead.anchor.y = 0.150;
                    return snakeHead;
                },
                SnakeBody: () => new PIXI.Sprite(PIXI.loader.resources["assets/Snake-body.png"].texture),
                Board: () => new PIXI.Sprite(PIXI.loader.resources["assets/Board.jpg"].texture),
                CloseIcon: () => new PIXI.Sprite(PIXI.loader.resources["assets/Close.png"].texture),
                CloseIconClicked: () => new PIXI.Sprite(PIXI.loader.resources["assets/Close-on-click.png"].texture),
                SoundOff: () => new PIXI.Sprite(PIXI.loader.resources["assets/Sound-off.png"].texture),
                SoundOn: () => new PIXI.Sprite(PIXI.loader.resources["assets/Sound-on.png"].texture)
            }

            callback(factory);
        })
}

