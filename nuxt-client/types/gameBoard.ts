import { gameInfoStore } from "~/store";

/**
 * @description represents a rectangle with the coordinates and a image
 */
export class Rect {
    image: string;
    x: number;
    y: number;
    isClicked: boolean;
    color: string;
    /**
     * @description initializes a rectangle
     */
    constructor(
        x: number = 0,
        y: number = 0,
        image: string = "",
        isClicked: boolean = false,
        color: string = "white"
    ) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.isClicked = isClicked;
        this.color = color;
    }
}

/**
 * @description this type contains 4 rectangles which are arranged horizontally.
 */
export class RectRow {
    public row: Rect[] = [];

    public correctImage!: string;

    /**
     * @description initializes a RectRow, the correct image is assigned to a random place in the RectRow.
     * false images are also assigned to a other random location
     * @param rectPosY y Coordinates where the RectRow should be initialized
     */
    constructor(rectPosY: number = 0) {
        const correctImage: string = gameInfoStore.getCorrectImage;
        const falseImages: string[] = gameInfoStore.getFalseImages;
        // Number of Rectangles for each Row
        const rectanglesPerRow: number = 4;

        // relative width of all rectangles
        const rectWitdh: number = 25;

        // x coordinate of current rectangle
        let rectPosX: number;
        let resultingImage: string;
        let randomNum;

        // number of correct image -> a number between 0 and 3
        const numOfCorrectImage: number = Math.floor(
            Math.random() * rectanglesPerRow
        );
        for (let i = 0; i < rectanglesPerRow; i++) {
            // random number between 0 and indexOfLastFalseImage
            randomNum = Math.floor(Math.random() * falseImages.length);
            resultingImage =
                i === numOfCorrectImage ? correctImage : falseImages[randomNum];
            rectPosX = i * rectWitdh;
            this.row.push(new Rect(rectPosX, rectPosY, resultingImage));
        }
    }
}

/**
 * @description The type contains 5 RectRow in an array. This class represents
 * the game board and contains the necessary coordinates for the rectangles
 */
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
