<!-- Component serves a generic styling template for all buttons -->
<template>
    <NuxtLink
        v-if="isNuxtLink"
        :to="linkTo"
        :class="[
            `${color}-bg-button-text-color`,
            `hover:${color}-bg-button-text-hover-color`,
            `${color}-bg-button-bg-color`,
            `hover:${color}-bg-button-bg-hover-color`,
            width,
        ]"
        class="rounded-2xl shadow-md h-16 items-center justify-center text-lg ni-button"
    >
        <div class="mx-9 mt-4 mb-2 text-center font-bold">
            {{ text }}
        </div>
    </NuxtLink>
    <!-- TODO(pierre): add case for linking to back to street.
    ALL ON SAME PAGE -> nuxtlink (no refresh of page)
    ALL TO OTHER PAGES/main page -> a href
    -->
    <!-- MAYBE(pierre): leave or remove error case -->
    <div v-else>no type was given to ni button</div>
</template>

<script>
export default {
    // dynamic classes need to be passed as fulltext classes. E.g: ni-light-green-bg
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
        /**
         * returns width that the button will have in px based on prop
         * fixedWidth. given px in tailwindcss jit compatible notation
         */
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
};
</script>

<style scoped>
.ni-button {
    border-bottom-left-radius: 0px;
}
</style>
