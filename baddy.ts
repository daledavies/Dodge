/**
 * Represents a baddie (enemy) character in the game.
 */
class Baddy {
    minWidth: number;
    maxWidth: number;
    sprite: game.LedSprite;
    sprites: game.LedSprite[] = [];
    pos: number = -1;
    levels: Level[];
    hero: game.LedSprite;

    /**
     * Creates a new Baddy instance.
     * @param posAvoid An optional position to avoid during placement.
     * @param levels An array of Level objects representing the game levels.
     * @param hero A reference to the hero's LedSprite object.
     */
    constructor(posAvoid: number | null, levels: Level[], hero: game.LedSprite) {
        this.levels = levels;
        this.hero = hero;
        this.minWidth = this.levels[game.score()].minBaddyWidth;
        this.maxWidth = this.levels[game.score()].maxBaddyWidth;
        // Find a starting position that is not the same as posAvoid.
        while (this.pos < 0) {
            let maxPos = 5 - this.maxWidth;
            let pos = randint(0, maxPos);
            if (posAvoid != pos) {
                this.pos = pos;
            }
        }
        // Make the baddy a random width between minWidth and maxWidth,
        // essentially use multiple sprites. We can move them all together
        // to appear as a single entity.
        let width = randint(this.minWidth, this.maxWidth);
        for (let i = 0; i < width; i++) {
            let sprite = game.createSprite(i + this.pos, 0)
            sprite.set(LedSpriteProperty.Brightness, 35)
            sprite.setDirection(180)
            this.sprites.push(sprite)
        }
    }

    /**
     * Starts the baddie's movement loop in the background.
     */
    move(): void {
        control.inBackground(() => {
            while (!this.isDeleted()) {
                let level = this.levels[game.score()];
                basic.pause(randint(level.maxBaddySpeed, level.minBaddySpeed))
                if (this.sprites[0].get(LedSpriteProperty.Y) == 4) {
                    this.remove();
                }
                this.sprites.forEach((e) => {
                    e.move(1);
                });
            }
        })
    }

    /**
     * Checks if all the baddie's sprites have been deleted.
     * @returns True if all sprites are deleted, false otherwise.
     */
    isDeleted(): boolean {
        return this.sprites[0].isDeleted();
    }

    /**
     * Removes all the baddie's sprites from the screen.
     */
    remove(): void {
        this.sprites.forEach((e) => {
            e.delete();
        })
    }
}
