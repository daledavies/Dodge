/**
 * Represents the core logic of the game.
 */
class Game {
    readonly levels: Level[];
    waveLength: number = 0;
    baddies: Baddy[] = [];
    hero: game.LedSprite = game.createSprite(randint(1, 3), 4);

    /**
     * Creates a new Game instance and initialises the level data.
     */
    constructor() {
        this.levels = [
            new Level(2, 2, 11, 7, 14, 15),
            new Level(1, 3, 8, 6, 13, 17),
            new Level(2, 3, 9, 4, 19, 20),
        ];
        this.setup();
        this.controls();
    }

    /**
     * Remove an existing Baddies and set starting game state.
     */
    setup(): void {
        this.baddies.forEach((e) => {
            e.remove();
        })
        this.baddies = [];
        this.waveLength = 0;
        this.hero.setDirection(90)
        game.setScore(0);
        game.setLife(3);
 
    }

    /**
     * Starts the main game loop that manages baddie spawning, level transitions, and win/lose conditions.
     */
    init(): void {
        control.inBackground(() => {
            while (true) {
                // Either we are at the end of the level, so we set everything up for the
                // next one, i.e. there should be no more baddies created.
                // Or we just keep on creating baddies in this wave until we reach waveLength.
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
                        // Are we at the final level already? If so stop looping
                        // so we can show the winner message.
                        if (game.score() == this.levels.length - 1) {
                            break;
                        }
                        // Show LEVEL message and increment score, not using
                        // game.levelUp() as the message scrolls too slowly.
                        basic.showString(`LEVEL ${game.score() + 2}`, 50);
                        game.addScore(1);
                        game.addLife(1);
                        this.hero = game.createSprite(randint(1, 3), 4);
                        this.hero.setDirection(90);
                        this.waveLength = 0;
                    }
                } else {
                    // Create another baddy, make it move and add it to the baddies[] array.
                    let posAvoid = null;
                    // If we have a previous baddy then find it's position so we can avoid
                    // creating a new one in the same space.
                    if (this.baddies.length) {
                        posAvoid = this.baddies[this.baddies.length - 1].pos;
                    }
                    let baddy = new Baddy(posAvoid, this.levels, this.hero);
                    this.baddies.push(baddy);
                    baddy.move();
                    this.waveLength++;
                    // Pause here and wait until it is time to see if we can create
                    // another baddy.
                    basic.pause(this.levels[game.score()].newBaddySpeed);
                }
            }
            // If we get here then our here has won the game!
            basic.showString("WINNER!!!!!", 50);
        });
        // Keep a loop going to watch for any baddies that come into
        // contact with our here.
        control.inBackground(() => {
            while (true) {
                this.baddies.forEach((baddy) => {
                    baddy.sprites.forEach((e) => {
                        if (e.isTouching(this.hero)) {
                            e.delete();
                            game.removeLife(1);
                        }
                    });
                })
                // Pause to give control back to other threads
                basic.pause(20);
            };
        });
    }

    /**
     * Defines the button controls for the game (move hero left/right and reset).
     */
    controls(): void {
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
