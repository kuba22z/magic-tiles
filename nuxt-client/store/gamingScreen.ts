import { Module, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { ScoreBoard } from "~/types/scoreBoard";

@Module({
    name: "gamingScreen",
    stateFactory: true,
    namespaced: true,
})
export default class GamingScreenStore extends VuexModule {
    public scoreBoard: ScoreBoard = new ScoreBoard();
    public sessionHighscore: number = 0;

    /**
     *@description increments the score
     */
    @VuexMutation
    incrementScore() {
        this.scoreBoard.score++;
    }

    @VuexMutation
    setScore(newScore: number = 0) {
        this.scoreBoard.score = newScore;
    }

    @VuexMutation
    setSessionHighscore(newHighscore: number = 0) {
        this.sessionHighscore = newHighscore;
    }

    get getSessionHighscore(): number {
        return this.sessionHighscore;
    }

    get getScore(): number {
        return this.scoreBoard.score;
    }

    get getHighscore(): number {
        return this.scoreBoard.highscore;
    }
}
