class Game {
    readonly levels: Level[];
    waveLength: number = 0;
    baddies: Baddy[] = [];
    hero: game.LedSprite = game.createSprite(randint(1, 3), 4);

    constructor() {
        this.levels = [
            new Level(2, 2, 11, 7, 14, 15),
            new Level(1, 3, 8, 6, 13, 17),
            new Level(2, 3, 9, 4, 19, 20),
        ];
        this.setup();
        this.controls();
    }

    setup() {
        this.baddies.forEach((e) => {
            e.remove();
        })
        this.baddies = [];
        this.waveLength = 0;
        this.hero.setDirection(90)
        game.setScore(0);
    }

    init() {
        control.inBackground(() => {
            while (true) {
                if (this.waveLength == this.levels[game.score()].waveLength) {
                    // No more baddies are being created so let's wait for all
                    // the existing one's to get deleted before ending the level. 
                    for (let i = 0; i < this.baddies.length; i++) {
                        if (this.baddies[i].isDeleted()) {
                            this.baddies.splice(i, 1);
                        }
                        // Pause to give control back to other threads
                        basic.pause(20);
                    }
                    if (!this.baddies.length) {
                        basic.pause(350);
                        this.hero.delete();
                        if (game.score() == this.levels.length - 1) {
                            break;
                        }
                        basic.showString(`LEVEL ${game.score() + 2}`, 100);
                        game.addScore(1);
                        this.hero = game.createSprite(randint(1, 3), 4);
                        this.hero.setDirection(90);
                        this.waveLength = 0;
                    }
                } else {
                    let posAvoid = null;
                    if (this.baddies.length) {
                        posAvoid = this.baddies[this.baddies.length - 1].pos;
                    }
                    let baddy = new Baddy(posAvoid, this.levels, this.hero);
                    this.baddies.push(baddy);
                    baddy.move();
                    this.waveLength++;
                    basic.pause(this.levels[game.score()].newBaddySpeed);
                }
            }
            basic.showString("WINNER", 100);
        })
    }

    controls() {
        input.onButtonPressed(Button.A, function () {
            this.hero.move(-1);
        })
        input.onButtonPressed(Button.B, function () {
            this.hero.move(1);
        })
        input.onButtonPressed(Button.AB, () => {
            this.setup();
        });
    }
}