import { Module, VuexModule } from "vuex-module-decorators";
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
}
