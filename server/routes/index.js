'use strict';

exports.name = 'routes.index';

exports.requires = [
	'@express'
];

exports.factory = function (express) {
	let router = express.Router();

	router.get('/', function (req, res, next) {
		res.render('index', {
			title: 'iNote. Restful API',
			message: 'Powered By Love and Coffee!'
		});
	});

	return router;
};

const nodemailer = require('nodemailer');
var express = require('express');
var app = express();
var port = process.env.PORT || 3002;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

var auth = {
	user: 'amazinghieu98@gmail.com', 		//change by your email
	pass: 'HaXuyen20041998'            //change by your password
};

var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: auth,
});

transporter.verify((error, success) => {
	if (error) {
		console.log(error);
	} else {
		console.log('Server is ready to take messages');
	}
});

app.use(express.json());

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.post('/send', function (req, res) {

	const name = req.body.name
	const email = req.body.email
	const message = req.body.message
	const url_verify = "http://localhost:3000/verify/";
	const mail = {
		from: name,
		to: email,
		subject: 'New Message from iNote App',
		html: 'Message from: ' + name + '<br></br> To: ' + email + '<br></br> ' +
			'Message: ' + '<a href="' + url_verify + message + '" >Click me</a>',
	};

	transporter.sendMail(mail, (err, data) => {
		if (err) {
			res.json({
				msg: 'fail'
			})
			return console.log(err);
		} else {
			res.json({
				msg: 'success'
			})
			console.log(JSON.stringify(data));
		}
	})
})

app.listen(port);
