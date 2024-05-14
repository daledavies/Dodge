class Level {
    minBaddyWidth: number;
    maxBaddyWidth: number;
    minBaddySpeed: number;
    maxBaddySpeed: number;
    newBaddySpeed: number;
    waveLength: number;

    constructor(minBaddyWidth: number, maxBaddyWidth: number, minBaddySpeed: number, maxBaddySpeed: number, newBaddySpeed: number, waveLength: number) {
        this.minBaddyWidth = minBaddyWidth;
        this.maxBaddyWidth = maxBaddyWidth;
        this.minBaddySpeed = minBaddySpeed * 100;
        this.maxBaddySpeed = maxBaddySpeed * 100;
        this.newBaddySpeed = newBaddySpeed * 100;
        this.waveLength = waveLength;
    }
}
