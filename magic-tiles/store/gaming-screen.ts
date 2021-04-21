import { Module, VuexModule } from "vuex-module-decorators";
import { ScoreBoard } from "../types/gaming-screen";

@Module({
    name: "gamingScreen",
    stateFactory: true,
    namespaced: true,
})
export default class gamingScreen extends VuexModule {
    public scoreBoard: ScoreBoard = {
        score: 0,
        highscore: 0,
    };

    get getHighscore(): number {
        return this.scoreBoard.highscore;
    }
    get getScore(): number {
        return this.scoreBoard.score;
    }
}
