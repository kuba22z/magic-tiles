/**
 * @description represents the score information during the game
 */
export class ScoreBoard {
    highscore: number;
    score: number;

    constructor(highscore: number = 0, score: number = 0) {
        this.highscore = highscore;
        this.score = score;
    }
}
