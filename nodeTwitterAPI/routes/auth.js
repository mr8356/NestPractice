const express = require('express')
const passport  = require('passport')
const router = express.Router()
const {isLoggedIn, isNotLoggedIn} = require('./middlewares')
// post login 로그인
router.post('/login' , isNotLoggedIn , (req, res, next)=>{
    const {email, password} = req.body
    // 인증 함수 
    passport.authenticate('local', (authError , user, info)=>{
        if(authError){
            console.error(authError);
            return next(authError)
        }
        if(!user){
            return res.redirect(`/?loginError=${info.message}`)
        }
        return req.login(user, (loginError)=>{
            if (loginError){
                console.error(loginError);
                return next(loginError)
            }
            return res.redirect('/')
        })
    })(req,res,next);
})

//get logout
router.get('/logout',isLoggedIn ,(req, res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.redirect('/');
      });
});

module.exports = router