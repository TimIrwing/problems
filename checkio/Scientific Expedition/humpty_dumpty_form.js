#!/usr/bin/env checkio --domain=js run humpty-dumpty-form
'use strict';

function spheroid(height, width) {
  const equatRadius = width / 2;
  const polarRadius = height / 2;
  const pi = Math.PI;

  const volume = pi / 6 * width ** 2 * height;
  let area;

  if (width > height) {
    const e = Math.sqrt(1 - polarRadius ** 2 / equatRadius ** 2);
    area =
      2 * pi * equatRadius ** 2 +
      pi * (polarRadius ** 2 / e) * Math.log((1 + e) / (1 - e));
  } else if (height > width) {
    const e = Math.sqrt(1 - equatRadius ** 2 / polarRadius ** 2);
    area =
      2 *
      pi *
      equatRadius ** 2 *
      (1 + polarRadius / (equatRadius * e) * Math.asin(e));
  } else {
    area = 4 * pi * equatRadius ** 2;
  }

  return [Number(volume.toFixed(2)), Number(area.toFixed(2))];
}

const assert = require(`assert`);

if (!global.is_checking) {
  // These "asserts" are used for self-checking and not for an auto-testing

  assert.deepEqual(spheroid(4, 2), [8.38, 21.48]);

  assert.deepEqual(spheroid(2, 2), [4.19, 12.57]);

  assert.deepEqual(spheroid(2, 4), [16.76, 34.69]);

  console.log(`Coding complete? Click 'Check' to earn cool rewards!`);
}
