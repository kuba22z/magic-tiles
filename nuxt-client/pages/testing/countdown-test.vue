<template>
    <div>
        <div class="flex flex-col justify-center text-center">
            Testing the countdown timer :)
        </div>
        <CountdownTimerWrapper />
        <div class="class text-backtostreet-lightblue bg-backtostreet-blue">
            hello
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { CountingUnit } from "~/types/timer";
import CountdownTimerWrapper from "~/components/CountdownTimerWrapper.vue";

@Component({
    name: "CountDownTest",
    components: {
        CountdownTimerWrapper,
    },
})
export default class CountDownTest extends Vue {
    get countingUnit(): number {
        return CountingUnit.seconds;
    }

    created() {
        this.$nuxt.$on("runTimerStarted", () => console.log("timer started."));
        this.$nuxt.$on("countdownTimerTickHappened", (timeLeft: number) =>
            console.log(`timer tick emit worked. time left: ${timeLeft}`)
        );
    }
}
</script>

<style scoped></style>
