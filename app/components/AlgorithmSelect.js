/** @jsx React.DOM */

var React = require('react/addons');
var Card = React.createFactory(require('./Card'));

var AlgorithmSelect = React.createClass({
  render: function () {
    var algorithms = [
      {
        "name":"K-Nearest Neighbours",
        "link":"knn",
        "image":"knn.png",
        "popupimg": "classify.png",
        "type": "Classification",
        "description" : "",
        "tags": []
      },
      {
        "name":"K-Means Clustering",
        "link":"kmeans",
        "image": "cluster.png",
        "popupimg": "clustering.png",
        "type": "Clustering",
        "description": "",
        "tags": []
      },
      {
        "name":"Linear Regression",
        "link":"regression",
        "image": "regression.png",
        "popupimg": "regress.png",
        "type": "Regression",
        "description": "",
        "tags": []
      }];
    return (
        <div className="flex-container">
          {
            algorithms.map(function(algorithm) {
              return (<Card algorithm={algorithm} />)
            })
          }
        </div>
    )
  }
});

/* Module.exports instead of normal DOM mounting */
module.exports = AlgorithmSelect;
