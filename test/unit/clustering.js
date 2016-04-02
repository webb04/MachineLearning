var expect    = require("chai").expect;
var kMeansClustering = require("../../app/machineLearning/dist/kMeansClustering");

describe("Classification", function() {
  // normalise
  // extremes
  // ranges
  
  it("Calculates for perfect positive correlation", function() {
    var x = [1,2,3,4,5];
    var y = [1,2,3,4,5];
    var leastSquares = require("../leastSquares")(x, y);
    var slope = leastSquares[0];
    var Intercept = leastSquares[1];
    var rSquare = leastSquares[2];
    expect(slope).to.equal(1);
    expect(Intercept).to.equal(0);
    expect(rSquare).to.equal(0);
  });

});
