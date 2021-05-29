<template>
    <!-- fakes redirect because the main backend does not link to the validate page yet -->
    <div>
        <div class="hover:bg-green-300 bg-green-500" @click="createActivity">
            click me to create an activity
        </div>

        <div class="response">
            activity data we got:
            {{ activityData }}
        </div>
        <MagicTilesButton
            text="click here to play magic-tiles!"
            link-to="/explanation-coupons"
            button-type="nuxtlink"
            color="green"
        />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "nuxt-property-decorator";
import { AxiosResponse } from "axios";
import { CreatedActivity } from "~/types/api";

@Component({
    name: "FakeRedirect",
})
export default class FakeRedirect extends Vue {
    activityData: CreatedActivity | null = null;

    /**
     * @description Creates an activity. Will create a valid token, and the
     * corresponding activity id and the expiration timestamp. This will be sent
     * to our /validate page in the future. Currently we have to create this
     * ourselves because the main backend does not have this implemented yet.
     * TODO(pierre): delete onces main backend has this implemented.
     */
    async createActivity() {
        try {
            const response: AxiosResponse = await this.$axios.get(
                "/api/user100/activity/create/3"
            );
            // because the server response json is formatted weird we have to
            // call it like this :/
            this.activityData = response.data.data;
            this.redirectToValidatePageWithParams();
        } catch (e) {
            console.log(`We got an error. Msg: ${e}`);
        }
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
        this.$router.push({
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
