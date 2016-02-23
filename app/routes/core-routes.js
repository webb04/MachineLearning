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
		res.render('KNN.ejs', {reactOutput: reactHtml});
	});

	app.get('/kmeans', function(req, res){
		// React.renderToString takes your component
		// and generates the markup
		var reactHtml = React.renderToString(ReactApp({algorithm: "KMEANS"}));
		// Output html rendered by react
		res.render('KMEANS.ejs', {reactOutput: reactHtml});
	});

	app.get('/regression', function(req, res){
		// React.renderToString takes your component
		// and generates the markup
		var reactHtml = React.renderToString(ReactApp({algorithm: "OLS"}));
		// Output html rendered by react
		res.render('OLS.ejs', {reactOutput: reactHtml});
	});


	/*
		Handle forms
	*/

	app.post('/submit', function(req, res){
		var algorithm = req.body.algorithm.toUpperCase();
		var inputData = req.body.inputData;
		var featureA = req.body.featureA;
		var featureB = req.body.featureB;
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
					types = {};
					res.render('d3kmeans.ejs', {reactOutput: types});
	        break;
	    case 'KNN':
					types = kNearestNeighbours.run(data, featureA, featureB);
					res.render('d3knn.ejs', {reactOutput: types, data: req.body.inputData,
					featureA: featureA, featureB: featureB, featureALabel: featureALabel,
					featureBLabel: featureBLabel});
	        break;
			case 'OLS':
					// types = Regression.run(data);
					// split X and y into arrays of values
					var X = [];
					var y = [];

					// for (item in req.body.inputData) {
					// 	console.log(item);
					// 	for (prop in req.body.inputData[item]) {
					// 		if (i == 0) X.push(req.body.inputData[item].prop);
					// 		if (i == 1) y.push(req.body.inputData[item].prop);
					// 		i++;
					// 	}
					// }

					res.render('d3regression.ejs', {reactOutput: "test", title: req.body.title,
					data: req.body.inputData, X: X, y: y, featureALabel: featureALabel,
					featureBLabel: featureBLabel});
					break;
		}
	});
};
