var expect    = require("chai").expect;
var kMeansClustering = require("../../app/machineLearning/dist/kMeansClustering.js");
var data = [[104,744],[13,237],[18,762],[4,237],[3,292]];
var dataUnchanged = [[104,744],[13,237],[18,762],[4,237],[3,292]];
var dataExtremes =[ { minimum: 3, maximum: 104 }, { minimum: 237, maximum: 762 } ];
var extremes = kMeansClustering.getDataExtremes(dataUnchanged);
var ranges = kMeansClustering.getDataRanges(dataExtremes);

let normalise = (data) => {
  for (let i in data) {
    let point = data[i];
    for (let dimension in point)  {
      data[i][dimension] = point[dimension] / dataExtremes[dimension].maximum;
    }
  }
  return data;
}

var normalisedData = normalise(data);
describe("Clustering", function() {

  it("Normalises minimum dimensions", function() {
    expect(normalisedData[0][0]).to.equal(1);
    expect(normalisedData[1][0]).to.equal(0.125);
    expect(normalisedData[2][0]).to.equal(0.17307692307692307);
    expect(normalisedData[3][0]).to.equal(0.038461538461538464);
    expect(normalisedData[4][0]).to.equal(0.028846153846153848);
  });

  it("Normalises maximum dimensions", function() {
    expect(normalisedData[0][1]).to.equal(0.9763779527559056);
    expect(normalisedData[1][1]).to.equal(0.3110236220472441);
    expect(normalisedData[2][1]).to.equal(1);
    expect(normalisedData[3][1]).to.equal(0.3110236220472441);
    expect(normalisedData[4][1]).to.equal(0.38320209973753283);
  });

  it("Calculates minimum extremes", function() {
    expect(extremes[0].minimum).to.equal(3);
    expect(extremes[1].minimum).to.equal(237);
  });

  it("Calculates maximum extremes", function() {
    expect(extremes[0].maximum).to.equal(104);
    expect(extremes[1].maximum).to.equal(762);
  });

  it("Calculates data ranges", function() {
    expect(ranges[0]).to.equal(101);
    expect(ranges[1]).to.equal(525);
  });

});
