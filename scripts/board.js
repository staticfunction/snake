class Board {
    constructor(width, height, tileSize) {
        this.width = width;
        this.height = height;
        this.tileSize = tileSize;

        this.columns = width / tileSize;
        this.rows = height / tileSize;

        this.clear();
    }

    mapIndexToGrid(index) {
        if(index >= this.totalTiles || index < 0)
            throw new Error("OutOfBounds");

        return {
            x: index % this.columns,
            y: Math.floor(index / this.rows)
        }
    }

    mapGridToIndex(x, y) {
        if(x >= this.columns || y >= this.rows || x < 0 || y < 0)
            throw new Error("OutOfBounds");

        return y * this.columns + x;
    }

    isGridOccupied(gridX, gridY) {
        let index = this.mapGridToIndex(gridX, gridY);
        return this.isIndexOccupied(index);
    }

    isIndexOccupied(index) {
        return this.occupiedTiles[index] == true;
    }

    occupyIndex(index) {
        if(this.isIndexOccupied(index))
            throw new Error("isOccupied");

        let availabilityIndex = this.availableTiles.indexOf(index);
        this.availableTiles.splice(availabilityIndex, 1); 
        this.occupiedTiles[index] = true;
    }

    occupyTileWithIndex(sprite, index) {
        //pop the tile with index from availableTiles
        try {
            this.occupyIndex(index);
        }
        catch(e) {
            let {x, y} = mapIndexToGrid(index);
            e.grid = {x, y};
            throw e;
        }

        //position sprite with x y
        let {x, y} = this.mapIndexToGrid(index);
        this.positionSpriteWithGrid(sprite, x, y);
        return {x, y};
    }

    occupyTileWithGrid(sprite, gridX, gridY) {
        //pop the tile with  from availableTiles
        let index = this.mapGridToIndex(gridX, gridY);

        try {
            this.occupyIndex(index);
        }
        catch(e) {
            e.grid = {x: gridX, y: gridY};
            throw e;
        }

        //position sprite with x y
        this.positionSpriteWithGrid(sprite, gridX, gridY);
        return index;
    }

    positionSpriteWithGrid(sprite, gridX, gridY) {
        sprite.x = gridX * this.tileSize;
        sprite.y = gridY * this.tileSize;
    }

    getGridXYFromPosition(posX, posY) {
        return {
            x: Math.floor(posX / this.tileSize),
            y: Math.floor(posY / this.tileSize) 
        }
    }

    vacantTileWithIndex(index) {
        this.availableTiles.push(index);
        this.occupiedTiles[index] = false;
    }

    vacantTileWithGrid(gridX, gridY) {
        let index = this.mapGridToIndex(gridX, gridY);
        this.vacantTileWithIndex(index);
    }

    getRandomAvailableTileIndex() {
        return this.availableTiles[Math.floor(Math.random() * this.availableTiles.length)];
    }

    clear() {
        let totalTiles = this.columns * this.rows;
    
        this.availableTiles = [];
        this.occupiedTiles = [];

        for(let i = 0; i < totalTiles; i++) {
            this.occupiedTiles.push(false);
            this.availableTiles.push(i);
        }
    }
}