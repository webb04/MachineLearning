var expect    = require("chai").expect;
var kNearestNeighbours = require("../../app/machineLearning/dist/kNearestNeighbours.js");
var Node = kNearestNeighbours.Node;
var NodeList = kNearestNeighbours.NodeList;

var nodes = new NodeList(3);
var nodesArray =[{featureA: 148, featureB: 72, type: 'positive' }, { featureA: 85, featureB: 66, type: 'negative' },{ featureA: 138, featureB: 76, type: 'negative' },{ featureA: 102, featureB: 76, type: 'negative' },{ featureA: 88, featureB: 66, type: 'negative' },{ featureA: 133, featureB: 72, type: 'positive' },{ featureA: 95, featureB: 72, type: 'negative' },{ featureA: 81, featureB: 68, type: 'negative' },{ featureA: 134, featureB: 72, type: 'positive' },{ featureA: 171, featureB: 72, type: 'positive'}];
for (var node in nodesArray) { nodes.add(new Node(nodesArray[node])); }
nodes.add(new Node({featureA: 178, featureB: 69, type: false}));

for (let i in nodes.nodes) {
  if (!nodes.nodes[i].type) {
    nodes.nodes[i].neighbours = [];
    for (let j in nodes.nodes) {
      if (!nodes.nodes[j].type) {
        continue;
      }
      nodes.nodes[i].neighbours.push(new Node(nodes.nodes[j]));
    }
  }
}

var featureA = { minimum: 81, maximum: 178 };
var featureB = { minimum: 66, maximum: 76 };
nodes.nodes[nodes.nodes.length-1].getEuclideanDistance(featureA, featureB);

describe("Classification", function() {
  // Distance measures are very important for instance-based algorithms like K-Nearest Neighbours and K-Means Clustering
  // To make a classification, the new node needs to correctly determine how far away each of it's neighbours are
  // and then be able to deterin the k closest
  // It does this by first sorting all neighbours by distance
  it("Calculates distances", function() {
    expect(nodes.nodes[nodes.nodes.length-1].neighbours[0].distance).to.equal(0.4308748055962035);
    expect(nodes.nodes[nodes.nodes.length-1].neighbours[1].distance).to.equal(1.004602544650177);
    expect(nodes.nodes[nodes.nodes.length-1].neighbours[2].distance).to.equal(0.8124345833194515);
    expect(nodes.nodes[nodes.nodes.length-1].neighbours[3].distance).to.equal(1.0506570931308454);
    expect(nodes.nodes[nodes.nodes.length-1].neighbours[4].distance).to.equal(0.9751296749038537);
  });

  it("Sorts neighbours by distance", function() {
    nodes.nodes[nodes.nodes.length-1].euclideanDistanceSort();
    expect(nodes.nodes[nodes.nodes.length-1].neighbours[0].distance).to.equal(0.3085575793677931);
    expect(nodes.nodes[nodes.nodes.length-1].neighbours[1].distance).to.equal(0.4308748055962035);
    expect(nodes.nodes[nodes.nodes.length-1].neighbours[2].distance).to.equal(0.5438386177257695);
  });

  it("Calculates data ranges", function() {
    nodes.getDataRanges();
    expect(nodes.featureA.minimum).to.equal(81);
    expect(nodes.featureA.maximum).to.equal(178);
    expect(nodes.featureB.minimum).to.equal(66);
    expect(nodes.featureB.maximum).to.equal(76);
  });

});
