<template>
    <div>
        <div class="button-wrapper w-full flex justify-center items-center">
            <div
                class="button bg-red-300 hover:bg-red-500 py-5 px-10 rounded-xl flex justify-center items-center"
                @click="changeCaption"
            >
                {{ buttonCaption }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "nuxt-property-decorator";

@Component
export default class extends Vue {
    /**
     * NOTE(pierre):
     * Example can be found here: https://github.com/kaorun343/vue-property-decorator#Prop
     * readonly -> value that we get passed may not be overwritten/changed inside
     * this component.
     * buttonCaption! -> prop/variable will be named buttonCaption.
     * The postfix '!' is the non-null assertion operator.
     * src: https://stackoverflow.com/questions/42273853/in-typescript-what-is-the-exclamation-mark-bang-operator-when-dereferenci
     * Meaning it will throw an error if we don't pass it to this component.
     */
    @Prop(String) buttonCaption!: String;

    changeCaption() {
        this.buttonCaption === "click me"
            ? (this.buttonCaption = "CLICK ME")
            : (this.buttonCaption = "click me");
    }
}
</script>

<style scoped></style>
