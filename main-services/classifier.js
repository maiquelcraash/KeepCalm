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
		db = require('../config/db');

	db.getConnection();

	let app = express();
	app.server = http.createServer(app);

	app.use(bodyParser.json({
		limit: properties.BODY_LIMIT
	}));

	classifierController.trainBayesClassifier(() => {
		app.server.listen(properties.SERVER_PORT);
		console.log("Server started on port " + properties.SERVER_PORT);
	});

	app.post('/classify', (req, res) => {
		let target = req.body.target;
		let result = classifierController.getClassification(target);

		res.json(result);
	});

}());