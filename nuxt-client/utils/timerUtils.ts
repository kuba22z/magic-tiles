/**
 * @file Utilites that are used for time based functions.
 */

import { CountingUnit } from "~/types/timer";

export class TimerUtils {
    /**
     * @description Counts from the starting value down to the ending value.
     * @param startValue: numeric value that will be counted from.
     * @param endValue: numeric value that will be counted to.
     * @param countingInterval: sleep duration/interval of for execution the
     * callback.
     * @param executionCallback: Callback that gets executed for every interval
     * until the startValue is <= the endValue
     */
    public static async countDown(
        startValue: number,
        endValue: number,
        countingUnit: CountingUnit,
        countingInterval: number,
        onTickCallback: () => any,
        endValueReachedCallback: () => any
    ): Promise<any> {
        const sleepDurationFactor: number =
            this.getSleepDurationFactor(countingUnit);
        const sleepDuration: number = sleepDurationFactor * countingInterval;

        while (startValue > endValue) {
            await new Promise((resolve) => setTimeout(resolve, sleepDuration));
            startValue = startValue - countingInterval;
            // MAYBE(pierre): can we call async callbacks with this?
            onTickCallback();
        }
        endValueReachedCallback();
    }

    /**
     * @description returns the seconds since unix timestamp for a given date
     * object.
     * @param date
     */
    public static getTimeInSeconds = (date: Date): number => {
        const dateInMillis: number = date.getTime();
        return Math.floor(dateInMillis / 1000);
    };

    /**
     * @description helper function the determine the factor we have to sleep
     * based on the given unit.
     * @param unit the unit we will count in (seconds, milliseconds...)
     */
    private static getSleepDurationFactor = (unit: CountingUnit): number => {
        switch (unit) {
            case CountingUnit.milliseconds:
                return 1;
            case CountingUnit.seconds:
                return 1000;
            case CountingUnit.minutes:
                return 60000;
            default:
                throw new Error(
                    `getSleepDuratioNFactor inside timerUtils.ts. Unit that you passed does not exist. Unit: ${unit}`
                );
        }
    };
}
