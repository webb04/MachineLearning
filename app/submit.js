/** @jsx React.DOM */

var React = require('react/addons');
// var submitApp = require('./components/submitApp');

var mountNode = document.getElementById('react-main-mount');

var numbers = [1,2,3,4,5];
var timesTwo = numbers.map((number) => number * 2);
console.log(timesTwo);

// Overwrite server side generated front end
React.render(new submitApp({}), mountNode);
