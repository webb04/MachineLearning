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

let getDataRanges = (extremes) => {
  let ranges = extremes.map( range => range.maximum - range.minimum );
  return ranges;
}

let getDataExtremes = (data) => {
  let extremes = [];
  for (let i in data) {
    let point = data[i];
    for (let dimension in point) {
      extremes[dimension] = (!extremes[dimension]) ? {minimum: 1000000, maximum: 0} : extremes[dimension];
      extremes[dimension].minimum = (point[dimension] < extremes[dimension].minimum) ? point[dimension] : extremes[dimension].minimum;
      extremes[dimension].maximum = (point[dimension] > extremes[dimension].maximum) ? point[dimension] : extremes[dimension].maximum;
    }
  }
  return extremes;
}

let normalise = (data) => {
  for (let i in data) {
    let point = data[i];
    for (let dimension in point)  {
      data[i][dimension] = point[dimension] / dataExtremes[dimension].maximum;
    }
  }
  return data;
}

let initialise = (k=3) => {
  while (k > 0) {
    let mean = [];
    for (let dimension in dataExtremes) {
      mean[dimension] = dataExtremes[dimension].minimum + ( Math.random() * dataRange[dimension] );
    }
    means.push(mean);
    k--;
  }
  return means;
};

let assignToClusters = () => {
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

let updateMeans = () => {
  assignToClusters();
  let moved = false;
  calculateSums();
  if (means.toString() !== sums.toString()) { moved = true; }
  means = sums;
  return moved;
}

let calculateSums = () => {
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
        sums[mean_index][dimension] = dataExtremes[dimension].minimum + ( Math.random() * dataRange[dimension] );
      }
      continue;
    }
    for (let dimension in sums[mean_index]) {
      sums[mean_index][dimension] /= counts[mean_index];
    }
  }
}

let preprocess = (featureALabel, featureBLabel, input) => {
  for (let item in input) {
    let array = [];
    array.push(input[item][featureALabel]);
    array.push(input[item][featureBLabel]);
    data.push(array);
  }
}

let run = () => {
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
module.exports.getDataRanges = getDataRanges;
module.exports.getDataExtremes = getDataExtremes;
module.exports.normalise = normalise;
module.exports.initialise = initialise;
module.exports.assignToClusters = assignToClusters;
module.exports.updateMeans = updateMeans;
module.exports.calculateSums = calculateSums;
module.exports.preprocess = preprocess;
module.exports.run = run;
