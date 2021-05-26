import { Module, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { ScoreBoard } from "~/types/scoreBoard";

@Module({
    name: "gamingScreen",
    stateFactory: true,
    namespaced: true,
})
export default class GamingScreen extends VuexModule {
    public scoreBoard: ScoreBoard = new ScoreBoard();

    /**
     *@description increments the score
     */
    @VuexMutation
    incrementScore() {
        this.scoreBoard.score++;
    }
}
