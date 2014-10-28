var Path = require('path');
var Hapi = require('hapi');

var server = new Hapi.Server(3000);

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
  path: "/{path*}", // for some path css, js, lib
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

server.start(function() {
  console.log("Hapi server started @", server.info.uri);
});
