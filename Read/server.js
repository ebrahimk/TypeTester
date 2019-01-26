const http = require('http');
const app = require('./app');

var port = process.env.PORT || 1339;

const server = http.createServer(app);

server.listen(port);
console.log("Server running at http://localhost:%d", port);
