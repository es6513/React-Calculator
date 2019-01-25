const http = require("http");

const hostname = "127.0.0.1";
const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	res.end("./src/index.js");
});


//...
server.listen(PORT);
