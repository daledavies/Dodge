class Baddy {
    minWidth: number;
    maxWidth: number;
    sprite: game.LedSprite;
    sprites: game.LedSprite[] = [];
    pos: number = -1;
    levels: Level[];
    hero: game.LedSprite;

    constructor(posAvoid: number | null, levels: Level[], hero: game.LedSprite) {
        this.levels = levels;
        this.hero = hero;
        this.minWidth = this.levels[game.score()].minBaddyWidth;
        this.maxWidth = this.levels[game.score()].maxBaddyWidth;
        while (this.pos < 0) {
            let maxPos = 5 - this.maxWidth;
            let pos = randint(0, maxPos);
            if (posAvoid != pos) {
                this.pos = pos;
            }
        }
        let width = randint(this.minWidth, this.maxWidth);
        for (let i = 0; i < width; i++) {
            let sprite = game.createSprite(i + this.pos, 0)
            sprite.set(LedSpriteProperty.Brightness, 35)
            sprite.setDirection(180)
            this.sprites.push(sprite)
        }
    }

    move() {
        control.inBackground(() => {
            while (!this.isDeleted()) {
                let level = this.levels[game.score()];
                basic.pause(randint(level.maxBaddySpeed, level.minBaddySpeed))
                if (this.sprites[0].get(LedSpriteProperty.Y) == 4) {
                    this.remove();
                }

                this.sprites.forEach((e) => {
                    e.move(1);
                    if (e.isTouching(this.hero)) {
                        game.gameOver();
                    }
                });
            }
        })
    }

    isDeleted() {
        return this.sprites[0].isDeleted();
    }

    remove() {
        this.sprites.forEach((e) => {
            e.delete();
        })
    }
}
