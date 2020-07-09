const express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http); 
const PORT = process.env.PORT || 8080;

app.get('/',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
    socket.on('message',function(msg){
        console.log(msg);
        io.emit('message',msg);
    });
});

http.listen(PORT,function(){
    console.log('server listening... port:' + PORT);
});
