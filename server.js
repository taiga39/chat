var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 7000;

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/public/index.html');
});

io.on('connection',function(socket){
    socket.on('chat',function(msg){
        console.log('message: ' + msg);
        io.emit('chat', msg);
    });
});

http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});