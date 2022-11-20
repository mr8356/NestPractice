const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const Post = require('../models/post');
const User = require('../models/user');
const Hashtag = require('../models/hashtag');
const bcrypt = require('bcrypt')
const { compare } = require('bcrypt');
const { where } = require('sequelize');
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(user => user.id) : [];
  console.log(res.locals.followerIdList)
  next();
});

router.get('/profile', isLoggedIn , (req, res) => {
  res.render('profile', { title: '내 정보 - NodeBird' });
});

router.get('/update', isLoggedIn, (req, res)=>{
  res.render('update', {nick : req.user.nick});
});

router.post('/update', isLoggedIn, async (req, res, next)=>{
  try {
    const {nick, password, newpassword, newpassword2} = req.body;
    console.log(nick, password, newpassword, newpassword2)
    const logUser = await User.findOne({where : {id : req.user.id}})
    const result = await bcrypt.compare(password, logUser.password)
    if (result) {
      if(newpassword === newpassword2){
        const hash = await bcrypt.hash(newpassword , 12)
        await logUser.update({password : hash}, {nick})
        res.send('success');
      } else {
        res.status(400).send('비밀번호 확인이 일치하지 않습니다.')
      }
    } else {
        res.status(400).send('비밀번호가 일치하지 않습니다.')
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
})

router.get('/join', isNotLoggedIn , (req, res) => {
  res.render('join', { title: '회원가입 - NodeBird' });
});

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render('main', {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

router.get('/', async(req, res, next) => {
  try {
    const posts = await Post.findAll({
      include : {
        model : User,
        attributes : ['id', 'nick']
      },
      order : [['createdAt', 'DESC']]
    });
    res.render('main', {
      title : 'Nodebird',
      twits : posts
    });
  } catch (err) {
    console.error(err);
    next(err)
  }
});

module.exports = router;