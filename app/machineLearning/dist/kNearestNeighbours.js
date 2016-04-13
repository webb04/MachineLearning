"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var kNearestNeighbours = {
  run: function run(data, featureA, featureB, numberOfNeighbours) {
    var neighbours = parseInt(numberOfNeighbours);
    var nodes = new NodeList(neighbours);
    for (var i in data) {
      var newNode = {};
      var array = [];
      for (var key in data[i]) {
        array.push(data[i][key]);
      }
      newNode.featureA = array[0];
      newNode.featureB = array[1];
      newNode.type = array[2];
      nodes.add(new Node(newNode));
    }
    featureA = parseInt(featureA);
    featureB = parseInt(featureB);
    nodes.add(new Node({ featureA: featureA, featureB: featureB, type: false }));

    nodes.getDataRanges();
    for (var _i in nodes.nodes) {
      if (!nodes.nodes[_i].type) {
        nodes.nodes[_i].neighbours = [];
        for (var j in nodes.nodes) {
          if (!nodes.nodes[j].type) {
            continue;
          }
          nodes.nodes[_i].neighbours.push(new Node(nodes.nodes[j]));
        }
        nodes.nodes[_i].getEuclideanDistance(nodes.featureA, nodes.featureB);
        nodes.nodes[_i].euclideanDistanceSort();
        var prediction = nodes.nodes[_i].predict(nodes.k);
      }
    }

    return prediction;
  }
};

var Node = function () {
  function Node(object) {
    _classCallCheck(this, Node);

    for (var key in object) {
      this[key] = object[key];
    }
  }

  _createClass(Node, [{
    key: "getEuclideanDistance",
    value: function getEuclideanDistance(featureA, featureB) {
      var featureARange = featureA.maximum - featureA.minimum;
      var featureBRange = featureB.maximum - featureB.minimum;
      for (var i in this.neighbours) {
        var neighbour = this.neighbours[i];
        var delta_featureA = neighbour.featureA - this.featureA;
        delta_featureA = delta_featureA / featureARange;
        var delta_featureB = neighbour.featureB - this.featureB;
        delta_featureB = delta_featureB / featureBRange;
        var a = delta_featureA * delta_featureA;
        var b = delta_featureB * delta_featureB;
        neighbour.distance = Math.sqrt(a + b);
      }
    }
  }, {
    key: "euclideanDistanceSort",
    value: function euclideanDistanceSort() {
      this.neighbours.sort(function (a, b) {
        return a.distance - b.distance;
      });
    }
  }, {
    key: "predict",
    value: function predict() {
      var k = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];

      var types = {};
      for (var i in this.neighbours.slice(0, k)) {
        var neighbour = this.neighbours[i];
        if (!types[neighbour.type]) {
          types[neighbour.type] = 0;
        }
        types[neighbour.type] += 1;
      }
      var guess = { type: false, count: 0 };
      for (var type in types) {
        if (types[type] > guess.count) {
          guess.type = type;
          guess.count = types[type];
        }
      }
      this.guess = guess;
      return types;
    }
  }]);

  return Node;
}();

var NodeList = function () {
  function NodeList(k) {
    _classCallCheck(this, NodeList);

    this.nodes = [];
    this.k = k;
  }

  _createClass(NodeList, [{
    key: "add",
    value: function add(node) {
      this.nodes.push(node);
    }
  }, {
    key: "getDataRanges",
    value: function getDataRanges() {
      this.featureA = { minimum: 1000000, maximum: 0 };
      this.featureB = { minimum: 1000000, maximum: 0 };
      for (var i in this.nodes) {
        this.featureA.minimum = this.nodes[i].featureA < this.featureA.minimum ? this.nodes[i].featureA : this.featureA.minimum;
        this.featureA.maximum = this.nodes[i].featureA > this.featureA.maximum ? this.nodes[i].featureA : this.featureA.maximum;
        this.featureB.minimum = this.nodes[i].featureB < this.featureB.minimum ? this.nodes[i].featureB : this.featureB.minimum;
        this.featureB.maximum = this.nodes[i].featureB > this.featureB.maximum ? this.nodes[i].featureB : this.featureB.maximum;
      }
    }
  }, {
    key: "getDataExtremes",
    value: function getDataExtremes(points) {
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
    }
  }]);

  return NodeList;
}();

module.exports = kNearestNeighbours;
module.exports.Node = Node;
module.exports.NodeList = NodeList;
// global.Node = Node;
// global.NodeList = NodeList;