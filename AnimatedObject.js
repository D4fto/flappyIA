

export class AnimatedObject {
    constructor(src, rows, columns) {
        this.image = new Image();
        this.image.src = src;
        this.rows = rows;
        this.columns = columns;
        this.wSprite = 0;
        this.hSprite = 0;
        this.posIniX = 0;
        this.posIniY = 0;
        this.row = 0;
        this.column = 0;
        this.scale=1
        this.image.onload = () => {
            this.#initializeSpriteDimensions();
            this.#updateSpritePosition();
        };
    }

    #initializeSpriteDimensions() {
        this.wSprite = Math.floor(this.image.width / this.columns);
        this.hSprite = Math.floor(this.image.height / this.rows);
    }

    #updateSpritePosition() {
        this.posIniX = Math.floor(this.wSprite * this.column)-0.2;
        this.posIniY = Math.floor(this.hSprite * this.row);
    }

    translateColumn(modifier) {
        this.column += modifier;
        if (this.column >= this.columns) {
            this.column = 0; 
        }
        this.#updateSpritePosition();
    }

    translateRow(modifier) {
        this.row += modifier;
        if (this.row >= this.rows) {
            this.row = 0;
        }
        this.#updateSpritePosition();
    }

    setColumn(column) {
        if (column >= 0 && column < this.columns) {
            this.column = column;
        } else {
            this.column = 0;
        }
        this.#updateSpritePosition();
    }

    setRow(row) {
        if (row >= 0 && row < this.rows) {
            this.row = row;
        } else {
            this.row = 0;
        }
        this.#updateSpritePosition();
    }
}
