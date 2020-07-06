var express = require('express');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 7000;


const redis = require('redis')
// 接続情報
const config = {
    host: '127.0.0.1',
    port: 6379
}
// 接続
const client = redis.createClient(config)
// データの登録
client.set('key', 'value')

// データの取得と表示
client.get('key', (err, reply) => {
  console.log(reply)
})
// 切断
client.quit()


app.get('/' , function(req, res){
    res.sendFile(__dirname+'/public/index.html');
});

io.on('connection',function(socket){
  socket.on('chat',function(msg){
      console.log('message: ' + msg);
      // socket.join('testroom')
      io.emit('chat', msg);
      // io.to("test").emit('chat', msg);
  });
  socket.on('room',function(msg){
    socket.join('testroom')
    io.to("testroom").emit('chat', "入室したよんささささ");
});
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});