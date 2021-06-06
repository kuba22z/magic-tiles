import { gameInfoStore } from "~/store";

export class Rect {
    image: string;
    x: number;
    y: number;
    isClicked: boolean;
    color: string;

    constructor(
        x: number = 0,
        y: number = 0,
        image: string = "",
        isClicked: boolean = false,
        color: string = "black"
    ) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.isClicked = isClicked;
        this.color = color;
    }
}
export class RectRow {
    public row: Rect[] = [];

    public correctImage!: string;

    constructor(rectPosY: number = 0) {
        const correctImage: string = gameInfoStore.getCorrectImage;
        const badImage: string = gameInfoStore.getFalseImages[0];
        // Number of Rectangles for each Row
        const rectanglesPerRow: number = 4;

        // relative width of all rectangles
        const rectWitdh: number = 25;

        // x coordinate of current rectangle
        let rectPosX: number;
        let resultingImage: string;

        // number of correct image -> a number between 1-4
        const numOfCorrectImage: number = Math.floor(
            Math.random() * rectanglesPerRow
        );

        for (let i = 0; i < rectanglesPerRow; i++) {
            resultingImage = i === numOfCorrectImage ? correctImage : badImage;
            rectPosX = i * rectWitdh;
            this.row.push(new Rect(rectPosX, rectPosY, resultingImage));
        }
    }
}
export class RectBoard {
    public board: RectRow[] = [];

    /**
     * @description initialize the game board so that the RectRows are above the game board
     * @param NumOfRowsOverGameBoard determine the number of RectRows above the gaming board.
     */
    constructor(NumOfRowsOverGameBoard: number = 0) {
        // relative height of all rectangles
        const rowHeight: number = 25;

        // relative height of all rectangles
        let rectPosY: number;

        // the RectRows get a high negative y coordinate beacuse of that they are not visible at the beginning
        for (let i = NumOfRowsOverGameBoard; i > 0; i--) {
            rectPosY = -i * rowHeight;
            this.board.push(new RectRow(rectPosY));
        }
    }
}
