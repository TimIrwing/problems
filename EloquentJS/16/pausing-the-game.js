// The old runLevel function. Modify this...
function runLevel(level, Display) {
  const display = new Display(document.body, level);
  let state = State.start(level);
  let ending = 1;
  const arrowKeys = trackKeys([`ArrowLeft`, `ArrowRight`, `ArrowUp`]);

  return new Promise((resolve) => {
    let paused = false;
    const timeFunc = (time) => {
      if (paused) {
        return false;
      }

      state = state.update(time, arrowKeys);
      display.syncState(state);
      if (state.status == `playing`) {
        return true;
      } else if (ending > 0) {
        ending -= time;
        return true;
      } else {
        arrowKeys.unregister();
        display.clear();
        resolve(state.status);
        window.removeEventListener(`keydown`, escFunc);
        return false;
      }
    };

    const escFunc = (event) => {
      if (event.key === `Escape`) {
        paused = paused ? false : true;
        event.preventDefault;
        console.log(`${paused ? `Paused` : `Unpaused`}`);
        if (!paused) {
          runAnimation(timeFunc);
        }
      }
    };

    window.addEventListener(`keydown`, escFunc);

    runAnimation(timeFunc);
  });
}

function trackKeys(keys) {
  const down = Object.create(null);
  function track(event) {
    if (keys.includes(event.key)) {
      down[event.key] = event.type == `keydown`;
      event.preventDefault();
    }
  }
  window.addEventListener(`keydown`, track);
  window.addEventListener(`keyup`, track);

  down.unregister = () => {
    window.removeEventListener(`keydown`, track);
    window.removeEventListener(`keyup`, track);
  };

  return down;
}

runGame(GAME_LEVELS, DOMDisplay);
