/** @jsx React.DOM */

var React = require('react/addons');
var Card = React.createFactory(require('./Card'));

var AlgorithmSelect = React.createClass({
  componentDidMount: function () {
    console.log("Mounted!");
  },
  render: function () {
    var algorithms = [
      {
        "name":"K-Nearest Neighbours",
        "link":"knn",
        "image":"knn.png",
        "description" : "",
        "tags": []
      },
      {
        "name":"K-Means Clustering",
        "link":"kmeans",
        "image": "cluster.png",
        "description": "",
        "tags": []
      },
      {
        "name":"Linear Regression",
        "link":"regression",
        "image": "regression.png",
        "description": "",
        "tags": []
      }];
    return (<div className="flex-container">
      {
        algorithms.map(function(algorithm) {
          return (<Card algorithm={algorithm} />)
        })
      }
    </div>)
  }
});

/* Module.exports instead of normal dom mounting */
module.exports = AlgorithmSelect;
