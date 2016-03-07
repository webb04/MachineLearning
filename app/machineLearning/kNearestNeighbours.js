let kNearestNeighbours = {
  information: function() {
    return "kNearestNeighbours!";
  },
  run: function(data, featureA, featureB) {
    let nodes = new NodeList(3);
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

    return nodes.determineUnkown();
  }
};

class Node {
  constructor(object) {
    for (let key in object) {
      this[key] = object[key];
    }
  }

  measureDistances(featureA, featureB) {
    let featureARange = featureA.max - featureA.min;
    let featureBRange = featureB.max - featureB.min;

    for (let i in this.neighbours)
    {
        let neighbour = this.neighbours[i];

        let delta_featureA = neighbour.featureA - this.featureA;
        delta_featureA = (delta_featureA) / featureARange;

        let delta_featureB  = neighbour.featureB  - this.featureB;
        delta_featureB = (delta_featureB) / featureBRange;

        neighbour.distance = Math.sqrt( delta_featureA*delta_featureA + delta_featureB*delta_featureB );
    }
  }

  sortByDistance() {
    this.neighbours.sort(function (a, b) {
        return a.distance - b.distance;
    });
  }

  guessType(k) {
    let types = {};

    for (let i in this.neighbours.slice(0, k))
    {
        let neighbour = this.neighbours[i];

        if ( ! types[neighbour.type] )
        {
            types[neighbour.type] = 0;
        }

        types[neighbour.type] += 1;
    }

    let guess = {type: false, count: 0};
    for (let type in types)
    {
        if (types[type] > guess.count)
        {
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

  determineUnkown() {
    this.calculateRanges();
    for (let i in this.nodes) {
      if (!this.nodes[i].type) {
        this.nodes[i].neighbours = [];
        for (let j in this.nodes) {
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

  calculateRanges() {
    this.featureA = {min: 1000000, max: 0};
    this.featureB = {min: 1000000, max: 0};
    for (let i in this.nodes) {
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
}

module.exports = kNearestNeighbours;
