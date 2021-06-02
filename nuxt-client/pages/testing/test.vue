<template>
    <div>
        <div class="flex justify-center items-center">
            <div class="explanation">
                Tests the timerutils.countDown function.
            </div>
            <!-- TODO(pierre): CONTINUE HERE, test the utility! -->
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
