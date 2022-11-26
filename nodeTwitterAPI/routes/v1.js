const express = require('express')
const router = express.Router();
const jwt = require('jsonwebtoken');
const {Domain, User} = require('../models');
const { vertifyToken } = require('./middlewares');


router.post('/token', async (req, res, next)=>{
    const {clientSecret} = req.body;
    try {
        const domain = await Domain.findOne({
            where : {clientSecret},
            include : {
                model : User,
                attributes : ['id', 'nick']
            }
        })
        if (!domain) {
            return res.status(401).json({
                code : 401,
                message : '등록되지 않은 도메인입니다. 먼저 도메인을 등록하세요.'
            })
        }
        const token = await jwt.sign({
            id : domain.User.id,
            nick : domain.User.nick,
        }, process.env.JWT_SECRET ,{
            expiresIn : '1m',
            issuer : 'nodeTwitter'
        });
        return res.json({
            code : 200,
            message : '토큰이 발급되었습니다.',
            token,
        })
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

module.exports = router;