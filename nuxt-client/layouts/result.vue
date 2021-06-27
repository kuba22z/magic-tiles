<template>
    <div>
        <HeaderCard :display-countdown="false" />
        <Nuxt />
    </div>
</template>
<style>
@import "//fonts.googleapis.com/css?family=Amatic+SC";
/* Sets background image that fits the whole screen */
html {
    background-image: url("../assets/backgroundImageGlasses.svg");
    background-size: cover;
    height: 100vh;
}
</style>
