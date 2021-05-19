export class Rect {
    image: string;
    x: number;
    y: number;
    isClicked: boolean;

    constructor(
        x: number = 0,
        y: number = 0,
        image: string = "",
        isClicked: boolean = false
    ) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.isClicked = isClicked;
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
        for (let y = -125; y < (NumOfRow - 5) * 25; y += 25) {
            this.board.push(new RectRow(y));
        }
    }
}
