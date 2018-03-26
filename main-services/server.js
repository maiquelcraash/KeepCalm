/**
 * Created by maiquel on 28/02/18.
 */

(function () {
	"use strict";

	const http = require('http'),
		express = require('express'),
		bodyParser = require('body-parser'),
		properties = require('../config/properties'),
		StringDecoder = require('string_decoder').StringDecoder,	//módulo para decodificar strings
		decoder = new StringDecoder('utf8');


	let dir = __dirname.split("/");
	dir.pop();
	const root = dir.join("/");

	let app = express();
	app.server = http.createServer(app);

	//Body Parser
	app.use(bodyParser.json({
		limit: properties.BODY_LIMIT
	}));

	//Arquivos estáticos acessíveis a todos
	app.use(express.static(root + '/public'));
	app.use("/css",  express.static(root + '/public/css'));
	app.use("/js", express.static(root + '/public/js'));
	app.use("/img",  express.static(root + '/public/img'));


	app.server.listen(properties.WEB_SERVER_PORT);
	console.log("Server started on port " + properties.WEB_SERVER_PORT);

	app.all('*', (req, res, next) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type');
		next();
	});

	/* Server Routes */
	app.get('/', (req, res) => {
		res.sendFile(root + '/public/index.html');
	});


	app.post('/classify', (req, serverRes) => {
		let target = req.body.target;

		const postData = {
			'target': target
		};

		let options = {
			host: properties.CLASSIFIER_HOST,
			port: properties.CLASSIFIER_SERVER_PORT,
			method: 'POST',
			path: "/classify",
			headers: {
				'Accept': 'application/json',							//CONTENT NEGOTIATION: indica ao servidor que a requisição espera um json como resposta
				'Content-type': 'application/json'
			}
		};

		const classifierRequest = http.request(options, (res) => {
			const {statusCode} = res;

			res.setEncoding('utf8');
			res.on('data', (data) => {
				serverRes.json(JSON.parse(data));
			});

		});

		classifierRequest.on('error', (e) => {
			classifierRequest.status = 400;
			if (e.code === "ECONNREFUSED") {
				serverRes.send({error: e.message})
			}
			else {
				serverRes.send(e.message);
			}
		});

		classifierRequest.end(JSON.stringify(postData));

	});

	app.post('/feedback', (req, serverRes) => {
		let activityID = req.body.activityID;
		let feedback = req.body.feedback;

		const postData = {
			activityID: activityID,
			feedback: feedback
		};

		let options = {
			host: properties.CLASSIFIER_HOST,
			port: properties.CLASSIFIER_SERVER_PORT,
			method: 'POST',
			path: "/feedback",
			headers: {
				'Accept': 'application/json',							//CONTENT NEGOTIATION: indica ao servidor que a requisição espera um json como resposta
				'Content-type': 'application/json'
			}
		};

		const classifierRequest = http.request(options, (res) => {
			const {statusCode} = res;

			res.setEncoding('utf8');
			res.on('data', (data) => {
				serverRes.json(JSON.parse(data));
			});

		});

		classifierRequest.on('error', (e) => {
			classifierRequest.status = 400;
			if (e.code === "ECONNREFUSED") {
				serverRes.send({error: "Classifier is offline"})
			}
			else {
				serverRes.send(e.message);
			}
		});

		classifierRequest.end(JSON.stringify(postData));

	});

}());