export class GameLogic {
    /**
     * @description determines reached Level
     */
    public static computeReachedLevel(score: number): number {
        const reachedLevel = Math.floor(score / 10);
        if (reachedLevel > 4) return 5;
        else return reachedLevel;
    }
}
