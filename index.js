const path=require('path');
const app=express();
const cookieParser=require('cookie-parser');
const bodyParser=require('body-parser');

// noWarning: true の設定がないと落ちる。databaseURLはherokuでは環境変数に入っている
const pgPromise=require('pg-promise')({ noWarnings: true });
const databaseURL=process.env.DATABASE_URL;

const database=pgPromise(databaseURL);

app.set('port', process.env.PORT || 5050);
app.use(express.static(path.join(__dirname, 'public')));
app.use(log.access.add);
app.use(cookieParser());
// bodyParserの設定 (Json形式用)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/login', async (req, res)=>{
    const user= await database.any('select * from loginUser').filter(a=> a.name===req.body.name);

    if( user.length!==1 || user[0].password!==req.body.password ) res.sendStatus(401);
    else res.send('OK');
});

app.get('/status.html', async (req, res)=>{
    const user= await database.any('select * from loginUser').filter(a=> a.name===req.body.name);

    if( user.length!==1 || user[0].password!==req.cookies.password ){
        res.sendFile(path.join(__dirname, '/private/login.html')); 
    }
    else{ res.sendFile(path.join(__dirname, '/private/user_only.html')); }
});