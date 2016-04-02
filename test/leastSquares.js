var leastSquares = function(xSeries, ySeries) {
  var a = [];
  var b = [];
  var xtotal = 0;
  var ytotal = 0;
  var atotal = 0;
  var btotal = 0;

  for (var i in xSeries) {
    var sq = xSeries[i] * ySeries[i];
    var power = xSeries[i] * xSeries[i];
    a.push(sq);
    b.push(power);
    xtotal = xtotal + xSeries[i];
    ytotal = ytotal + ySeries[i];
  }

  for (var i in a) {
    atotal = atotal + a[i];
    btotal = btotal + b[i];
  }

  var xmean = xtotal / xSeries.length;
  var ymean = ytotal / ySeries.length;

  var amean = atotal / a.length;

  var bmean = btotal / b.length;

  var slope = ((amean - (xmean * ymean)) / (bmean - (xmean * xmean)));
  var intercept = (ymean - (slope * xmean));

  var rSquare = 0;
  return [slope, intercept, rSquare];
}

module.exports = leastSquares;
