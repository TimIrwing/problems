// Complete the constructor, update, and collide methods
class Monster {
  constructor(pos, speed) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() {
    return `monster`;
  }

  static create(pos, ch) {
    return new Monster(pos.plus(new Vec(0, -1)), 2);
  }

  update(time, state) {
    const xSpeed = this.speed;
    let pos = this.pos;
    const movedX = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(movedX, this.size, `wall`)) {
      pos = movedX;
    } else {
      this.speed *= -1;
    }

    return new Monster(pos, this.speed);
  }

  collide(state) {
    const [player] = state.actors.filter(
      (element) => typeof element.speed === `object`
    );
    if (this.pos.y - player.pos.y >= 1) {
      const actors = state.actors.filter(
        (element) =>
          element.pos.x !== this.pos.x && element.pos.y !== this.pos.y
      );

      return new State(state.level, actors, 'playing');
    } else {
      return new State(state.level, state.actors, 'lost');
    }
  }
}

Monster.prototype.size = new Vec(1.2, 2);

levelChars[`M`] = Monster;

runLevel(
  new Level(`
..................................
.################################.
.#..............................#.
.#..............................#.
.#..............................#.
.#...........................o..#.
.#..@...........................#.
.##########..............########.
..........#..o..o..o..o..#........
..........#...........M..#........
..........################........
..................................
    `),
  DOMDisplay
);
