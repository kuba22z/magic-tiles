<template>
    <!-- @file This page is used to test the local development state. Since we have no
    local database etc.. we are using this trick to be able to test our current
    state with a local server.-->
    <div class="flex flex-col justify-center text-center">
        <div class="text-xl">
            Hey ! I am a fake page. I act as the main backend main page. Click
            on the game to start playing!
        </div>
        <div
            class="text-xl hover:bg-green-300 bg-green-500"
            @click="createActivity"
        >
            Click to play magic-tiles!
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { AxiosResponse } from "axios";
import { CreatedActivity } from "~/types/gameInfo";

@Component({
    name: "FakeRedirect",
    layout: "blank",
})
export default class FakeRedirect extends Vue {
    activityData: CreatedActivity | null = null;

    /**
     * @description Creates an activity. Will create a valid token, and the
     * corresponding activity id and the expiration timestamp. Will then
     * redirect to the /validate page.
     */
    async createActivity() {
        try {
            const response: AxiosResponse = await this.$axios.get(
                "/api/user100/activity/create/8"
            );
            this.activityData = response.data;
            this.redirectToValidatePageWithParams();
        } catch (e) {
            console.log(`We got an error. Msg: ${e}`);
        }
    }

    async mounted() {
        await this.createActivity();
    }

    /**
     * @description Redirects to the /validate page with the activity id, token,
     * and expiration timestamp.
     */
    redirectToValidatePageWithParams(): void {
        if (this.activityData === null) {
            throw new Error(
                "got null as response data from axios request to create an activity."
            );
        }
        this.$nuxt.$router.push({
            path: "/validate",
            query: {
                activity_id: this.activityData.activity_id.toString(),
                token: this.activityData.token,
                expires_at: this.activityData.expires_at,
            },
        });
    }
}
</script>

<style scoped></style>
