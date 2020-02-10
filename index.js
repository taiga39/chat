const path=require('path');
const express=require('express');
const app=express();

app.set('port', process.env.PORT || 5050);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), ()=>{ console.log("Node app is running at localhost:" + app.get('port')); });
