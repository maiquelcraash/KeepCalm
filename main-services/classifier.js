/**
 * Created by maiquel on 05/02/18.
 */

(function () {
	"use strict";

	const http = require('http'),
		express = require('express'),
		bodyParser = require('body-parser'),
		properties = require('../config/properties'),
		classifierController = require('../controller/classifierController'),
		activityLogController = require('../controller/activityLogController'),
		db = require('../config/db');

	db.getConnection();

	let app = express();
	app.server = http.createServer(app);

	app.use(bodyParser.json({
		limit: properties.BODY_LIMIT
	}));

	classifierController.trainBayesClassifier(() => {
		// classifierController.trainLogisticRegressionClassifier(() => {
		app.server.listen(properties.CLASSIFIER_SERVER_PORT);
		console.log("Server started on port " + properties.CLASSIFIER_SERVER_PORT);
	});

	app.all('*', (req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		next();
	});

	app.post('/classify', (req, res) => {
		let ip = req.headers.host;
		let target = req.body.target;

		console.log("\nConnection from " + ip + "\n Processing: \"" + target + "\"");
		classifierController.getClassification(target, (results) => {
			console.log("Result: " + results.effectiveResult);
			res.json(results);
		});
	});

	app.post('/feedback', (req, res) => {
		let activityID = req.body.activityID;
		let feedback = req.body.feedback;

		activityLogController.updateActivity(activityID, feedback, (err) => {
			if (err) {
				console.error("Error to handle activity: " + activityID);
				res.status(400);
				res.json(err);
			}
			else {
				console.log("Feedback added to activity: " + activityID);
				res.status(201);
				res.json({"Status": "OK"});
			}
		})
	});

}());