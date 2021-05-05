import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { Rect, RectRow } from "types/gaming-screen";

@Module({
    name: "gamingBoard",
    stateFactory: true,
    namespaced: true,
})
export default class gamingBoard extends VuexModule {
    public rect: Rect = {
        x: 25,
        y: 0,
        image:
            "https://mdn.mozillademos.org/files/6457/mdn_logo_only_color.png",
    };
    public rectRow: RectRow = {
        row: [
            {
                x: 0,
                y: 75,
                image: "",
            },
            {
                x: 25,
                y: 75,
                image: "",
            },
            {
                x: 50,
                y: 75,
                image: "",
            },
            {
                x: 75,
                y: 75,
                image: "",
            },
        ],
    };

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
