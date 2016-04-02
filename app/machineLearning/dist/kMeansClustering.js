"use strict";

var means = [];
var assignments = [];
var data = [];
var input = {};
var output = void 0;
var targets = [];
var dataExtremes = [];
var dataRange = [];
var sums = [];
var counts = [];

var kMeansClustering = {
  setup: function setup(inputData, featureA, featureB, featureALabel, featureBLabel) {
    input = inputData;
    means = [];
    assignments = [];
    data = [];
    output = 0;
    targets = [];
    dataExtremes = [];
    dataRange = [];
    var sums = [];
    var counts = [];
    preprocess(featureALabel, featureBLabel, input);
    dataExtremes = getDataExtremes(data);
    data = normalise(data);
    dataExtremes = getDataExtremes(data);
    dataRange = getDataRanges(dataExtremes);
    means = initialise(3);
    assignToClusters();
    run();
    return targets;
  }
};

function getDataRanges(extremes) {
  var ranges = extremes.map(function (range) {
    return range.max - range.min;
  });
  return ranges;
}

function getDataExtremes(points) {
  var extremes = [];
  for (var i in data) {
    var point = data[i];
    for (var dimension in point) {
      switch (true) {
        case !extremes[dimension]:
          extremes[dimension] = { min: 2000, max: 0 };
        case point[dimension] < extremes[dimension].min:
          extremes[dimension].min = point[dimension];
        case point[dimension] > extremes[dimension].max:
          extremes[dimension].max = point[dimension];
          break;
      }
    }
  }
  return extremes;
}

function normalise(data) {
  for (var i in data) {
    var point = data[i];
    for (var dimension in point) {
      data[i][dimension] = point[dimension] / dataExtremes[dimension].max;
    }
  }
  return data;
}

function initialise() {
  var k = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

  while (k--) {
    var mean = [];
    for (var dimension in dataExtremes) {
      mean[dimension] = dataExtremes[dimension].min + Math.random() * dataRange[dimension];
    }
    means.push(mean);
  }
  return means;
};

function assignToClusters() {
  for (var i in data) {
    var point = data[i];
    var distances = [];
    for (var j in means) {
      var mean = means[j];
      var sum = 0;
      for (var dimension in point) {
        var difference = point[dimension] - mean[dimension];
        difference *= difference;
        sum += difference;
      }
      distances[j] = Math.sqrt(sum);
    }
    assignments[i] = distances.indexOf(Math.min.apply(null, distances));
  }
}

function updateMeans() {
  assignToClusters();
  sums = Array(means.length);
  counts = Array(means.length);
  // let moved = false;
  calculateSums();
  var moved = sums.toString() !== means.toString() ? true : false;
  // if () {
  //   moved = true;
  // }
  means = sums;
  return moved;
}

function calculateSums() {
  for (var j in means) {
    counts[j] = 0;
    sums[j] = Array(means[j].length);
    for (var dimension in means[j]) {
      sums[j][dimension] = 0;
    }
  }
  for (var point_index in assignments) {
    var mean_index = assignments[point_index];
    var point = data[point_index];
    var mean = means[mean_index];
    counts[mean_index]++;
    for (var _dimension in mean) {
      sums[mean_index][_dimension] += point[_dimension];
    }
  }
  for (var _mean_index in sums) {
    if (0 === counts[_mean_index]) {
      sums[_mean_index] = means[_mean_index];
      for (var _dimension2 in dataExtremes) {
        sums[_mean_index][_dimension2] = dataExtremes[_dimension2].min + Math.random() * dataRange[_dimension2];
      }
      continue;
    }
    for (var _dimension3 in sums[_mean_index]) {
      sums[_mean_index][_dimension3] /= counts[_mean_index];
    }
  }
}

function preprocess(featureALabel, featureBLabel, input) {
  for (item in input) {
    var array = [];
    array.push(input[item][featureALabel]);
    array.push(input[item][featureBLabel]);
    data.push(array);
  }
}

function run() {
  var moved = updateMeans();
  if (moved) {
    run();
  } else {
    var i = 0;
    for (item in input) {
      input[item]["target"] = assignments[i];
      targets.push(assignments[i]);
      i++;
    }
    output = input;
    means = [];
    assignments = [];
    data = [];
    input = {};
  }
}

module.exports = kMeansClustering;