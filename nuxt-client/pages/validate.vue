<template>
    <div>
        <div class="test">Here we will validate the data we just get.</div>
        <div>{{ queryParams }}</div>
        <div v-if="$fetchState.pending" class="validate">Validating...</div>
        <div v-else class="validate">game data: {{ gameData }}</div>
    </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types";
import { Component, Vue } from "nuxt-property-decorator";
import { AxiosResponse } from "axios";

@Component({
    name: "Validation",
})
export default class Validation extends Vue {
    queryParams: any;
    gameData: any = null;

    /**
     * @description gets route params on initial page load.
     */
    async asyncData({ route }: Context) {
        console.log(route);
        return {
            queryParams: route.query,
        };
    }

    async fetch() {
        // sleep one second to mimic delay
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response: AxiosResponse = await this.$axios.post(
            "/api/api/v1/activities/validate",
            {
                activity_id: Number(this.queryParams.activity_id),
            },
            {
                headers: {
                    Authorization: `Bearer ${this.queryParams.token}`,
                },
            }
        );
        this.gameData = response.data;
    }
}
</script>

<style scoped></style>
