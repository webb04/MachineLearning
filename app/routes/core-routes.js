var React = require('react/addons'),
ReactApp = React.createFactory(require('../components/ReactApp')),
AlgorithmSelect = React.createFactory(require('../components/AlgorithmSelect')),
kMeansClustering = require("../machineLearning/kMeansClustering"),
kNearestNeighbours = require("../machineLearning/dist/kNearestNeighbours");

module.exports = function(app) {

	app.get('/', function(req, res){
		// React.renderToString takes your component
    // and generates the markup
		var reactHtml = React.renderToString(AlgorithmSelect({}));
    // Output html rendered by react
		// console.log(myAppHtml);
    res.render('index.ejs', {AlgorithmSelect: reactHtml});
	});



	/*
		Algorithm forms
	*/

	app.get('/knn', function(req, res){
		// React.renderToString takes your component
		// and generates the markup
		var reactHtml = React.renderToString(ReactApp({algorithm: "KNN"}));
		// Output html rendered by react
		// console.log(myAppHtml);
		res.render('KNN.ejs', {reactOutput: reactHtml});
	});

	app.get('/kmeans', function(req, res){
		// React.renderToString takes your component
		// and generates the markup
		var reactHtml = React.renderToString(ReactApp({algorithm: "KMEANS"}));
		// Output html rendered by react
		// console.log(myAppHtml);
		res.render('KMEANS.ejs', {reactOutput: reactHtml});
	});


	/*
		Handle forms
	*/

	app.post('/submit', function(req, res){
		var algorithm = req.body.algorithm.toUpperCase();
		var inputData = req.body.inputData;
		var featureA = req.body.featureA;
		var featureB = req.body.featureB;

		var data = JSON.parse(inputData.toString().trim());
		// var submitHtml = React.renderToString(SubmitApp({}));

		switch (algorithm) {
	    case 'KMEANS':
					// res.render('submit.ejs', {reactOutput: submitHtml});
					types = {};
					res.render('result.ejs', {reactOutput: types});
	        break;
	    case 'KNN':
					console.log(featureA, featureB);
					types = kNearestNeighbours.run(data, featureA, featureB);
					res.render('result.ejs', {reactOutput: types});
	        break;
		}
	});





};
