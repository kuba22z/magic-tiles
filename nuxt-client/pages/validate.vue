<template>
    <div>
        <div>
            <div v-if="validationSuccessful">
                <div
                    class="
                        validation-successfull
                        text-green-400
                        flex flex-col
                        justify-center
                        items-center
                    "
                >
                    <div>validation successful!</div>
                    <div>
                        Redirecting to the starting page of the magic-tiles game
                        in {{ countDownDuration }}
                    </div>
                </div>
            </div>
            <div v-else>
                <div
                    class="
                        validation-error
                        text-red-400
                        flex flex-col
                        justify-center
                        items-center
                    "
                >
                    <div>
                        Validation was not successful! Did you log into the
                        backtostreet main page?
                    </div>
                    <div>
                        Redirecting to the main backtostreet page in
                        {{ countDownDuration }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Context } from "@nuxt/types";
import { Component, Vue } from "nuxt-property-decorator";
import { AxiosResponse } from "axios";
import { gameInfoStore } from "~/store";

@Component({
    name: "Validation",
})
export default class Validation extends Vue {
    queryParams: any;
    validationSuccessful: boolean = false;
    // time it will take the user to be redirected to either the landing or the
    // main page
    countDownDuration: number = 3;

    /**
     * @description gets route params on initial page load.
     */
    asyncData({ route }: Context) {
        return {
            queryParams: route.query,
        };
    }

    async mounted() {
        try {
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
            // TODO(pierre): make this an action instead and emove the set
            // bearer token method. and set activity id method
            gameInfoStore.setActivityId(this.queryParams.activity_id);
            gameInfoStore.setAuthToken(this.queryParams.token);
            gameInfoStore.initializeGameInfo(response.data);
            // NOTE(pierre): have to set token duration on seperate call since
            // it is not sent by the api response after validating.
            const validUntil: Date = new Date(this.queryParams.expires_at);
            gameInfoStore.setTokenDuration(validUntil);
            this.validationSuccessful = true;
        } catch (e) {
            console.log("Error when calling fetch() on validate.vue.");
            console.log(e);
            this.validationSuccessful = false;
        }
        await this.countToZero();
        this.validationSuccessful
            ? this.redirectToGameStartPage()
            : this.redirectToMainPage();
    }

    /**
     * @description Redirects the user to the first page of our game. User will only
     * be redirected if he did validate with his token before.
     */
    redirectToGameStartPage() {
        this.$router.push({
            path: "/",
        });
    }

    /**
     * @description Redirects the user to the main page after the validation
     * failed.
     */
    redirectToMainPage() {
        window.location.href = "https://back2street.de";
    }

    /**
     * @description Counts from the starting value down to zero.
     * Counting unit is in seconds.
     */
    async countToZero(): Promise<any> {
        while (this.countDownDuration > 0) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            this.countDownDuration--;
        }
    }
}
</script>

<style scoped></style>
