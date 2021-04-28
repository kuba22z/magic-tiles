<!-- Component serves a generic styling template for all buttons -->
<template>
    <NuxtLink
        v-if="buttonType === 'nuxtlink'"
        :to="linkTo"
        :class="[
            /* `${color}-bg-button-text-color`,
            `hover:${color}-bg-button-text-hover-color`,
            `${color}-bg-button-bg-color`,
            `hover:${color}-bg-button-bg-hover-color`,
            'w-' + fixedWidth,*/
        ]"
        class="rounded-2xl shadow-md h-16 items-center justify-center text-lg ni-button"
    >
        <div class="mx-9 mt-4 mb-2 text-center font-bold">
            {{ text }}
        </div>
    </NuxtLink>

    <button
        v-else
        class="rounded-2xl shadow-md h-16 items-center justify-center text-lg ni-button"
    >
        <a :href="linkTo">
            <div class="mx-9 mt-4 mb-2 text-center font-bold">
                {{ text }}
            </div>
        </a>
    </button>
    <!--    TODO(pierre): add case for linking to back to street. ALL ON SAME PAGE ->
    nuxtlink (no refresh of page) ALL TO OTHER PAGES/main page -> a href &ndash;&gt;-->
    <!-- MAYBE(pierre): leave or remove error case -->
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class magicTilesButton extends Vue {
    @Prop({ default: "/" }) linkTo!: string;
    @Prop(String) color!: string;
    @Prop(String) text!: string;

    @Prop({ default: 0 }) fixedWidth!: number;
    @Prop({ default: "nuxtlink" }) buttonType!: string;
}

/* changeCaption() {
    this.buttonCaption === "click me"
      ? (this.buttonCaption = "CLICK ME")
      : (this.buttonCaption = "click me");
  }
*/

/*  // dynamic classes need to be passed as fulltext classes. E.g: ni-light-green-bg
    props: {
        linkTo: {
            type: String,
            default: "/",
        },
        color: {
            type: String,
        },
        text: {
            type: String,
        },
        buttonType: {
            type: String,
            default: "nuxtlink",
        },
        fixedWidth: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        isNuxtLink() {
            return this.buttonType == "nuxtlink";
        },
        isDownload() {
            return this.buttonType == "download";
        },
        isMailto() {
            return this.buttonType == "mailto";
        },
        /!**
         * returns width that the button will have in px based on prop
         * fixedWidth. given px in tailwindcss jit compatible notation
         *!/
        width() {
            // does not work without creating string first, idk why.
            // return this.fixedWidth != 0 ? `w-[${this.fixedWidth}px]` : "";
            const widthString = `w-[${this.fixedWidth}px]`;
            return this.fixedWidth != 0 ? widthString : "";
        },
        pdf() {
            return `/pdfs/${this.linkTo}`;
        },
    },
};*/
</script>

<style scoped>
/*.ni-button {
    border-bottom-left-radius: 0px;
}*/
</style>
