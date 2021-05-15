/**
 * @file Describes the types for coupons we will receive from the main backend server.
 */

/**
 * TODO(pierre): Ask karbush and Rias how the coupons will look like?!
 * @description Describes the structure of one coupon.
 */
export interface Coupon {
    description: string;
    level: number;
}

/**
 * @description Contains an array of possible coupons.
 */
export interface Coupons extends Array<Coupon> {}
