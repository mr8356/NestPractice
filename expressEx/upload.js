const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');


// multer 객체 이용 => upload
const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, 'uploads/');
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname);
        done(null, path.basename(file.originalname, ext)+ ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.get('/', (req , res)=>{
    res.sendFile(path.join(__dirname, 'multipart.html'));
})
router.post('/', upload.single('image'), (req, res) => {
    console.log(req.file);
    res.send('ok');
});

module.exports = router