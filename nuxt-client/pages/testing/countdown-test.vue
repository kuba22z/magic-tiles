<template>
    <div>
        <div class="flex flex-col justify-center text-center">
            Testing the countdown timer :)
        </div>
        <CountdownTimer
            :startValue="235"
            :endValue="0"
            :countingInterval="1"
            :countingUnit="countingUnit"
            :runCountdown="true"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { CountingUnit } from "~/types/timer";
import CountdownTimer from "~/components/CountdownTimer.vue";

@Component({
    name: "CountDownTest",
    components: {
        CountdownTimer,
    },
})
export default class CountDownTest extends Vue {
    get countingUnit(): number {
        return CountingUnit.seconds;
    }

    countdownTimerTickHappened(timeLeft: number) {
        console.log("countdown-test notified by emit.");
        console.log(`time left: ${timeLeft}`);
    }

    created() {
        this.$nuxt.$on("testEmit.", () => console.log("emit worked."));
        this.$nuxt.$on("countdownTimerTickHappened", (timeLeft: number) =>
            console.log(`timer tick emit worked. time left: ${timeLeft}`)
        );
    }
}
</script>

<style scoped></style>
