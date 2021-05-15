import { Coupons } from "~/types/coupons";
/**
 * @file Interfaces which are used to describe the responses we get from the main server.
 */

/**
 * @description Contains all the infos we get by querying the main server.
 * TODO(pierre): Ask Karbush and Rias how this data will look?
 */
export interface MainServerInfo {
    remainingTime: Date;
    availableCoupons: number;
    coupons: Coupons;
}
