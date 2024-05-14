/**
 * Represents a level within the game, defining difficulty parameters.
 */
class Level {
    minBaddyWidth: number;
    maxBaddyWidth: number;
    minBaddySpeed: number;
    maxBaddySpeed: number;
    newBaddySpeed: number;
    waveLength: number;

    /**
     * Creates a new Level instance with the specified difficulty parameters.
     *
     * @param minBaddyWidth The minimum width (in number of LED sprites) for baddies in this level.
     * @param maxBaddyWidth The maximum width (in number of LED sprites) for baddies in this level.
     * @param minBaddySpeed The minimum speed (in milliseconds) for baddies in this level.
     * @param maxBaddySpeed The maximum speed (in milliseconds) for baddies in this level.
     * @param newBaddySpeed The delay (in milliseconds) between spawning new baddies in this level.
     * @param waveLength The number of baddies that will be spawned in this level.
     */
    constructor(minBaddyWidth: number, maxBaddyWidth: number, minBaddySpeed: number, maxBaddySpeed: number, newBaddySpeed: number, waveLength: number) {
        this.minBaddyWidth = minBaddyWidth;
        this.maxBaddyWidth = maxBaddyWidth;
        this.minBaddySpeed = minBaddySpeed * 100;
        this.maxBaddySpeed = maxBaddySpeed * 100;
        this.newBaddySpeed = newBaddySpeed * 100;
        this.waveLength = waveLength;
    }
}
