import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { Rect, RectArray } from "~/types/interfaces/gaming-screen";
import {RectBoardImpl, RectImpl, RectRowImpl} from "~/types/classes/gaming-srceen";

@Module({
    name: "gamingBoard",
    stateFactory: true,
    namespaced: true,
})
export default class gamingBoard extends VuexModule {
  public rectBoard: RectArray<RectArray<Rect>> = new RectBoardImpl();

  /**
   * @describe moves all rectangle rows to the bottom
   * @param stepSize determines how far all rectangle rows are moved down
   */
  @Mutation
  moveRectRowDown(stepSize: number) {
    for (let rectRow of this.rectBoard.array) {
      for (let a of rectRow.array) {
        a.y = a.y + stepSize;
      }
    }
  }

  /**
   * @describe creates a new RectRow at the top and removes a RectRow at the bottom
   */
  @Mutation
  pushFrontAndPop(){
      //adds one Row to the beginning of the array
      this.rectBoard.array.unshift(new RectRowImpl(-25));
      this.rectBoard.array.pop();
    }

}
