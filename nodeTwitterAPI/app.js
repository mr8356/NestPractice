const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const morgan = require('morgan')
const session = require('express-session')
const nunjucks = require('nunjucks')
const dotenv = require('dotenv')
const { sequelize } = require('./models') //db
const { env } = require('process')
dotenv.config();

const app = express();
app.set('port', process.env.PORT || 8002)
app.set('view engin', 'html');
nunjucks.configure('views', {
    express : app,
    watch : true,
})
sequelize.sync({force : false}).then(()=>{
    console.log('db success')
}).catch((err)=>{
    console.error(err)
})

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'views')))
app.use(express.urlencoded({ extended : false }))
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret : process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    }
}))
app.use(passport.initialize());
app.use(passport.session());

// 여기 라우터들
app.use()


// 어떤 라우터에도 해당 X
app.use((req,res,next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`)
    error.status = 404;
    next(error)
})
// 에러를 받음
app.use((err, req, res, next)=>{
    req.locals.message = err.message;
    if(process.env.NODE_ENV != 'production'){
        res.locals.error = err
    }
    res.status(err.status || 500);
    res.render('error');
})

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중')
})