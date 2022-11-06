const express = require('express')
const router = express.Router();

// 테이블 불러오기

const User = require('../models/user');
const Comment = require('../models/comment');

router.get('/', async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.json(users)
    } catch (error) {
        console.error(error);
        next(error)
    }
})

router.post('/' ,async (req, res, next) =>{
    try {
        const user = await User.create({
            name : req.body.name,
            age : req.body.age,
            married : req.body.married,
        })
        console.log(user);
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        next(error)
    }
})

router.get('/:id/comments', async (req, res, next) => {
    try {
      const comments = await Comment.findAll({
        include: {
          model: User,
          where: { id: req.params.id },
        },
      });
      console.log(comments);
      res.json(comments);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router