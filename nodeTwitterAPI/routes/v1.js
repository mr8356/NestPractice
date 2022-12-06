const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const {Domain, User, Post, Hashtag} = require('../models');
const { vertifyToken } = require('./middlewares');
const cors = require('cors');
const url = require('url')
require('dotenv').config()

router.use(cors({
    credentials : true
}));

router.post('/token', async (req, res, next)=>{
    const {clientSecret} = req.body;
    try {
        console.log(clientSecret)
        const domain = await Domain.findOne({
            where : {clientSecret : clientSecret},
            include: {
                model: User,
                attribute: ['nick', 'id'],
            },
        })
        if (!domain) {
            return res.status(401).json({
                code : 401,
                message : '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요.'
            })
        }
        const token = await jwt.sign({
            id : domain.UserId
        }, process.env.JWT_SECRET ,{
            expiresIn : '1m',
            issuer : 'nodeTwitter'
        });
        return res.json({
            code : 200,
            message : '토큰이 발급되었습니다.',
            token,
        })
        console.log(token)
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code : 500,
            message : '서버 오류',
        })
    }
})

router.get('/test', vertifyToken, (req,res)=>{
    res.json(req.decoded);
})

router.get('/posts/my', vertifyToken, (req, res)=>{
    Post.findAll({where : {id : req.user.id}})
    .then((posts) => {
        console.log(posts);
        res.json({
            code : 200,
            payload : posts
        })
    }).catch((err)=>{
        console.error(err);
        res.status.json({
            code : 500,
            message : '서버 오류'
        })
    })
})

router.get('posts/hashtag/:title', vertifyToken, async (req, res)=>{
    try {
        const hashtag = await Hashtag.findOne({where : {title : req.params.title}})
        if (!hashtag) {
            return res.status(404).json({
                code : 404,
                message : '검색 결과가 없습니다.'
            })
        }
        const posts = await hashtag.getPosts()
        console.log(posts);
        res.json({
            code : 200,
            payload : posts
        })
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            code : 500,
            message : '서버 오류'
        })
    }
})


module.exports = router;