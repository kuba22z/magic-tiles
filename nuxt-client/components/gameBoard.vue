<template>
    <div>
        <svg height="426" width="282" class="border border-blue-600">
            <GameRow v-for="rectRow in rectBoard.array" :rect-row="rectRow" />
        </svg>

        <button class="test-btn border border-black w-40" @click="startGame">
            Test
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Rect, RectArray } from "~/types/interfaces/gaming-screen";
import GameRectangle from "~/components/gameRectangle.vue";
import Test from "~/pages/testing/test.vue";
import GameRow from "~/components/gameRow.vue";

const board = namespace("game-board");
@Component({
    components: { GameRow, Test, GameRectangle },
})
export default class gamingBoard extends Vue {
    @board.State
    public rectBoard!: RectArray<RectArray<Rect>>;

    @board.Mutation
    public moveRectRowDown!: (c: number) => void;

    /**
     *@describe Endless loop which moves a Rectangle to the bottom.
     */
    public startGame() {
        let c: number = 0;
        setInterval(() => {
            this.moveRectRowDown(c);
            c += 0.01;
        }, 10);
    }
}
</script>
