import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { Rect, RectArray } from "~/types/interfaces/gaming-screen";
import { RectBoardImpl, RectImpl } from "~/types/classes/gaming-srceen";

@Module({
    name: "gamingBoard",
    stateFactory: true,
    namespaced: true,
})
export default class gamingBoard extends VuexModule {
    public rect: Rect = new RectImpl(
        25,
        0,
        "https://media.prod.mdn.mozit.cloud/attachments/2013/11/15/6457/5e0f6aa96fb8e4593f143aa803576698/mdn_logo_only_color.png"
    );

    public rectBoard: RectArray<RectArray<Rect>> = new RectBoardImpl();


  /**
   * @describe moves all rectangle rows to the bottom
   * @param c determines how far all rectangle rows are moved down
   */
    @Mutation
    moveRectRowDown(c :number){
      for (let rectRow  of this.rectBoard.array) {
        if (rectRow != undefined) {
          for (let a of rectRow.array) {
          if(a!=undefined)
            a.y = a.y+ c;
          }
        }
      }
    }
}
