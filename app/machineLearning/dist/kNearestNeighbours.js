"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var kNearestNeighbours = {
  information: function information() {
    return "kNearestNeighbours!";
  },
  run: function run(data) {
    console.log(data);
    var nodes = new NodeList(3);
    for (var i in data) {
      nodes.add(new Node(data[i]));
    }
    var featureA = Math.round(Math.random() * 10);
    var featureB = Math.round(Math.random() * 2000);
    nodes.add(new Node({ featureA: featureA, featureB: featureB, type: false }));

    return nodes.determineUnkown();
    //nodes.draw("canvas");
  }
};

var Node = (function () {
  function Node(object) {
    _classCallCheck(this, Node);

    for (var key in object) {
      this[key] = object[key];
    }
  }

  _createClass(Node, [{
    key: "measureDistances",
    value: function measureDistances(area_range_obj, rooms_range_obj) {
      var rooms_range = rooms_range_obj.max - rooms_range_obj.min;
      var area_range = area_range_obj.max - area_range_obj.min;

      for (var i in this.neighbours) {
        /* Just shortcut syntax */
        var neighbour = this.neighbours[i];

        var delta_rooms = neighbour.featureB - this.featureB;
        delta_rooms = delta_rooms / rooms_range;

        var delta_area = neighbour.featureA - this.featureA;
        delta_area = delta_area / area_range;

        neighbour.distance = Math.sqrt(delta_rooms * delta_rooms + delta_area * delta_area);
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
})();

var NodeList = (function () {
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
        if (this.nodes[i].featureB < this.featureB.min) {
          this.featureB.min = this.nodes[i].featureB;
        }
        if (this.nodes[i].featureB > this.featureB.max) {
          this.featureB.max = this.nodes[i].featureB;
        }
        if (this.nodes[i].featureA < this.featureA.min) {
          this.featureA.min = this.nodes[i].featureA;
        }
        if (this.nodes[i].featureA > this.featureA.max) {
          this.featureA.max = this.nodes[i].featureA;
        }
      }
    }
  }]);

  return NodeList;
})();

module.exports = kNearestNeighbours;