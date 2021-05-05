<template>
    <div>
        <svg height="428" width="282" class="border border-blue-600">
            <rect height="25%" width="25%" y="25%"></rect>
            <rect height="25%" width="25%" y="50%"></rect>
            <rect height="25%" width="25%" y="75%" fill="red"></rect>

            <rect height="25%" width="25%" x="50%"></rect>
            <rect height="25%" width="25%" x="75%"></rect>
            <GameRectangle :rect="rect" />
        </svg>

        <button @click="startGame" class="test-btn border border-black w-40">
            Test
        </button>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Rect } from "types/gaming-screen";
import GameRectangle from "~/components/gameRectangle.vue";
import Test from "~/pages/testing/test.vue";

const board = namespace("game-board");
@Component({
    components: { Test, GameRectangle },
})
export default class gamingBoard extends Vue {
    @board.State
    public rect!: Rect;

    @board.Mutation
    public moveRectDown!: (c: number) => void;

    /**
     *@describe Endless loop which moves a Rectangle to the bottom.
     */
    public startGame() {
        let c: number = 0;
        setInterval(() => {
            this.moveRectDown(c);
            c += 1;
        }, 30);
    }
}
</script>
