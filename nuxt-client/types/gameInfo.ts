/**
 * @file Interfaces which are used to describe the responses we get from the main server.
 */

/**
 * @description The Game data that we get from the main backend api after validating.
 */
export interface GameInfo {
    game_max_level: number;
    // game_data: MagicTilesData;
    // NOTE(pierre): somehow the api returns this as escaped json data as string..
    game_data: string;
    redirect_url: string;
    // NOTE(pierre): although it is named coupon types, it contains an array of coupons.
    coupon_types: Coupons;
}

/**
 * @description The Game data that we currently get for the magic tiles game...
 */
export interface MagicTilesData {
    gameload1: MagicTilesImages;
}

/**
 * @description The Images that we will display. Object1_img will be correctImage
 * until the api data changes again..
 */
export interface MagicTilesImages {
    object1_img: string;
    object2_img: string;
    object3_img: string;
}

// TODO(pierre): use this data again if it randomly changes to the correct data.
// /**
//  * @description The Game data that is specific to the magic tiles game.
//  */
// export interface MagicTilesData {
//     correctImage: string;
//     falseImages: string[];
// }

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
