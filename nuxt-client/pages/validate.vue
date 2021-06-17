<template>
    <div>
        <div class="p-4 flex h-screen justify-center items-center">
            <div class="flex justify-center-items-center">
                <div v-if="!validationFetched">
                    <div class="loadng-spinner">
                        <!-- TODO(pierre): add loading spinner component here. -->
                        Validating...
                    </div>
                </div>
                <div v-else-if="!validationSuccessful">
                    <div
                        class="
                            flex flex-col
                            justify-center
                            items-center
                            text-center
                        "
                    >
                        <div
                            class="
                                caption
                                text-lg
                                font-semibold
                                text-backtostreet-blue
                            "
                        >
                            Die Validierung war nicht erfolgreich.
                        </div>
                        <div
                            class="
                                redirection-counter
                                time
                                mt-4
                                px-3
                                py-3
                                border-solid border-black border-2
                                rounded-full
                                bg-white
                                justify-center
                            "
                            style="width: 55px"
                        >
                            <div
                                class="
                                    flex
                                    justify-center
                                    font-extrabold
                                    text-xl text-backtostreet-blue
                                "
                                style="font-family: Amatic SC, serif"
                            >
                                {{ countDownDuration }}
                            </div>
                        </div>
                        <div class="description text-backtostreet-blue">
                            <section class="text-center mt-8">
                                Du musst eingeloggt sein um einen Coupon
                                gewinnen zu können.
                            </section>
                            <section class="mt-4">
                                Wir leiten dich auf die Hauptseite zurück, dort
                                kannst du dich einloggen.
                            </section>
                        </div>
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
    layout: "default.vue",
})
export default class Validation extends Vue {
    queryParams: any;
    // whether the validation request was already sent and received.
    validationFetched: boolean = false;
    validationSuccessful: boolean = false;
    // time it will take the user to be redirected to either the landing or the
    // main page
    countDownDuration: number = 5;

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
        this.validationFetched = true;

        if (this.validationSuccessful) {
            this.redirectToGameStartPage();
            return;
        }

        await this.countToZero();
        this.redirectToMainPage();
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
