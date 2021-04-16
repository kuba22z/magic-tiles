<template>
    <div>
        <div
            class="flex flex-col justify-center items-center border border-red-300"
        >
            <div
                class="explanation-top border flex justify-center items-center border-red-300 my-10 w-full text-center"
            >
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Cupiditate, inventore eligendi. Saepe odit consequuntur
                consectetur iste? Doloremque soluta eius nobis, distinctio,
            </div>
            <div
                class="flex flex-col justify-center items-center logo-and-hint mt-1 w-full border border-red-300"
            >
                <div class="image h-20 w-20 bg-green-300"></div>
                <div class="hint text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Illum totam autem reprehender
                </div>
            </div>
            <div
                class="bottom-navigation-buttons flex flex-col justify-center mt-10 items-center border border-red-300 w-full"
            >
                <div
                    class="next-button border border-red-300 h-12 w-24 flex justify-center items-center text-center"
                >
                    weiter
                </div>
                <div
                    class="back-button mt-6 border border-red-300 h-12 w-24 flex justify-center items-center text-center"
                >
                    back to street!
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({});
</script>

<style scoped></style>
