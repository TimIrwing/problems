#!/usr/bin/env checkio --domain=js run broken-clock

// https://js.checkio.org/mission/broken-clock/

// We have a broken clock. We know how quickly it runs or lags over a specific period of time.    At first, the clock is set to the correct time, but after a while it begins    to display an incorrect time... But instead of correcting the clock each time,     we will use an algorithm to calculate the correct time by accounting for     the difference compared to the actual current time. Of course we will have access to     the correct time for each day. In addition, you can be certain that     the correct starting time and current actual time fall on the same day.     For this mission, time is measured in a 24 hour format.
//
// You are given three values.    The first is the correct starting time.     The second is the current time displayed on the broken clock (which is incorrect).     Time is given as strings in the format "hh:mm:ss" (Examples: "01:16:59" and "23:00:13").    The third value is a description of the clock error in the format"+(-)N [second, minute, hour](s) at M [second, minute, hour](s)".     For Example "+1 second at 10 seconds" --     the clock is 1 second fast for every 10 seconds of actual time and     "-5 minutes at 5 hours" -- the clock lags 5 minutes for every 5 hours of actual time.
//
// You should calculate the real time with the given values.    The result should be rounded down to the nearest second (use floor or int).
//
// Let's examine one example -- '00:00:00', '00:00:30', '+2 seconds at 6 seconds'.
// 0th step: The real and fake time is "00:00:00".
// When the real time is "00:00:06", the fake time is "00:00:08".
// At real "00:00:18", fake is "00:00:24".
// At real "00:00:21", fake is "00:00:28".
// At real "00:00:22", fake is "00:00:29.333...".
// At real "00:00:22.5", fake is "00:00:30".
// So answer is "00:00:22.5" after rounding down "00:00:22"
//
// Input:Three arguments.    Correct starting time, current wrong time and broken clock descriptions as strings.
//
// Output:The real time as a string.
//
// Precondition:
// "wrong_time" is later than "starting_time".
//
//
// END_DESC

'use strict';

function brokenClock(startingTime, wrongTime, errorDescription) {
  const startSeconds = timeStrToSeconds(startingTime);
  const wrongSeconds = timeStrToSeconds(wrongTime);
  const { wrongCoef, actualCoef } = errDescToCoefs(errorDescription);

  const diff = wrongSeconds - startSeconds;
  const actualDiff = diff / wrongCoef * actualCoef;
  return secsToTimeStr(startSeconds + actualDiff);
}

function secsToTimeStr(seconds) {
  console.log(seconds);

  const s = Math.floor(seconds % 60);
  const m = Math.floor((seconds % 3600) / 60);
  const h = Math.floor(seconds / 3600);
  return `${toTwoDigits(h)}:${toTwoDigits(m)}:${toTwoDigits(s)}`;
}

function toTwoDigits(int) {
  if (int >= 10) {
    return String(int);
  }
  return `0${String(int)}`;
}

function errDescToCoefs(str) {
  const match = str.match(/([\+-]\d+) (\w+) at (\d+) (\w+)/);
  const lag = toSeconds(match[1], match[2]);
  const actual = toSeconds(match[3], match[4]);

  return {
    wrongCoef: actual + lag,
    actualCoef: actual,
  };
}

function toSeconds(int, str) {
  int = parseInt(int);
  const slice = str.slice(0, 3);

  if (slice === `min`) {
    return int * 60;
  } else if (slice === `hou`) {
    return int * 3600;
  }
  return int;
}

function timeStrToSeconds(str) {
  const match = str.match(/^(\d{2}):(\d{2}):(\d{2})$/);
  return (
    parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseInt(match[3])
  );
}

const assert = require(`assert`);

if (!global.is_checking) {
  assert.equal(
    brokenClock('00:00:00', '00:00:15', '+5 seconds at 10 seconds'),
    `00:00:10`,
    `First example`
  );
  assert.equal(
    brokenClock(`06:10:00`, `06:10:15`, `-5 seconds at 10 seconds`),
    `06:10:30`,
    `Second example`
  );
  assert.equal(
    brokenClock(`13:00:00`, `14:01:00`, `+1 second at 1 minute`),
    `14:00:00`,
    `Third example`
  );
  assert.equal(
    brokenClock(`01:05:05`, `04:05:05`, `-1 hour at 2 hours`),
    `07:05:05`,
    `Fourth example`
  );
  assert.equal(
    brokenClock(`00:00:00`, `00:00:30`, `+2 seconds at 6 seconds`),
    `00:00:22`,
    `Fifth example`
  );
  console.log(
    `Coding complete? Click 'Check' to review your tests and earn cool rewards!`
  );
}
