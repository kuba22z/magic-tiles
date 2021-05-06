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
     * @describe moves a rectangle down
     * @param c determines how far a rectangle is moved down
     */
    @Mutation
    moveRectDown(c: number) {
        this.rect = {
            x: this.rect.x,
            y: c,
            image: this.rect.image,
        };
    }
}
