import { Module, Mutation, VuexModule } from "vuex-module-decorators";
import { ScoreBoard } from "~/types/scoreBoard";

@Module({
    name: "gamingScreen",
    stateFactory: true,
    namespaced: true,
})
export default class GamingScreen extends VuexModule {
    public scoreBoard: ScoreBoard = new ScoreBoard();

    /**
     *@describe increments the score
     */
    @Mutation
    incrementScore() {
        this.scoreBoard.score++;
    }
}
