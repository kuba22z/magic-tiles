export class ScoreBoard {
    highscore: number;
    score: number;

    constructor(highscore: number = 0, score: number = 0) {
        this.highscore = highscore;
        this.score = score;
    }
}
