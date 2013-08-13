var parse = require('arg').parse;
var args = parse ( process.argv.join(" ") );
var readFileSync = require('fs').readFileSync;
var mailer = require('nodemailer');
var smtp = mailer.createTransport("SMTP",{
  service: "Gmail",
    auth: {
    user: "andrew@myimedia.com",
    pass: readFileSync('.passwd','utf8') 
    }
});
var mailOptions = {
  from: "andrew@myimedia.com",
  to: "andrew@myimedia.com",
  subject: "MT Council RSVP",
  text: ""
}
var winston = require('winston');
winston.add(winston.transports.File, { filename: 'data/general.log' });
winston.remove(winston.transports.Console);
winston.handleExceptions(new winston.transports.File({ filename: 'data/exceptions.log' }))
var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: 'data/rsvps.log',
      handleExceptions: true
    })
  ]
});
logger.info('server started');

var express = require('express');
var app = express();

app.use(express.bodyParser());

app.use(express.logger('dev'));

app.use(express.static(__dirname + '/app'));

app.post('/api/rsvp/submit', function(req, res, next) {
  var data = {};
  mailOptions.text = '';
  for(i in req.body){
    mailOptions.text += i + ":\t" + req.body[i] + "\n";
    data[i] = req.body[i];
  }
  console.log(data);
  logger.info('rsvp',{'data' : data},function() {
    winston.info('submit logged'); 
  });
  smtp.sendMail(mailOptions, function(error,response) {
    if(error){
      logger.error('send error',error);
      res.send('FAIL');
    }else{
      res.send('OK');
    }
  });
  //res.send('OK');
});

app.use(app.router);

if(args.p > 0) {
  app.listen(args.p);
}else{
  app.listen(80);
}

