import { Coupons } from "~/types/coupons";
/**
 * @file Interfaces which are used to describe the responses we get from the main server.
 */

/**
 * TODO(pierre): Ask Karbush and Rias how this data will look?
 * @description Contains the specific data that is required for the magic
 * tiles game. We get one link to the correct image, that the user has to
 * click on and three links to bad images, that should not be clicked.
 */
export interface magicTilesInfo {
    correctImage: string;
    falseImages: string[];
}

/**
 * TODO(pierre): Ask Karbush and Rias how this data will look?
 * @description Contains all the infos we get by querying the main server.
 */
export interface MainServerInfo {
    remainingTime: Date;
    availableCoupons: number;
    coupons: Coupons;
    magicTiles: magicTilesInfo;
}
