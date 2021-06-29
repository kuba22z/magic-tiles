<template>
    <div>
        <HeaderCard :display-countdown="true" />
        <Nuxt />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import HeaderCard from "~/components/HeaderCard.vue";

@Component({
    components: {
        HeaderCard,
    },
})
export default class gamingRectangle extends Vue {
    mounted() {
        // makes sure user will be redirected to result screen when the
        // countdown timer hits 0:00. This has a special implementation inside
        // the gaming-screen, which uses another layout.
        this.$nuxt.$on("countdownTimerStopped", () =>
            this.$router.push("/result-screen")
        );
    }
}
</script>
<style>
@import "//fonts.googleapis.com/css?family=Amatic+SC";
/* Sets background image that fits the whole screen */
html {
    background-image: url("../assets/backgroundImageGlasses.svg");
    background-size: cover;
    height: 100vh;
}
</style>
