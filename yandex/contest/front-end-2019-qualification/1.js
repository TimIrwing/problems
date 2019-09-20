module.exports = function(arr, width) {
  const segmentWidth = Math.floor(arr.length / width);
  const segments = [];

  for (let i = 0, j = 0; i < arr.length; ++i) {
    if (segments[j] === undefined) segments[j] = [];
    segments[j].push(arr[i]);
    if ((i + 1) % segmentWidth === 0) ++j;
  }

  return segments.map((entry) => getMedian(entry));

  function getMedian(arr) {
    const colors = [`g`, `y`, `r`];
    arr.sort((a, b) => {
      return (
        colors.indexOf(a[0].toLowerCase()) - colors.indexOf(b[0].toLowerCase())
      );
    });

    return arr[Math.floor((arr.length - 1) / 2)];
  }
};
