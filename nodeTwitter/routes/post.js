const express = require('express');
const { isLoggedIn } = require('./middlewares');
const multer = require('multer')
const path = require('path')
const fs = require('fs');
const { basename } = require('path');
const router = express.Router();
const Post = require('../models/post')
const HashTag = require('../models/hashtag')
try {
    fs.readdirSync('uploads')
} catch (error) {
    console.log("uploads 폴더가 없으므로 새로 생성하겠습니다.")
    fs.mkdirSync('uploads')
}

const upload = multer({
    storage : multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/')
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits : {fileSize : 5 * 1024 * 1024}
});

router.post('/img', isLoggedIn, upload.single('img'), (req, res)=>{
    console.log(req.file);
    res.json({url : `/img/${req.file.filename}`})
    // 클라이언트 name="url" 인 태그로 정보 전송(html 에 임시 저장)
})

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), async(req, res,next) => {
    try {
        const post = await Post.create({
            content : req.body.content,
            img : req.body.url,
            UserId : req.user.id,
        })
        const hashtags = req.body.content.match(/#[^\s#]+/g);
        if (hashtags) {
            const result = await Promise.all(
                hashtags.map(tag => {
                    return HashTag.findOrCreate({
                        where : {title : tag.slice(1).toLowerCase()},
                    })
                })
            )
            await post.addHashtags(result.map(r => r[0]))
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error)
    }
})

module.exports = router;