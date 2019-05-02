function init(app) {
    loadSprites(factory => {
        
        app.stage.addChild(factory.Board());
        
        let soundControlContainer = new PIXI.Container();
        app.stage.addChild(soundControlContainer);
        soundControlContainer.x = 650;
        soundControlContainer.y = 10;

        let scoreSound = document.getElementById("scoreSound");
        let themeSound = document.getElementById("themeSound");
        new SoundControl(soundControlContainer, [scoreSound, themeSound], factory);

        let closeIconContainer = new PIXI.Container();
        app.stage.addChild(closeIconContainer);
        closeIconContainer.x = 730;
        closeIconContainer.y = 15;
        new CloseControl(closeIconContainer, factory);

        let container = new PIXI.Container();
        container.width = container.height = 800;
        container.y = 214;
        
        app.stage.addChild(container);
        
        let board = new Board(800, 800, 50);
        
        let game = new Game(container, board, factory);
        game.start();

        addEventListener("keyup", () => {
            if(themeSound.paused)
                themeSound.play();
        })

        let targetIcon = factory.Target();
        app.stage.addChild(targetIcon);
        targetIcon.x = 10;
        targetIcon.y = 20;

        let scoreText = new PIXI.Text("0", {fontFamily : 'Ultra', fontSize: 60, fill : 0xff1111});
        app.stage.addChild(scoreText);
        scoreText.x = 80;
        scoreText.y = 15;

        let score = 0;

        game.onScore(() => {
            score++;
            scoreText.text = score;

            scoreSound.pause();
            scoreSound.currentTime = 0;
            scoreSound.play();

            game.speedUp();
        })

        game.onGameOver(() => {
            scoreText.text = `${score}: GAME OVER`;
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

