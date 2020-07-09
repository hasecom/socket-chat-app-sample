// 必要なモジュールを読み込みます。
var http = require("http");
var socketIO = require("socket.io");
var fs = require("fs");

// node.jsでWebServerを作ります。
// アクセスされたら、クライアントに表示するsyncCanvas.htmlを返します。
var server = http.createServer(function (req, res) {
res.writeHead(200, {"Content-Type":"text/html"});
var output = fs.readFileSync("./index.html", "utf-8");
res.end(output);
});
server.listen(8080);

// socket.IOを用いたリアルタイムWebを実装します。
var io = socketIO.listen(server);

// 接続されたら、connected!とコンソールにメッセージを表示します。
io.sockets.on("connection", function (socket) {

  // 描画情報がクライアントから渡されたら、接続中の他ユーザーへ
  // broadcastで描画情報を送ります。
  // ちなみに、最近のsocket.IOでは、イベント名(以下だとdraw)は
  // 自由にネーミング出来るようになったようです。便利！！
  socket.on("draw", function (data) {
    socket.broadcast.emit("draw", data);
  });

  // 色変更情報がクライアントからきたら、
  // 他ユーザーへ変更後の色を通知します。
  socket.on("color", function (color) {
    socket.broadcast.emit("color", color);
  });

  // 線の太さの変更情報がクライアントからきたら、
  // 他ユーザーへ変更後の線の太さを通知します。
  socket.on("lineWidth", function (width) {
    socket.broadcast.emit("lineWidth", width);
  });
});