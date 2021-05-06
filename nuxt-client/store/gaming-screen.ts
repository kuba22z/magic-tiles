import { Module, VuexModule } from "vuex-module-decorators";
import { ScoreBoard } from "~/types/interfaces/gaming-screen";
import {ScoreBoardImpl} from "~/types/classes/gaming-srceen";

@Module({
    name: "gamingScreen",
    stateFactory: true,
    namespaced: true,
})
export default class gamingScreen extends VuexModule {
    public scoreBoard: ScoreBoard = new ScoreBoardImpl();
}
