(function() {
  var HOST = location.origin.replace(/^http/, 'ws');
  var ws = new WebSocket(HOST);
  var form = document.querySelector('.form');

  form.onsubmit = function() {
    var input = document.querySelector('.input'); 
    var inputa = document.querySelector('.inputa'); 
    var text = input.value;
    var texta = inputa.value;
    var txtjson = {
      "type":text,
      "messages":texta
    }
    txtjson = JSON.stringify(txtjson)
    ws.send(txtjson);
    input.value = '';
    input.focus();
    return false;
  }

  ws.onmessage = function(msg) {
    var response = msg.data;
    var messageList = document.querySelector('.messages');
    var li = document.createElement('li');
    li.textContent = response;
    res = JSON.parse(response)
    console.log(res.messages)
    messageList.appendChild(li);
  }

  socket.on("msg",function(msg) {
    var response = msg.data;
    var messageList = document.querySelector('.messages');
    var li = document.createElement('li');
    li.textContent = response;
    res = JSON.parse(response)
    console.log(res.messages)
    messageList.appendChild(li);
  })
}());
