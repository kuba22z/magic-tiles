<template>
    <div
        class="border-solid border-red border-2 w-full bg-white"
        style="border-radius: 0.4rem"
    >
        {{ text }}
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
    name: "HeaderLine",
})
export default class headerLine extends Vue {
    /**
     * @description determines whether the game starts
     */
    @Prop({ default: "false" }) public text!: string;
}
</script>

<style scoped></style>
