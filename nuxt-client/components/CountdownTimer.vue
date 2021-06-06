<template>
    <div>
        <div
            v-show="timerVisible"
            class="flex flex-col justify-center items-center"
        >
            <div class="countdown-test">Testing the countdown timer.</div>
            <div class="running-timer" v-if="runCountdown">
                <div class="description">shall run the countdown</div>
                <div class="time">{{ currentTime }}</div>
            </div>
            <div class="timer-not-running" v-else>
                <div class="description">not running the countdown.</div>
                <div class="time">{{ currentTime }}</div>
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
    /**
     * @description Determines if the counter shall be visible.
     * Required for pages where we don't display the timer. Since we still
     * have to count down the users available time.
     */
    @Prop() timerVisible!: boolean;

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
