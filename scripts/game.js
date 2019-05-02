class Game {
    
    constructor(container, board, factory) {
        this.container = container;
        this.board = board;
        this.factory = factory;
        this.timeToNextFrameTotal = 10;
        this.timeToNextFrame = this.timeToNextFrameTotal;
        this.over = false;
    }

    onCommand(ev) {
        switch(ev.keyCode) {
            case 37:
                this.snake.moveLeft();
                break;

            case 38:
                this.snake.moveUp();
                break;

            case 39:
                this.snake.moveRight();
                break;

            case 40:
                this.snake.moveDown();
                break;
        }
    }

    start() {
        removeEventListener("keydown", this.onCommand.bind(this));

        this.container.removeChildren();
        this.board.clear();
        
        this.snakeHead = this.factory.SnakeHead();
        this.container.addChild(this.snakeHead);
        let snakeOnGrid = this.board.occupyTileWithIndex(this.snakeHead, 120);
        this.snake = new Snake(this.board, this.snakeHead, snakeOnGrid.x, snakeOnGrid.y);

        this.growSnake();
        this.snake.move();

        this.target = this.factory.Target();
        this.container.addChildAt(this.target, 0);
        let index = this.board.getRandomAvailableTileIndex();
        let targetOnGrid = this.board.occupyTileWithIndex(this.target, index);
        this.targetX = targetOnGrid.x;
        this.targetY = targetOnGrid.y;

        addEventListener("keydown", this.onCommand.bind(this));
    }

    onTick(delta) {
        if(this.over)
            return;

        if(this.timeToNextFrame <= 0) {
            this.timeToNextFrame = this.timeToNextFrameTotal; 
        }
        else {
            this.timeToNextFrame -= delta;
            return;
        }

        this.update();
    }

    update() {
        try {
            this.snake.move();
        }
        catch(e) {
            let {x: gridX, y: gridY} = e.grid;

            if(gridX == this.targetX && gridY == this.targetY) {
                this.board.vacantTileWithGrid(gridX, gridY);
                
                this.growSnake();
                this.snake.resume();

                let targetTileIndex = this.board.getRandomAvailableTileIndex();
                let {x: newTargetX, y: newTargetY} = this.board.occupyTileWithIndex(this.target, targetTileIndex);
                this.targetX = newTargetX;
                this.targetY = newTargetY;

                if(this.onScoreCallback)
                    this.onScoreCallback();
            }
            else {
                this.over = true;

                if(this.onGameOverCallback)
                    this.onGameOverCallback();
            }

        }
    }

    reset() {

    }

    growSnake() {
        let newTail = this.factory.SnakeBody();
        this.container.addChildAt(newTail, 0);
        this.snake.grow(newTail);
    }

    isFood() {}

    onGameOver(callback) {
        this.onGameOverCallback = callback;
    }

    onScore(callback) {
        this.onScoreCallback = callback;
    }
}