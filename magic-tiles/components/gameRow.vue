<template>
    <g>
        <GameRectangle
            v-for="rect in rectRow.row"
            :rect="rect"
            v-bind:key="rect.x"
        />
    </g>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { RectRow } from "types/gaming-screen";
import GameRectangle from "~/components/gameRectangle.vue";
@Component({
    components: { GameRectangle },
})
export default class gamingRectangle extends Vue {
    @Prop() public rectRow!: RectRow;
}
</script>

<style scoped></style>
