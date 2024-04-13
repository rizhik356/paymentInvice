const fromOneToNineHundred = [
  ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
  ['', 'одна', 'две'],
  ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'],
  ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'],
  ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'],
];
const fromThousandToMany = [
  ['рубл', 'тысяч', 'миллион', 'миллиард', 'триллион', 'квадриллион', 'квинтиллион', 'секстиллион', 'септиллион', 'октиллион', 'нониллион', 'дециллион'],
  ['ь', 'я', 'ей'],
  ['а', 'и', ''],
  ['', 'а', 'ов'],
];

const coinsObj = {
  main: 'копе',
  suffix: ['йка', 'йки', 'ек'],
};

const makeEnding = (i, arrIndex) => {
  const index = i > 2 ? 3 : i + 1;
  return (fromThousandToMany[0][i] + fromThousandToMany[index][arrIndex]);
};

const addRubles = (arr, i) => {
  const one = [fromOneToNineHundred[1][1], fromOneToNineHundred[0][1]];
  const someRubles = [...fromOneToNineHundred[0].slice(1, 5), fromOneToNineHundred[1][2]];
  const lastCount = arr.at(-1);

  if (one.includes(lastCount)) {
    return [...arr, makeEnding(i, 0)];
  } if (someRubles.includes(lastCount)) {
    return [...arr, makeEnding(i, 1)];
  }
  return [...arr, makeEnding(i, 2)];
};

const addWord = (arr, i) => addRubles(arr, i).join(' ').replace(/\s+/g, ' ').trim();

const translateFromOneToTen = (item, i) => {
  if (i === 1) {
    return fromOneToNineHundred[i][item]
      ? fromOneToNineHundred[i][item]
      : fromOneToNineHundred[0][item];
  }
  return fromOneToNineHundred[0][item];
};

const makeNumToWords = (num, i) => {
  const normalize = num.split('').reduce((acc, item) => {
    const accSlice = acc.slice(1);
    accSlice.push(item);
    return accSlice;
  }, ['0', '0', '0']);

  const translateCountToWords = normalize.reduce((acc, item, index) => {
    if (index === 0) {
      acc.push(fromOneToNineHundred[4][item]);
    } else if (index === 1) {
      if (item !== '1') {
        acc.push(fromOneToNineHundred[3][item]);
      } else {
        acc.push(fromOneToNineHundred[2][normalize[index + 1]]);
      }
    } else {
      acc.push(normalize[index - 1] === '1' ? '' : translateFromOneToTen(item, i));
    }
    return acc;
  }, []);
  return (addWord(translateCountToWords, i));
};

const maketranslateCoin = (coins, index) => `${coins} ${coinsObj.main}${coinsObj.suffix[index]}`;

const translateCoins = (coins) => {
  const lastCoin = coins[coins.length - 1];
  if (lastCoin === '1') {
    return maketranslateCoin(coins, 0);
  } if (lastCoin > '1' && lastCoin < '5') {
    return maketranslateCoin(coins, 1);
  } return maketranslateCoin(coins, 2);
};

const capitalize = (str) => {
  const firstLetter = str[0].toUpperCase();
  return `${firstLetter}${str.slice(1)}`;
};

const sumToWords = (sum) => {
  const splitByComma = sum.split(',');
  const normalizeSplitByWhitespace = splitByComma[0].replaceAll('\u00A0', ' ');
  const splitToArr = normalizeSplitByWhitespace.split(' ').reverse();
  const beforeComa = splitByComma[0] === '0'
    ? 'ноль рублей'
    : splitToArr.map((item, index) => makeNumToWords(item, index)).reverse().join(' ');

  const afterComa = translateCoins(splitByComma[1]);
  return capitalize(`${beforeComa} ${afterComa}`);
};

export default sumToWords;
