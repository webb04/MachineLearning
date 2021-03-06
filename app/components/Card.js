/** @jsx React.DOM */

var React = require('react/addons');

var Card = React.createClass({
      render: function () {
        return (
          <div className="card medium">
            <p className="algorithmType">{this.props.algorithm.type}</p>
            <div className="card-image waves-effect waves-block waves-light">
              <img className="activator" src={'/images/' + this.props.algorithm.image}/>
            </div>
            <div className="card-content">
              <span className="card-title activator grey-text text-darken-4">{this.props.algorithm.name}<i className="material-icons right">more_vert</i></span>
              <p><a href={'/' + this.props.algorithm.link} >Select algorithm</a></p>
            </div>
            <div className="card-reveal">
              <span className="card-title grey-text text-darken-4">{this.props.algorithm.name}<i className="material-icons right">close</i></span>
              <h6 className="informationTitle">Top uses</h6>
              <ul className="bullet">
                {
                  this.props.algorithm.tags.map(function(tag) {
                    return (<li>{tag}</li>)
                  })
                }
              </ul>
              <img className="popupimg" src={'/images/' + this.props.algorithm.popupimg} />
            </div>
          </div>
        )
      }
  });

/* Module.exports instead of normal DOM mounting */
module.exports = Card;
