let kNearestNeighbours = {
  run: function(data, featureA, featureB, numberOfNeighbours) {
    let neighbours = parseInt(numberOfNeighbours);
    let nodes = new NodeList(neighbours);
    for (let i in data) {
      let newNode = {};
      let array = [];
      for (let key in data[i]) {
        array.push(data[i][key]);
      }
      newNode.featureA = array[0];
      newNode.featureB = array[1];
      newNode.type = array[2];
      nodes.add(new Node(newNode));
    }
    featureA = parseInt(featureA);
    featureB = parseInt(featureB);
    nodes.add(new Node({featureA: featureA, featureB: featureB, type: false}));

    nodes.getDataRanges();
    for (let i in nodes.nodes) {
      if (!nodes.nodes[i].type) {
        nodes.nodes[i].neighbours = [];
        for (let j in nodes.nodes) {
          if (!nodes.nodes[j].type) {
            continue;
          }
          nodes.nodes[i].neighbours.push(new Node(nodes.nodes[j]));
        }
        nodes.nodes[i].getEuclideanDistance(nodes.featureA, nodes.featureB);
        nodes.nodes[i].euclideanDistanceSort();
        var prediction = nodes.nodes[i].predict(nodes.k);
      }
    }
    return prediction;
  }
};

class Node {
  constructor(object) {
    for (let key in object) {
      this[key] = object[key];
    }
  }

  getEuclideanDistance(featureA, featureB) {
    let featureARange = featureA.maximum - featureA.minimum;
    let featureBRange = featureB.maximum - featureB.minimum;
    for (let i in this.neighbours) {
      let neighbour = this.neighbours[i];
      let delta_featureA = neighbour.featureA - this.featureA;
      delta_featureA = (delta_featureA) / featureARange;
      let delta_featureB  = neighbour.featureB  - this.featureB;
      delta_featureB = (delta_featureB) / featureBRange;
      let a = delta_featureA*delta_featureA;
      let b = delta_featureB*delta_featureB;
      neighbour.distance = Math.sqrt(a + b);
    }
  }

  euclideanDistanceSort() {
    this.neighbours.sort((a, b) => a.distance - b.distance);
  }

  predict(k=3) {
    let types = {};
    for (let i in this.neighbours.slice(0, k)) {
      let neighbour = this.neighbours[i];
      if (!types[neighbour.type]) {
        types[neighbour.type] = 0;
      }
      types[neighbour.type] += 1;
    }
    let guess = {type: false, count: 0};
    for (let type in types){
      if (types[type] > guess.count) {
        guess.type = type;
        guess.count = types[type];
      }
    }
    this.guess = guess;
    return types;
  }
}

class NodeList {
  constructor(k) {
    this.nodes = [];
    this.k = k;
  }

  add(node) {
    this.nodes.push(node);
  }

  getDataRanges() {
    this.featureA = {minimum: 1000000, maximum: 0};
    this.featureB = {minimum: 1000000, maximum: 0};
    for (let i in this.nodes) {
      this.featureA.minimum = this.nodes[i].featureA < this.featureA.minimum ? this.nodes[i].featureA : this.featureA.minimum
      this.featureA.maximum = this.nodes[i].featureA > this.featureA.maximum ? this.nodes[i].featureA : this.featureA.maximum
      this.featureB.minimum = this.nodes[i].featureB < this.featureB.minimum ? this.nodes[i].featureB : this.featureB.minimum
      this.featureB.maximum = this.nodes[i].featureB > this.featureB.maximum ? this.nodes[i].featureB : this.featureB.maximum
    }
  }

  getDataExtremes(points) {
    let extremes = [];
    for (let i in data){
      let point = data[i];
      for (let dimension in point) {
        extremes[dimension] = !extremes[dimension] ? {minimum: 1000000, maximum: 0} : extremes[dimension];
        extremes[dimension].minimum = point[dimension] < extremes[dimension].minimum ? point[dimension] : extremes[dimension].minimum;
        extremes[dimension].maximum = point[dimension] > extremes[dimension].maximum ? point[dimension] : extremes[dimension].maximum;
      }
    }
    return extremes;
  }
}

module.exports = kNearestNeighbours;
module.exports.Node = Node;
module.exports.NodeList = NodeList;
