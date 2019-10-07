function generateTestArray(argStart, argEnd, argStep) {
  const start = argStart || Math.floor(Math.random() * -25000000);
  const end = argEnd || Math.floor(Math.random() * 25000000);
  const result = [];

  for (
    let i = start;
    i <= end;
    i += argStep || Math.floor(Math.random() * 10)
  ) {
    result.push(i);
  }

  return result;
}

function compareFunc(testCase, ...functions) {
  const timings = [];

  for (const testFunc of functions) {
    const startTime = Date.now();

    testFunc(testCase);

    const endTime = Date.now();

    timings.push([`${testFunc.name}:\n${endTime - startTime}ms`]);
  }

  console.log(`\n========= RESULTS =========`);
  for (const entry of timings) {
    console.log(entry[0]);
    console.log(``);
  }
}

compareFunc(
  generateTestArray(),
  srtdSqrsFinal,
  srtdSqrsMorning,
  srtdSqrsYesterday
);

function srtdSqrsFinal(input) {
  return sortedSquares(input);

  function sortedSquares(arr) {
    const middle = binSearchMiddlePoint(arr);
    const [lesserZero, greaterEqualsZero] = fromMiddlePoint(arr, middle);
    // const lesserZero = middle > 0 ? arr.slice(0, middle) : [];
    // const greaterEqualsZero = arr.slice(middle, arr.length);

    return merge(
      // lesserZero.reverse().map((entry) => Math.pow(entry, 2)),
      lesserZero.map((entry) => Math.pow(entry, 2)),
      greaterEqualsZero.map((entry) => Math.pow(entry, 2))
    );
  }

  function binSearchMiddlePoint(arr) {
    if (arr[0] >= 0) return 0;

    let min = 0;
    let max = arr.length - 1;

    while (min <= max) {
      const center = Math.floor((min + max) / 2);

      if (arr[center] >= 0 && arr[center - 1] < 0) {
        return center;
      } else if (arr[center] <= arr[center + 1] && arr[center] >= 0) {
        max = center - 1;
      } else {
        min = center + 1;
      }
    }

    return Math.floor((min + max) / 2);
  }

  function fromMiddlePoint(arr, mPoint) {
    const leftSide = [];
    const rightSide = [];

    for (i = mPoint; i < arr.length; ++i) {
      rightSide.push(arr[i]);
    }
    for (i = mPoint - 1; i >= 0; --i) {
      leftSide.push(arr[i]);
    }

    return [leftSide, rightSide];
  }

  function merge(arr1, arr2) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] <= arr2[j]) {
        result.push(arr1[i]);
        ++i;
      } else {
        result.push(arr2[j]);
        ++j;
      }
    }

    while (i < arr1.length) {
      result.push(arr1[i]);
      ++i;
    }

    while (j < arr2.length) {
      result.push(arr2[j]);
      ++j;
    }

    return result;
  }
}

function srtdSqrsMorning(input) {
  return sortedSquares(input);

  function sortedSquares(arr) {
    const middle = binSearchMiddlePoint(arr);
    const [lesserZero, greaterEqualsZero] = fromMiddlePoint(arr, middle);

    return merge(
      lesserZero.map((entry) => Math.pow(entry, 2)),
      greaterEqualsZero.map((entry) => Math.pow(entry, 2))
    );
  }

  function binSearchMiddlePoint(arr) {
    let min = 0;
    let max = arr.length - 1;

    if (arr[0] >= 0) return 0;

    while (min <= max) {
      const center = Math.floor((min + max) / 2);

      if (arr[center] >= 0 && arr[center - 1] < 0) {
        return center;
      } else if (arr[center] <= arr[center + 1] && arr[center] >= 0) {
        max = center - 1;
      } else if (arr[center] >= arr[center - 1] || arr[center] <= 0) {
        min = center + 1;
      } else {
        return center;
      }
    }

    return Math.floor((min + max) / 2);
  }

  function fromMiddlePoint(arr, mPoint) {
    const leftSide = [];
    const rightSide = [];

    for (i = mPoint; i < arr.length; ++i) {
      rightSide.push(arr[i]);
    }
    for (i = mPoint - 1; i >= 0; --i) {
      leftSide.push(arr[i]);
    }

    return [leftSide, rightSide];
  }

  function merge(arr1, arr2) {
    const result = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length || j < arr2.length) {
      while (i < arr1.length) {
        if (arr1[i] <= arr2[j] || j >= arr2.length) {
          result.push(arr1[i]);
          ++i;
        } else {
          break;
        }
      }
      while (j < arr2.length) {
        if (arr1[i] >= arr2[j] || i >= arr1.length) {
          result.push(arr2[j]);
          ++j;
        } else {
          break;
        }
      }
    }

    return result;
  }
}

function srtdSqrsYesterday(input) {
  return sortedSquares(input);

  function sortedSquares(arr) {
    const middle = binSearchMiddle(arr);
    const negatives = middle > 0 ? arr.slice(0, middle) : [];
    const positives = arr.slice(middle, arr.length);

    if (arr.length === 1) return [Math.pow(arr[0], 2)];

    return merge(negatives, positives);

    function binSearchMiddle(arr) {
      let min = 0;
      let max = arr.length - 1;

      while (min <= max) {
        const center = Math.floor((min + max) / 2);

        if (arr[center] >= 0 && arr[center - 1] < 0) {
          return center;
        } else if (arr[center] <= arr[center + 1] && arr[center] >= 0) {
          max = center - 1;
        } else {
          min = center + 1;
        }
      }
    }
  }

  function merge(negatives, positives) {
    const result = [];

    for (
      let i = 0, j = negatives.length - 1;
      i < positives.length || j >= 0;

    ) {
      const negative = negatives[j];
      const positive = positives[i];
      if (negative === undefined || positive < Math.abs(negative)) {
        result.push(Math.pow(positive, 2));
        ++i;
      } else {
        result.push(Math.pow(negative, 2));
        --j;
      }
    }

    return result;
  }
}
