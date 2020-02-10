app.use(log.access.add); // accessログに記録するためのミドルウェア

app.get('/log/usage', (req, res)=>{ res.send(log.usage.get()) }); 
app.get('/log/access', (req, res)=>{ res.send(log.access.get()) }); 
