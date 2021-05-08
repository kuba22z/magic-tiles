import { Module, VuexModule } from "vuex-module-decorators";
import { ScoreBoard } from "~/types/scoreBoard";

@Module({
    name: "gamingScreen",
    stateFactory: true,
    namespaced: true,
})
export default class gamingScreen extends VuexModule {
    public scoreBoard: ScoreBoard = new ScoreBoard();
}
