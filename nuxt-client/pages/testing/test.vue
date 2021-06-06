<template>
    <div>
        <div class="flex flex-col justify-center items-center">
            <div class="explanation text-lg">
                Tests the timerutils.countDown function.
            </div>
            <div class="border border-red-300 text-lg" @click="runMe()">
                click me to run the countdown!
            </div>
            <div>time left: {{ timeLeft }}</div>
            <div>check your console after clicking!</div>
            <div class="current-time">{{ currentTime }}</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { TimerUtils } from "~/utils/timerUtils";
import { CountingUnit } from "~/types/timer";

@Component
export default class Test extends Vue {
    startValue: number = 3;
    endValue: number = 0;
    countingUnit: CountingUnit = CountingUnit.seconds;
    countingInterval: number = 1;

    timeLeft: number = this.startValue;

    /**
     * @description runs the countDown function from the timer utils with given
     * parameters to test the functionality.
     */
    runMe() {
        console.log("function started.");
        TimerUtils.countDown(
            this.startValue,
            this.endValue,
            this.countingUnit,
            this.countingInterval,
            this.decreaseTimeLeft
        );
    }

    decreaseTimeLeft() {
        this.timeLeft--;
    }

    get currentMinute(): number {
        return Math.floor(this.timeLeft / 60);
    }

    get currentSecond(): number {
        return this.timeLeft % 60;
    }

    get currentTime(): string {
        return `${this.currentMinute}:${this.currentSecond}`;
    }
}
</script>

<style scoped></style>
