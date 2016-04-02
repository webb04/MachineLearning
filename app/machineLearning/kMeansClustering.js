let means = [];
let assignments = [];
let data = [];
let input = {};
let output;
let targets = [];
let dataExtremes = [];
let dataRange = [];
let sums = [];
let counts = [];

let kMeansClustering = {
  setup: function(inputData, featureA, featureB, featureALabel, featureBLabel) {
    input = inputData;
    means = [];
    assignments = [];
    data = [];
    output = 0;
    targets = [];
    dataExtremes = [];
    dataRange = [];
    let sums = [];
    let counts = [];
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
}

function getDataRanges(extremes) {
  let ranges = extremes.map( range => range.max - range.min );
  return ranges;
}

function getDataExtremes(points) {
  let extremes = [];
  for (let i in data) {
    let point = data[i];
    for (let dimension in point) {
      switch(true) {
        case (!extremes[dimension]): extremes[dimension] = {min: 2000, max: 0};
        case (point[dimension] < extremes[dimension].min): extremes[dimension].min = point[dimension];
        case (point[dimension] > extremes[dimension].max): extremes[dimension].max = point[dimension];
        break;
      }
    }
  }
  return extremes;
}

function normalise(data) {
  for (let i in data) {
    let point = data[i];
    for (let dimension in point)  {
      data[i][dimension] = point[dimension] / dataExtremes[dimension].max;
    }
  }
  return data;
}

function initialise(k=3) {
  while (k--) {
    let mean = [];
    for (let dimension in dataExtremes) {
      mean[dimension] = dataExtremes[dimension].min + ( Math.random() * dataRange[dimension] );
    }
    means.push(mean);
  }
  return means;
};

function assignToClusters() {
  for (let i in data) {
    let point = data[i];
    let distances = [];
    for (let j in means) {
      let mean = means[j];
      let sum = 0;
      for (let dimension in point) {
        let difference = point[dimension] - mean[dimension];
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
  let moved = false;
  calculateSums();
  moved = (sums.toString() !== means.toString()) ? true : false;
  means = sums;
  return moved;
}

function calculateSums() {
  for (let j in means){
    counts[j] = 0;
    sums[j] = Array( means[j].length );
    for (let dimension in means[j]) {
      sums[j][dimension] = 0;
    }
  }
  for (let point_index in assignments) {
    let mean_index = assignments[point_index];
    let point = data[point_index];
    let mean = means[mean_index];
    counts[mean_index]++;
    for (let dimension in mean) {
      sums[mean_index][dimension] += point[dimension];
    }
  }
  for (let mean_index in sums) {
    if (0 === counts[mean_index]) {
      sums[mean_index] = means[mean_index];
      for (let dimension in dataExtremes) {
        sums[mean_index][dimension] = dataExtremes[dimension].min + ( Math.random() * dataRange[dimension] );
      }
      continue;
    }
    for (let dimension in sums[mean_index]) {
      sums[mean_index][dimension] /= counts[mean_index];
    }
  }
}

function preprocess(featureALabel, featureBLabel, input) {
  for (item in input) {
    let array = [];
    array.push(input[item][featureALabel]);
    array.push(input[item][featureBLabel]);
    data.push(array);
  }
}

function run() {
  let moved = updateMeans();
  if (moved){
    run();
  } else {
    let i = 0;
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
