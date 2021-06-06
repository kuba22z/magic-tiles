<template>
    <div>
        <div class="flex flex-col justify-center items-center">
            <div class="explanation text-lg">
                Tests the timerutils.countDown function.
            </div>
            <div class="border border-red-300 text-lg" @click="runMe()">
                click me to run the countdown!
            </div>
            <div>check your console after clicking!</div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { TimerUtils } from "~/utils/timerUtils";
import { CountingUnit } from "~/types/timer";

@Component
export default class Test extends Vue {
    startValue: number = 20;
    endValue: number = 3;
    countingUnit: CountingUnit = CountingUnit.seconds;
    countingInterval: number = 2;

    runMe() {
        console.log("function started.");
        TimerUtils.countDown(
            this.startValue,
            this.endValue,
            this.countingUnit,
            this.countingInterval,
            this.logStuff
        );
    }

    logStuff() {
        console.log(new Date());
    }
}
</script>

<style scoped></style>
