"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var means = [];
var assignments = [];
var data = [];
var input = {};
var targets = [];
var dataExtremes = [];
var dataRange = [];
var sums = [];
var counts = [];
var clusters = null;

var kMeansClustering = {
  setup: function setup(inputData, featureA, featureB, featureALabel, featureBLabel, numberOfClusters) {
    input = {};
    input = inputData;
    means = [];
    assignments = [];
    data = [];
    targets = [];
    dataExtremes = [];
    dataRange = [];
    var sums = [];
    var counts = [];
    clusters = null;
    preprocess(featureALabel, featureBLabel, input);
    dataExtremes = getDataExtremes(data);
    data = normalise(data);
    dataExtremes = getDataExtremes(data);
    dataRange = getDataRanges(dataExtremes);

    console.log(typeof numberOfClusters === "undefined" ? "undefined" : _typeof(numberOfClusters));
    clusters = parseInt(numberOfClusters);
    console.log(typeof clusters === "undefined" ? "undefined" : _typeof(clusters));
    console.log(clusters);

    means = initialise(clusters);
    assignToClusters();
    run();
    return targets;
  }
};

var getDataRanges = function getDataRanges(extremes) {
  var ranges = extremes.map(function (range) {
    return range.maximum - range.minimum;
  });
  return ranges;
};

var getDataExtremes = function getDataExtremes(data) {
  var extremes = [];
  for (var i in data) {
    var point = data[i];
    for (var dimension in point) {
      extremes[dimension] = !extremes[dimension] ? { minimum: 1000000, maximum: 0 } : extremes[dimension];
      extremes[dimension].minimum = point[dimension] < extremes[dimension].minimum ? point[dimension] : extremes[dimension].minimum;
      extremes[dimension].maximum = point[dimension] > extremes[dimension].maximum ? point[dimension] : extremes[dimension].maximum;
    }
  }
  return extremes;
};

var normalise = function normalise(data) {
  for (var i in data) {
    var point = data[i];
    for (var dimension in point) {
      data[i][dimension] = point[dimension] / dataExtremes[dimension].maximum;
    }
  }
  return data;
};

var initialise = function initialise(clusterCentroids) {
  console.log(clusterCentroids);
  while (clusterCentroids > 0) {
    var mean = [];
    for (var dimension in dataExtremes) {
      mean[dimension] = dataExtremes[dimension].minimum + Math.random() * dataRange[dimension];
    }
    console.log(means);
    means.push(mean);
    clusterCentroids--;
  }
  return means;
};

var assignToClusters = function assignToClusters() {
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
};

var updateMeans = function updateMeans() {
  assignToClusters();
  var moved = false;
  calculateSums();
  if (means.toString() !== sums.toString()) {
    moved = true;
  }
  means = sums;
  return moved;
};

var calculateSums = function calculateSums() {
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
        sums[_mean_index][_dimension2] = dataExtremes[_dimension2].minimum + Math.random() * dataRange[_dimension2];
      }
      continue;
    }
    for (var _dimension3 in sums[_mean_index]) {
      sums[_mean_index][_dimension3] /= counts[_mean_index];
    }
  }
};

var preprocess = function preprocess(featureALabel, featureBLabel, input) {
  for (var _item in input) {
    var array = [];
    array.push(input[_item][featureALabel]);
    array.push(input[_item][featureBLabel]);
    data.push(array);
  }
};

var run = function run() {
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
    var _dataRange = [];
    dataExtremes = [];
    means = [];
    assignments = [];
    data = [];
    input = {};
    clusters = null;
    sums = [];
    counts = [];
  }
};

module.exports = kMeansClustering;
module.exports.getDataRanges = getDataRanges;
module.exports.getDataExtremes = getDataExtremes;
module.exports.normalise = normalise;
module.exports.initialise = initialise;
module.exports.assignToClusters = assignToClusters;
module.exports.updateMeans = updateMeans;
module.exports.calculateSums = calculateSums;
module.exports.preprocess = preprocess;
module.exports.run = run;
