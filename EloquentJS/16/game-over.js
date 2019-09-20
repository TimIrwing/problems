// The old runGame function. Modify it...
async function runGame(plans, Display) {
  let lives = 3;
  let gameStatus = `won`;
  for (let level = 0; level < plans.length; ) {
    console.log(`You have ${lives} ${lives > 1 ? `lives` : `life`}`);
    const status = await runLevel(new Level(plans[level]), Display);

    if (status == `won`) {
      ++level;
      console.log(`You've completed the level`);
    } else if (status === `lost`) {
      --lives;
    }

    if (lives <= 0) {
      gameStatus = `lost`;
      break;
    }
  }
  console.log(`You've ${gameStatus}!`);
}
runGame(GAME_LEVELS, DOMDisplay);
