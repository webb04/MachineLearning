var express = require('express'),
path = require('path'),
app = express(),
port = 4444,
bodyParser = require('body-parser');

require('node-jsx').install();

// Include static assets
app.use(express.static(path.join(__dirname, 'public')));
// Set view path
app.set('views', path.join(__dirname, 'views'));
// Use EJS template engine
app.set('view engine', 'ejs');

// Support JSON encoded bodies
app.use(bodyParser.json());
// Support encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set up routes
require('./app/routes/core-routes.js')(app);

//Route not found - Set 404
app.get('*', function(req, res) {
    res.json({
        'route': 'Sorry this page does not exist!'
    });
});

app.listen(process.env.PORT || port);
console.log('Server is Up and Running at Port : ' + port);
