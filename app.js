var Path = require('path');
var Hapi = require('hapi');

// logging using winston
var winston = require('winston');

// log to file and not console
var logfile = (process.env.NODE_ENV || 'development') + '.log';
console.log(winston.transports);
console.log(winston.transports.File);
//winston.add(winston.tranports.File, { filename: logfile });
winston.remove(winston.transports.Console);

var server = new Hapi.Server(3000);

// handle 404
server.route({
  method: '*',
  path: '/{p*}',
  handler: function (req, res) {
    winston.info('404', { query: req.query });
    res.view('404').code(404);
  }
});

// use jade as the view template
// can be any of html, handlebars, markdown
server.views({
  engines: {
    jade: require('jade')
  },
  path: Path.join(__dirname, 'views')
});

// Note this important for static files
// like jquery, javascript, css to work
server.route({
  method: 'GET',
  path: "/public/{path*}", // for some path css, js, lib
  handler: {
    directory: {
      path: './public', // look under the public directory
      listing: false,
      index: false
    }
  }
});

server.route({
  method: 'GET',
  path: '/',
  handler: function (req, res) {
    res.view('index', { title: "Homepage" });
  }
});

server.route({
  method: 'GET',
  path: '/page',
  handler: function (req, res) {
    res.view('page');
  }
});

server.route({
  method: 'GET',
  path: '/mail',
  handler: function (req, res) {
    var json = {};
    if (req.query.mailId) {
      json = require('./data/mail.json');
    } else {
      json = require('./data/' + req.query.folder + '.json');
    }
    return res(json);
  }
});

server.start(function() {
  winston.info("Hapi server started %s", server.info.uri);
  console.log("Hapi server started @", server.info.uri);
});
