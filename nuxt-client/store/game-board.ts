import { Module, VuexModule, VuexMutation } from "nuxt-property-decorator";
import { RectBoard, RectRow } from "~/types/game-board";

@Module({
    name: "gamingBoard",
    stateFactory: true,
    namespaced: true,
})
export default class GamingBoard extends VuexModule {
    public rectBoard: RectBoard = new RectBoard(5);

    /**
     * @describe moves all rectangle rows to the bottom
     * @param stepSize determines how far all rectangle rows are moved down
     */
    @VuexMutation
    moveRectRowDown(stepSize: number) {
        for (const rectRow of this.rectBoard.board) {
            for (const rect of rectRow.row) {
                rect.y = rect.y + stepSize;
            }
        }
    }

    /**
     * @describe creates a new RectRow at the top and removes a RectRow at the bottom
     */
    @VuexMutation
    pushFrontAndPop() {
        // adds one Row to the beginning of the array
        this.rectBoard.board.unshift(new RectRow(-25));
        this.rectBoard.board.pop();
    }

    @VuexMutation
    setIsClicked(indexes: [number, number]) {
        this.rectBoard.board[indexes[0]].row[indexes[1]].isClicked = true;
    }
}
