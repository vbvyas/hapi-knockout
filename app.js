var Path = require('path');
var Hapi = require('hapi');

var server = new Hapi.Server(3000);

// handle 404
server.route({
  method: '*',
  path: '/{p*}',
  handler: function (req, res) {
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
  console.log("Hapi server started @", server.info.uri);
});
