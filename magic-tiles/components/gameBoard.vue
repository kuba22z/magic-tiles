<template>
    <div>
        <svg height="428" width="282" class="border border-blue-600">
            <rect height="25%" width="25%" y="0"></rect>
            <rect height="25%" width="25%" y="25%"></rect>
            <rect height="25%" width="25%" y="50%"></rect>
            <rect height="25%" width="25%" y="75%" fill="red"></rect>

            <rect height="25%" width="25%" x="50%"></rect>
            <rect height="25%" width="25%" x="75%"></rect>
            <rect
                height="25%"
                width="25%"
                :y="rect.y + '%'"
                :x="rect.x + '%'"
                fill="red"
            />
        </svg>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { Rect } from "types/gaming-screen";

const board = namespace("game-board");
@Component
export default class gamingBoard extends Vue {
    public localData: object = {};
    @board.State
    public rect!: Rect;

    @board.Getter("getRectangle")
    public getRectangle!: Rect;
}
</script>
