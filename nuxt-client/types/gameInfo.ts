/**
 * @file Interfaces which are used to describe the responses we get from the main server.
 */

/**
 * @description This will in future only be issued by the main backend.
 * We did need to implement this since the main backend did not get to do it yet.
 * TODO(pierre): remove this interface once the main backend implements this.
 */
export interface CreatedActivity {
    activity_id: number;
    token: string;
    expires_at: string; // string is in datetime format
}

/**
 * @description The Game data that we get from the main backend api after validating.
 */
export interface GameInfo {
    game_max_level: number;
    game_data: MagicTilesData;
    redirect_url: string;
    // NOTE(pierre): although it is named coupon types, it contains an array of coupons.
    coupon_types: Coupons;
    sponsor_name: string;
    sponsor_description: string;
}

/**
 * @description The Game data that is specific to the magic tiles game.
 */
export interface MagicTilesData {
    correctImage: string;
    falseImages: string[];
}

/**
 * @description Contains an array of coupons.
 */
export interface Coupons extends Array<Coupon> {}

/**
 * @description Describes the structure of a coupon.
 */
export interface Coupon {
    level: number;
    description: string;
    image_url: string;
}

/**
 * @description Contains the response we get after sending our highscore
 */
export interface resultingCoupon {
    coupon?: Coupon;
    message?: string;
}

/**
 * @description The data that we get via the query params on the validate page.
 */
export interface ValidationInfo {
    activityId: number;
    authToken: string;
    // string in datetime format
    tokenDuration: Date;
}
