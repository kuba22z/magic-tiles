export class Rect {
    image: string;
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0, image: string = "") {
        this.x = x;
        this.y = y;
        this.image = image;
    }
}

export class RectRow {
    public row: Rect[] = [];
    constructor(y: number = 0) {
        const random: number = Math.floor(Math.random() * 4);

        for (let x = 0, i = 0; x < 100; x += 25, i++) {
            if (random === i) this.row.push(new Rect(x, y, "book.svg"));
            else this.row.push(new Rect(x, y, "cook-book.svg"));
        }
    }
}
export class RectBoard {
    public board: RectRow[] = [];

    constructor(NumOfRow: number = 0) {
        for (let y = -25; y < (NumOfRow - 1) * 25; y += 25) {
            this.board.push(new RectRow(y));
        }
    }
}
