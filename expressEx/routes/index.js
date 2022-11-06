const express = require('express')
const router = express.Router();

// 테이블 불러오기
const User = require('../models/user')

router.get('/', async (req, res, next)=>{
    try {
        const users = await User.findAll();
        res.render('sequelize', {users})
    } catch (error) {
        console.error(error);
        next(error)
    }
})

module.exports = router