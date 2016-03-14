var React = require('react/addons'),
		ReactApp = React.createFactory(require('../components/ReactApp')),
		AlgorithmSelect = React.createFactory(require('../components/AlgorithmSelect')),
		kMeansClustering = require("../machineLearning/kMeansClustering"),
		kNearestNeighbours = require("../machineLearning/dist/kNearestNeighbours");

module.exports = function(app) {

	app.get('/', function(req, res){
		// React.renderToString takes component
    // and generates the markup
		// Server-side generated html = good SEO
		var reactHtml = React.renderToString(AlgorithmSelect({}));
    // Output html rendered by react
    res.render('index.ejs', {AlgorithmSelect: reactHtml});
	});

	/*
		Algorithm forms
	*/

	app.get('/knn', function(req, res){
		var reactHtml = React.renderToString(ReactApp({algorithm: "KNN"}));
		res.render('KNN.ejs', {reactOutput: reactHtml});
	});

	app.get('/kmeans', function(req, res){
		var reactHtml = React.renderToString(ReactApp({algorithm: "KMEANS"}));
		res.render('KMEANS.ejs', {reactOutput: reactHtml});
	});

	app.get('/regression', function(req, res){
		var reactHtml = React.renderToString(ReactApp({algorithm: "OLS"}));
		res.render('OLS.ejs', {reactOutput: reactHtml});
	});


	/*
		Handle forms
	*/

	app.post('/submit', function(req, res){
		var algorithm = req.body.algorithm.toUpperCase();
		var inputData = req.body.inputData;
		var featureA = req.body.featureA || null;
		var featureB = req.body.featureB || null;
		var featureALabel;
		var featureBLabel;

		var data = JSON.parse(inputData.toString().trim());
		var i = 0;
		for (item in data[0]) {
			if (i == 0) featureALabel = item;
			if (i == 1) featureBLabel = item;
			i++;
		}

		switch (algorithm) {
	    case 'KMEANS':
					var targets = [];
					targets = kMeansClustering.setup(data, featureA, featureB, featureALabel, featureBLabel);
					res.render('d3kmeans.ejs', {targets: targets, data: req.body.inputData,
					featureA: featureA, featureB: featureB, featureALabel: featureALabel,
					featureBLabel: featureBLabel});
	        break;
	    case 'KNN':
					types = kNearestNeighbours.run(data, featureA, featureB);
					res.render('d3knn.ejs', {reactOutput: types, data: req.body.inputData,
					featureA: featureA, featureB: featureB, featureALabel: featureALabel,
					featureBLabel: featureBLabel});
	        break;
			case 'OLS':
					var X = [];
					var y = [];
					res.render('d3regression.ejs', {reactOutput: "test", title: req.body.title,
					data: req.body.inputData, X: X, y: y, featureALabel: featureALabel,
					featureBLabel: featureBLabel});
					break;
		}
	});
};
