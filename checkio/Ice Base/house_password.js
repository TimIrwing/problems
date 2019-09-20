#!/usr/bin/env checkio --domain=js run house-password
'use strict';

function housePassword(data) {
  return data.length > 9 && containsDiffSymbols(data);
}

function containsDiffSymbols(str) {
  return /\d/.test(str) && /[a-z]/.test(str) && /[A-Z]/.test(str);
}

const assert = require('assert');

if (!global.is_checking) {
  assert.equal(housePassword('A1213pokl'), false, '1st example');
  assert.equal(housePassword('bAse730onE4'), true, '2nd example');
  assert.equal(housePassword('asasasasasasasaas'), false, '3rd example');
  assert.equal(housePassword('QWERTYqwerty'), false, '4th example');
  assert.equal(housePassword('123456123456'), false, '5th example');
  assert.equal(housePassword('QwErTy911poqqqq'), true, '6th example');
  console.log(
    "Coding complete? Click 'Check' to review your tests and earn cool rewards!"
  );
}
