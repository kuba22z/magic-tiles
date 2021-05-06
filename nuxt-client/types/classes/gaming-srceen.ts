import { Rect, RectArray, ScoreBoard } from "~/types/interfaces/gaming-screen";

export class RectImpl implements Rect {
    image: string;
    x: number;
    y: number;

    constructor(x: number = 0, y: number = 0, image: string = "") {
        this.x = x;
        this.y = y;
        this.image = image;
    }
}

export class RectRowImpl implements RectArray<Rect> {
    public array: Rect[] = [];
    constructor(y: number = 0) {
        const random: number = Math.floor(Math.random() * 4);

        for (let x = 0, i = 0; x < 100; x += 25, i++) {
            if (random === i)
                this.array.push(
                    new RectImpl(
                        x,
                        y,
                        "https://media.prod.mdn.mozit.cloud/attachments/2013/11/15/6457/5e0f6aa96fb8e4593f143aa803576698/mdn_logo_only_color.png"
                    )
                );
            else this.array.push(new RectImpl(x, y));
        }
    }
}
export class RectBoardImpl implements RectArray<RectArray<Rect>> {
    public array: RectArray<Rect>[]=[];

    constructor(NumOfRow: number = 0) {
        for (let y = -25; y < 100; y += 25) {
            this.array.push(new RectRowImpl(y));
        }
    }
}

export class ScoreBoardImpl implements ScoreBoard {
    highscore: number;
    score: number;

    constructor(highscore: number = 0, score: number = 0) {
        this.highscore = highscore;
        this.score = score;
    }
}
