var Path = require('path');
var Hapi = require('hapi');

var server = new Hapi.Server(3000);

server.views({
  engines: {
    jade: require('jade')
  },
  path: Path.join(__dirname, 'views')
});

server.route({
  path: "/static/{path*}",
  method: 'GET',
  handler: {
    directory: {
      path: './public',
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
