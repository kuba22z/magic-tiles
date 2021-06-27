<template>
    <div>
        <div
            class="
                flex
                h-20
                w-full
                justify-start
                items-center
                bg-backtostreet-blue
            "
        >
            <div v-if="displayCountdown" class="countdown ml-6 w-20">
                <CountdownTimerWrapper />
            </div>
            <a
                href="https://back2street.de"
                class="
                    logo
                    flex
                    justify-center
                    items-center
                    text-center text-white
                    w-full
                    h-full
                "
            >
                <img
                    src="../assets/back2street-logo.svg"
                    alt="Back2street logo"
                    class="object-fit h-4/6 w-4/6"
                />
            </a>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";

@Component({
    name: "HeaderCard",
    components: {},
})
export default class HeaderCard extends Vue {
    // determines whether we are displaying the countdown.
    @Prop() public displayCountdown!: boolean;
}
</script>

<style scoped></style>
