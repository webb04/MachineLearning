/** @jsx React.DOM */

var React = require('react/addons');

var Card = React.createClass({

      componentDidMount: function () {
        console.log("Mounted!");
      },
      render: function () {
        return (
          <div className="card medium">
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator" src={'/images/' + this.props.algorithm.image}/>
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">{this.props.algorithm.name}<i className="material-icons right">more_vert</i></span>
              <p><a href={'/' + this.props.algorithm.link} >Select algorithm</a></p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{this.props.algorithm.name}<i className="material-icons right">close</i></span>
              <p>Here is some more information about this product that is only revealed once clicked on.</p>
            </div>
          </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = Card;
