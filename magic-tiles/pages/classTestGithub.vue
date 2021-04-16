<template>
    <div
        class="screen-counter flex flex-col w-full items-center justify-center"
    >
        <h1 class="text-lg font-semibold">Hello counter world</h1>
        <div class="mt-10 flex flex-col justify-center items-center">
            <div class="counter">Counter : {{ counter }}</div>
            <div
                class="counter-buttons flex w-full space-x-10 justify-center items-center"
            >
                <button @click="increment">Increment</button>
                <button @click="decrement">Decrement</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component
export default class ClassAPICounter extends Vue {
    counter: number = 0;

    /**
    @describe increments counter by one.
     */
    increment() {
        this.counter++;
    }

    /**
     * @describe decrements counter by one.
     */
    decrement() {
        this.counter--;
    }
}
</script>

<style></style>
