

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
	pass: '06032004TH'            //change by your password
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
	const myEmail = 'amazinghieu98@gmail.com'
	const name = req.body.name
	const email = req.body.email
	const hotel = req.body.hotel
	const room = req.body.room
	const date = req.body.date
	const time = req.body.time

	const mail = {
		from: myEmail,
		to: email,
		subject: 'Thông báo: Đơn yêu cầu đặt phòng đã được tiếp nhận',
		html: 'Xin chào ' + name + ', đơn yêu cầu đặt phòng của bạn đã được tiếp nhận!' + '<br></br> ' + '<br></br> ' +
			'Chúng tôi đã tiếp nhận đơn yêu cầu của bạn như sau:' + '<br></br> ' +
			'Khách sạn: ' + hotel + '<br></br> ' +
			'Loại phòng: ' + room + '<br></br> ' +
			'Thời điểm nhận phòng: ngày ' + date + ' vào lúc ' + time + '<br></br> ' +  '<br></br> ' +
			'Chúng tôi đang liên hệ với khách sạn ' + hotel + ' và sẽ liên lạc với bạn ngay khi có kết quả!'
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

app.post('/sendApply', function (req, res) {
	const myEmail = 'amazinghieu98@gmail.com'
	const name = req.body.name
	const email = req.body.email
	const hotel = req.body.hotel
	const room = req.body.room
	const date = req.body.date
	const time = req.body.time
	const mail = {
		from: myEmail,
		to: email,
		subject: 'Thông báo: Đơn yêu cầu đặt phòng đã được xác nhận',
		html: 'Cảm ơn ' + name + '! Yêu cầu đật phòng ' + room + ' tại khách sạn ' + hotel + ' đã được xác nhận.' + ' <br></br> ' +
			hotel + ' đang chờ đợi bạn tới nghỉ vào ngày ' + date + ' <br></br> ' +
			'Thanh toán của bạn sẽ được ' + hotel + ' xử lý khi bạn đến nhận phòng.' + ' <br></br> ' +
			'Bạn có thể hủy Miễn Phí cho đến trước ngày ' + date + ' trên hệ thống của chúng tôi.'
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
