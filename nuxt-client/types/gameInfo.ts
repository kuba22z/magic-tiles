/**
 * @file Interfaces which are used to describe the responses we get from the main server.
 */

/**
 * @description Contains all the infos we get by querying the main server.
 * Sadly data is malformed. Have to use .data.data :[
 */
export interface GameInfo {
    data: GameData;
}

/**
 * @description The Game data that we get from the main backend api after validating.
 */
export interface GameData {
    game_max_level: number;
    json_data: MagicTilesData;
    redirect_url: string;
    coupon_types: CouponTypes;
}

/**
 * @description The Game data that is specific to the magic tiles game.
 */
export interface MagicTilesData {
    correctImage: string;
    falseImages: string[];
}

/**
 * @description Description of the coupons.
 */
export interface CouponTypes extends Array<CouponType> {}

/**
 * @description Api response we get from the main backend to describe the
 * coupons for a specific level.
 */
export interface CouponType {
    level: number;
    coupons: Coupons;
}

/**
 * @description Contains an array of possible coupons.
 */
export interface Coupons extends Array<Coupon> {}

/**
 * @description Describes the structure of one coupon oject.
 */
export interface Coupon {
    description: string;
}

/**
 * @description The internal representation that we use for coupons.
 * NOTE(pierre): using this representation internally since the api
 * response is weirdly formatted.
 */
export interface InternalCoupons extends Array<InternalCoupon> {}

/**
 * @description The internal representation that we use for a coupon.
 * NOTE(pierre): using this representation internally since the api
 * response is weirdly formatted.
 */
export interface InternalCoupon {
    level: number;
    description: string;
}
