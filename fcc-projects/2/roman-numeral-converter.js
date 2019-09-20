function convertToRoman(num) {
  const str = String(num);
  const numerals = [
    [``, `I`, `II`, `III`, `IV`, `V`, `VI`, `VII`, `VIII`, `IX`],
    [``, `X`, `XX`, `XXX`, `XL`, `L`, `LX`, `LXX`, `LXXX`, `XC`],
    [``, `C`, `CC`, `CCC`, `CD`, `D`, `DC`, `DCC`, `DCCC`, `CM`],
    [``, `M`, `MM`, `MMM`],
  ];
  let result = ``;

  for (let i = str.length - 1; i >= 0; --i) {
    result = numerals[str.length - i - 1][str[i]] + result;
  }

  return result;
}

console.log(convertToRoman(29));
