/** @jsx React.DOM */
var React = require('react/addons');
var mountNode = document.getElementById('react-main-mount');
// Overwrite server side generated front end
React.render(new submitApp({}), mountNode);
