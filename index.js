
var http = require("http");
var socketIO = require("socket.io");
var fs = require("fs");


var server = http.createServer(function (req, res) {
res.writeHead(200, {"Content-Type":"text/html"});
var output = fs.readFileSync("./index.html", "utf-8");
res.end(output);
});
server.listen(8080);


var io = socketIO.listen(server);


io.sockets.on("connection", function (socket) {
  socket.on("draw", function (data) {
    socket.broadcast.emit("draw", data);
  });
  socket.on("color", function (color) {
    socket.broadcast.emit("color", color);
  });
  socket.on("clear",function(){
      socket.broadcast.emit("clear");
  });
});