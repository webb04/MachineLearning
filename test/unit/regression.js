var expect = require("chai").expect;

describe("Regression", function() {
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

  it("Calculates for perfect negative correlation", function() {
    var x = [-1,-2,-3,-4,-5];
    var y = [1,2,3,4,5];
    var leastSquares = require("../leastSquares")(x, y);
    var slope = leastSquares[0];
    var Intercept = leastSquares[1];
    var rSquare = leastSquares[2];
    expect(slope).to.equal(-1);
    expect(Intercept).to.equal(0);
    expect(rSquare).to.equal(0);
  });

  it("Calculates for positive correlation", function() {
    var x = [1,2,3,4,5];
    var y = [3,7,9,6,54];
    var leastSquares = require("../leastSquares")(x, y);
    var slope = leastSquares[0];
    var Intercept = leastSquares[1];
    expect(slope).to.be.within(10.0999, 10.1);
    expect(Intercept).to.be.closeTo(-14.4999, 0.005);
  });

  it("Calculates for negative correlation", function() {
    var x = [-10,-23,-26,-34,-55];
    var y = [13,17,19,26,44];
    var leastSquares = require("../leastSquares")(x, y);
    var slope = leastSquares[0];
    var Intercept = leastSquares[1];
    expect(slope).to.be.closeTo(-0.7207, 0.005);
    expect(Intercept).to.be.closeTo(2.465, 0.005);
  });
});
