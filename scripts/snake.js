class Snake {
    constructor(board, head, initX, initY) {
        this.gridX = 0;
        this.gridY = 0;
        this.board = board;
        this.head = head;
        this.nextHeadX = initX;
        this.nextHeadY = initY;
        this.snakeVX = 1;
        this.snakeVY = 0;
        this.tails = [];
        this.direction = "right";
    }

    move() {
        this.updateDirection();

        try {
            this.prevHeadX = this.nextHeadX;
            this.prevHeadY = this.nextHeadY;
            this.board.vacantTileWithGrid(this.prevHeadX, this.prevHeadY);

            this.nextHeadX = this.cap(this.nextHeadX + this.snakeVX, 0, this.board.columns);
            this.nextHeadY = this.cap(this.nextHeadY + this.snakeVY, 0, this.board.rows);
            this.board.occupyTileWithGrid(this.head, this.nextHeadX, this.nextHeadY);
            
            this.moveTails(this.prevHeadX, this.prevHeadY);
        }
        catch(e) {
            throw e;
        }
    }

    moveTails(prevHeadX, prevHeadY) {
        let nextX = prevHeadX;
        let nextY = prevHeadY;

        for(var i = 0; i < this.tails.length; i++) {
            let tail = this.tails[i];

            this.board.occupyTileWithGrid(tail.sprite, nextX, nextY);
            let prevX = tail.x;
            let prevY = tail.y;
            
            tail.x = nextX;
            tail.y = nextY;
            
            nextX = prevX;
            nextY = prevY;

            this.board.vacantTileWithGrid(nextX, nextY);
        }
    }

    resume() {
        this.board.occupyTileWithGrid(this.head, this.nextHeadX, this.nextHeadY);
        this.moveTails(this.prevHeadX, this.prevHeadY);
    }

    cap(pos, min, max) {
        if(pos < min)
            return max - 1;
        
        return pos % max;
    }

    grow(tail) {
        this.tails.push({sprite: tail, x: this.nextHeadX, y: this.nextHeadY});
    }

    updateDirection() {
        switch(this.direction) {
            case "up":
                this.snakeVX = 0;
                this.snakeVY = -1;
                break;

            case "down":
                this.snakeVX = 0;
                this.snakeVY = 1;
                break;

            case "left":
                this.snakeVX = -1;
                this.snakeVY = 0;
                break;

            case "right":
                this.snakeVX = 1;
                this.snakeVY = 0;
                break;
        }
    }

    moveUp() {
        if(this.snakeVY == 1)
            return;

        this.direction = "up";
    }

    moveDown() {
        if(this.snakeVY == -1)
            return;

        this.direction = "down";
    }

    moveLeft() {
        if(this.snakeVX == 1)
            return;

        this.direction = "left";
    }

    moveRight() {
        if(this.snakeVX == -1)
            return;

        this.direction = "right";
    }
}