import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { Rect } from "types/gaming-screen";

@Module({
    name: "gamingBoard",
    stateFactory: true,
    namespaced: true,
})
export default class gamingBoard extends VuexModule {
    public rect: Rect = {
        x: 25,
        y: 0,
    };

    get getRectangle(): Rect {
        return this.rect;
    }
    @Mutation
    moveRectDown(c: number) {
        this.rect = {
            x: this.rect.x,
            y: c,
        };
    }
}
