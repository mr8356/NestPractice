const express = require('express')
const router = express.Router();

// 테이블 불러오기
const User = require('../models/user');
const Comment = require('../models/comment');
router.get('/')
router.post('/', async (req, res, next)=>{
    try {
        const comment = await Comment.create({
            commenter : req.body.id,
            comment : req.body.comment,
        })
        console.log(comment);
        res.status(201).json(comment);
    } catch (error) {
        console.error(error)
        next(error)
    }
})
router.patch('/:id', async (req, res, next)=>{
    try {
        const result = await Comment.update({
            comment : req.body.comment
        },{
            where : { id : req.params.id }
        })
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})
router.delete('/:id', async (req, res, next)=>{
    try {
        const result = await Comment.destroy({where : {id : req.params.id}})
        res.json(result)
    } catch (error) {
        console.error(error)
        next(error)
    }
})

module.exports = router;