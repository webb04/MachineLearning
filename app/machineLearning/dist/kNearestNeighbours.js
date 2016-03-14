"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var kNearestNeighbours = {
  information: function information() {
    return "kNearestNeighbours!";
  },
  run: function run(data, featureA, featureB) {
    // var extremes = [];

    // for (var i in data)
    // {
    //     var point = data[i];
    //
    //     for (var dimension in point)
    //     {
    //         if ( ! extremes[dimension] )
    //         {
    //             extremes[dimension] = {min: 2000, max: 0};
    //         }
    //
    //         if (point[dimension] < extremes[dimension].min)
    //         {
    //             extremes[dimension].min = point[dimension];
    //         }
    //
    //         if (point[dimension] > extremes[dimension].max)
    //         {
    //             extremes[dimension].max = point[dimension];
    //         }
    //     }
    // }
    //
    // for (var i in data)
    // {
    //     var point = data[i];
    //
    //     for (var dimension in point)  {
    //       data[i][dimension] = point[dimension] / extremes[dimension].max;
    //       console.log(data[i][dimension]);
    //       // console.log(point[dimension]);
    //     }
    // }

    var nodes = new NodeList(3);
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

    return nodes.determineUnkown();
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
    key: "measureDistances",
    value: function measureDistances(featureA, featureB) {
      var featureARange = featureA.max - featureA.min;
      var featureBRange = featureB.max - featureB.min;

      for (var i in this.neighbours) {
        var neighbour = this.neighbours[i];

        var delta_featureA = neighbour.featureA - this.featureA;
        delta_featureA = delta_featureA / featureARange;

        var delta_featureB = neighbour.featureB - this.featureB;
        delta_featureB = delta_featureB / featureBRange;

        neighbour.distance = Math.sqrt(delta_featureA * delta_featureA + delta_featureB * delta_featureB);
      }
    }
  }, {
    key: "sortByDistance",
    value: function sortByDistance() {
      this.neighbours.sort(function (a, b) {
        return a.distance - b.distance;
      });
    }
  }, {
    key: "guessType",
    value: function guessType(k) {
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
    key: "determineUnkown",
    value: function determineUnkown() {
      this.calculateRanges();
      for (var i in this.nodes) {
        if (!this.nodes[i].type) {
          this.nodes[i].neighbours = [];
          for (var j in this.nodes) {
            if (!this.nodes[j].type) {
              continue;
            }
            this.nodes[i].neighbours.push(new Node(this.nodes[j]));
          }

          this.nodes[i].measureDistances(this.featureA, this.featureB);

          this.nodes[i].sortByDistance();

          return this.nodes[i].guessType(this.k);
        }
      }
    }
  }, {
    key: "calculateRanges",
    value: function calculateRanges() {
      this.featureA = { min: 1000000, max: 0 };
      this.featureB = { min: 1000000, max: 0 };
      for (var i in this.nodes) {
        if (this.nodes[i].featureA < this.featureA.min) {
          this.featureA.min = this.nodes[i].featureA;
        }
        if (this.nodes[i].featureA > this.featureA.max) {
          this.featureA.max = this.nodes[i].featureA;
        }
        if (this.nodes[i].featureB < this.featureB.min) {
          this.featureB.min = this.nodes[i].featureB;
        }
        if (this.nodes[i].featureB > this.featureB.max) {
          this.featureB.max = this.nodes[i].featureB;
        }
      }
    }
  }, {
    key: "getDataExtremes",
    value: function getDataExtremes(points) {

      var extremes = [];

      for (var i in data) {
        var point = data[i];

        for (var dimension in point) {
          if (!extremes[dimension]) {
            extremes[dimension] = { min: 2000, max: 0 };
          }

          if (point[dimension] < extremes[dimension].min) {
            extremes[dimension].min = point[dimension];
          }

          if (point[dimension] > extremes[dimension].max) {
            extremes[dimension].max = point[dimension];
          }
        }
      }

      return extremes;
    }
  }]);

  return NodeList;
}();

module.exports = kNearestNeighbours;