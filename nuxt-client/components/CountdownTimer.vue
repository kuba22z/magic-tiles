<template>
    <div>
        <div class="time-left">time left: {{ timeLeft }}</div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({
    name: "CountDownTimer",
})
export default class CountdownTimer extends Vue {
    /**
     * The duration the timer will count down for. Unit is seconds.
     */
    @Prop() timerDuration!: number;

    timeLeft: number | null = null;
}
</script>

<style scoped></style>
