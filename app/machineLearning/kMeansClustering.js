var means = [];
var assignments = [];
var data = [];
var input = {};
var output;

var INPUT_CONST;
var FEATUREA;
var FEATUREB;
var FEATUREALABEL;
var FEATUREBLABEL;

var targets = [];

var kMeansClustering = {
  information: function() {
    return "KMeansCalled!";
  },
  setup: function(inputData, featureA, featureB, featureALabel, featureBLabel) {
    input = inputData;
    INPUT_CONST = inputData;

    for (item in input) {
      var array = [];
      array.push(input[item][featureALabel]);
      array.push(input[item][featureBLabel]);
      data.push(array);
    }

    dataExtremes = getDataExtremes(data);
    dataRange = getDataRanges(dataExtremes);
    means = initMeans(3);

    makeAssignments();
    run();
    // var targets = Array.prototype.slice.call(targets);
    return targets;
  }
}






// var data = [
//     [1, 2],
//     [2, 1],
//     [2, 4],
//     [1, 3],
//     [2, 2],
//     [3, 1],
//     [1, 1],
//
//     [7, 3],
//     [8, 2],
//     [6, 4],
//     [7, 4],
//     [8, 1],
//     [9, 2],
//
//     [10, 8],
//     [9, 10],
//     [7, 8],
//     [7, 9],
//     [8, 11],
//     [9, 9],
// ];


function getDataRanges(extremes) {
    var ranges = [];
    for (var dimension in extremes)
    {
        ranges[dimension] = extremes[dimension].max - extremes[dimension].min;
    }

    return ranges;

}

function getDataExtremes(points) {

    var extremes = [];

    for (var i in data)
    {
        var point = data[i];

        for (var dimension in point)
        {
            if ( ! extremes[dimension] )
            {
                extremes[dimension] = {min: 2000, max: 0};
            }

            if (point[dimension] < extremes[dimension].min)
            {
                extremes[dimension].min = point[dimension];
            }

            if (point[dimension] > extremes[dimension].max)
            {
                extremes[dimension].max = point[dimension];
            }
        }
    }

    return extremes;
}



function initMeans(k) {

    if ( ! k )
    {
        k = 3;
    }

    while (k--)
    {
        var mean = [];

        for (var dimension in dataExtremes)
        {
          // console.log("------------------");
          // console.log("dataExtremes[dimension].min: " + dataExtremes[dimension].min);
          // console.log("Math.random() * dataRange[dimension]: " + Math.random() * dataRange[dimension])
            mean[dimension] = dataExtremes[dimension].min + ( Math.random() * dataRange[dimension] );
        }
        means.push(mean);
    }

    // console.log(means);
    return means;

};


function makeAssignments() {
    for (var i in data)
    {
        var point = data[i];
        var distances = [];
        for (var j in means)
        {
            var mean = means[j];
            // console.log("means: " + mean)
            var sum = 0;

            for (var dimension in point)
            {
              // console.log(mean[dimension])
              // console.log("-------------")
                var difference = point[dimension] - mean[dimension];
                // console.log("difference: " + difference)
                difference *= difference;
                console.log(difference);
                sum += difference;
                // console.log("sum: " + sum);
            }

            distances[j] = Math.sqrt(sum);
        }

        assignments[i] = distances.indexOf( Math.min.apply(null, distances) );
        // console.log(assignments[i]);
    }

}




function moveMeans() {

    makeAssignments();

    var sums = Array( means.length );
    var counts = Array( means.length );
    var moved = false;

    for (var j in means)
    {
        counts[j] = 0;
        sums[j] = Array( means[j].length );
        for (var dimension in means[j])
        {
            sums[j][dimension] = 0;
        }
    }

    for (var point_index in assignments)
    {
        var mean_index = assignments[point_index];
        var point = data[point_index];
        var mean = means[mean_index];

        counts[mean_index]++;

        for (var dimension in mean)
        {
            sums[mean_index][dimension] += point[dimension];
        }
    }

    for (var mean_index in sums)
    {
        // console.log(counts[mean_index]);
        if ( 0 === counts[mean_index] )
        {
            sums[mean_index] = means[mean_index];
            // console.log("Mean with no points");
            // console.log(sums[mean_index]);

            for (var dimension in dataExtremes)
            {
                sums[mean_index][dimension] = dataExtremes[dimension].min + ( Math.random() * dataRange[dimension] );
            }
            continue;
        }

        for (var dimension in sums[mean_index])
        {
            sums[mean_index][dimension] /= counts[mean_index];
        }
    }

    if (means.toString() !== sums.toString())
    {
        moved = true;
    }

    means = sums;
    // console.log(means);
    return moved;

}


function run() {

    var moved = moveMeans();

    if (moved){
      run();
    } else {
      // console.log("COMPLETE");
      var i = 0;
      for (item in input) {
        // console.log(input[item])
        input[item]["target"] = assignments[i];
        targets.push(assignments[i]);
        // if (!input[item]["target"]) {
        //   input[item]["target"] = [];
        //   input[item]["target"].push(assignments[i]);
        // } else {
        //   input[item]["target"].push(assignments[i]);
        // }
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
