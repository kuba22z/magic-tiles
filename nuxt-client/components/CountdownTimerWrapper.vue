<template>
    <div>
        <CountdownTimer
            :start-value="secondsLeft"
            :end-value="0"
            :counting-interval="1"
            :counting-unit="countingUnit"
            :run-countdown="true"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import CountdownTimer from "~/components/CountdownTimer.vue";
import { gameInfoStore } from "~/store";
import { CountingUnit } from "~/types/timer";
import { TimerUtils } from "~/utils/timerUtils";

@Component({
    name: "CountdownTimerWrapper",
    components: {
        CountdownTimer,
    },
})
/**
 * @description Component that wraps the generic CountdownTimer component
 * to fit in the magic-tiles use case.
 * The events from CountdownTimer are bubbled up to its parent if they are
 * not catched here.
 */
export default class CountdownTimerWrapper extends Vue {
    get countingUnit(): number {
        return CountingUnit.seconds;
    }

    get validUntil(): Date {
        const tokenValidUntil: Date | null = gameInfoStore.getValidUntil;
        if (tokenValidUntil === null) {
            // TODO(pierre): remove once finished developing.
            return new Date(Date.now() + 1000 * 60 * 5);
            throw new Error("CountdownTimerWrapper error. ValidUntil is null.");
        }
        return tokenValidUntil;
    }

    get secondsLeft(): number {
        return (
            TimerUtils.getTimeInSeconds(this.validUntil) -
            TimerUtils.getTimeInSeconds(new Date())
        );
    }
}
</script>

<style scoped></style>
