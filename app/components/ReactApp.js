/** @jsx React.DOM */

var React = require('react/addons');
var Form = React.createFactory(require('./Form'));

var ReactApp = React.createClass({
      render: function () {
        return (
          <div>
            <Form algorithm={this.props.algorithm}/>
          </div>
        )
      }
  });

/* Module.exports instead of normal DOM mounting */
module.exports = ReactApp;
