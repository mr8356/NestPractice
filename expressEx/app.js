const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const nunjucks = require('nunjucks')

dotenv.config();

const { sequelize } = require('./models') // models/index.js


app.set('port', process.env.PORT || 3000)
app.set('view engine', 'html');
nunjucks.configure('views', {
  express : app,
  watch : true,
});
const multer = require('multer');
const fs = require('fs');


sequelize.sync({force : false}).then(() => {console.log('db ok')}).catch((err) => {console.log(err)})

const indexRouter = require('./routes/')
const usersRouter = require('./routes/users')
const commentsRouter = require('./routes/comments')
const uploadRouter = require('./routes/upload')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));



try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}

// routers
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/upload', uploadRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});
