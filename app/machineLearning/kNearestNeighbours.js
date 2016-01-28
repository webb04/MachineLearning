let kNearestNeighbours = {
  information: function() {
    return "kNearestNeighbours!";
  },
  run: function(data, featureA, featureB) {
    console.log(data);
    let nodes = new NodeList(3);
    for (let i in data) {
      nodes.add(new Node(data[i]));
    }
    // let featureA = Math.round(Math.random() * 10);
    // let featureB = Math.round(Math.random() * 2000);

    nodes.add(new Node({featureA: featureA, featureB: featureB, type: false}));

    console.log(nodes.determineUnkown());
    return nodes.determineUnkown();
    //nodes.draw("canvas");
  }
};

class Node {
  constructor(object) {
    for (let key in object) {
      this[key] = object[key];
    }
  }

  measureDistances(area_range_obj, rooms_range_obj) {
    let rooms_range = rooms_range_obj.max - rooms_range_obj.min;
    let area_range = area_range_obj.max - area_range_obj.min;

    for (let i in this.neighbours)
    {
        /* Just shortcut syntax */
        let neighbour = this.neighbours[i];

        let delta_rooms = neighbour.featureB - this.featureB;
        delta_rooms = (delta_rooms ) / rooms_range;

        let delta_area  = neighbour.featureA  - this.featureA;
        delta_area = (delta_area ) / area_range;

        neighbour.distance = Math.sqrt( delta_rooms*delta_rooms + delta_area*delta_area );
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
}

module.exports = kNearestNeighbours;
