/**
 * @file Contains types for all api responses we get when talking to the main backend.
 */

/**
 * @description This will in future only be issued by the main backend.
 * We have additional work because it is not implemented yet.
 * TODO(pierre): remove this interface once the main backend implements this.
 */
export interface CreatedActivity {
    activity_id: number;
    token: string;
    expires_at: string; // string is in datetime format
}

/**
 * @description The api response we get from the main backend after having
 * validated our request. Contains all the game info that we need.
 */
export interface GameData {}
