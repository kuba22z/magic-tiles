<template>
    <div>
        <div class="flex flex-col justify-center items-center">
            <div v-if="runCountdown" class="running-timer">
                <!-- MAYBE(pierre): figure out why prettier formats these class attributes so weirdly -->
                <div
                    class="
                        time
                        px-3
                        py-3
                        border-solid border-black border-2
                        rounded-full
                        bg-white
                    "
                >
                    {{ currentTime }}
                </div>
            </div>
            <div v-else class="timer-not-running">
                <div class="description circle">not running the countdown.</div>
                <div
                    class="
                        time
                        px-3
                        py-3
                        border-solid border-black border-2
                        rounded-full
                        bg-white
                    "
                >
                    {{ currentTime }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { TimerUtils } from "~/utils/timerUtils";
import { CountingUnit } from "~/types/timer";

@Component({
    name: "CountdownTimer",
})
export default class CountdownTimer extends Vue {
    /**
     * @description The value from which the counter will start counting.
     */
    @Prop() startValue!: number;
    /**
     * @description The value until which the counter will count.
     */
    @Prop() endValue!: number;
    /**
     * @description The counting unit in which the counter will be counting in.
     */
    @Prop() countingUnit!: CountingUnit;
    /**
     * @description The counting interval in which the counter will be counting
     * in.
     */
    @Prop() countingInterval!: number;
    /**
     * @description Determines if the counter shall run.
     */
    @Prop() runCountdown!: boolean;

    timeLeft: number = this.startValue;

    /**
     * @description Starts the timer on page load if runCountdown is true.
     */
    mounted() {
        if (this.runCountdown) {
            this.runTimer();
        }
    }

    /**
     * @description runs the countDown function from the timer utils with given
     * parameters to test the functionality.
     */
    runTimer() {
        this.$nuxt.$emit("runTimerStarted");
        TimerUtils.countDown(
            this.startValue,
            this.endValue,
            this.countingUnit,
            this.countingInterval,
            this.handleTimerTick
        );
    }

    /**
     * @description Callback that will be called after every countdown tick.
     */
    handleTimerTick() {
        this.decreaseTimeLeft();
        this.countdownTimerTickHappened();
    }

    decreaseTimeLeft(): void {
        this.timeLeft--;
    }

    /**
     * @description Notifies parent component that a timer tick has happened.
     * Also passes the time that is left to the parent.
     */
    // MAYBE(Pierre): find out why @Emit() decorator does not work
    countdownTimerTickHappened() {
        this.$nuxt.$emit("countdownTimerTickHappened", this.timeLeft);
    }

    // NOTE(pierre): these following getters assume that the timer unit
    // is given in seconds. If milliseconds, minutes etc. is required, adapt
    // these accordingly.
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

<style scoped>
.circle {
    border: 1px solid black;
    border-radius: 50%;
}
</style>
