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
        "tags": ["Fraud Detection", "Recommendation Systems", "Spam Detection"]
      },
      {
        "name":"K-Means Clustering",
        "link":"kmeans",
        "image": "cluster.png",
        "popupimg": "clustering.png",
        "type": "Clustering",
        "description": "",
        "tags": ["Market Segmentation", "Social Network Analysis", "Content Aggregation"]
      },
      {
        "name":"Linear Regression",
        "link":"regression",
        "image": "regression.png",
        "popupimg": "regress.png",
        "type": "Regression",
        "description": "",
        "tags": ["Forecasting", "Analysing the impact of price changes", "Evaluating trends and sales estimates"]
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
