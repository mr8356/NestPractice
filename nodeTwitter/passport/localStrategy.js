const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user')

module.exports = () => {
    // localStrategy 미들웨어를 passport 과정에서 자동사용
    // 두 인자 옵션, vertify 미들웨어
    passport.use(new localStrategy({
        // 첫 번째 인자 - 아디 비번 옵션
        usernameField : 'email',
        passwordField : 'password'
    }, async (email, password, done) => {
        // vertify되면 done 하는 미들웨어
        try {
            const logUser = await User.findOne({where : {email}})
            if (logUser) {
                const result = await bcrypt.compare(password, logUser.password)
                if (result) {
                    done(null, logUser);
                } else {
                    done(null, false, {message : '비밀번호가 일치하지 않습니다.'})
                }
            } else {
                // 사용자가 없습니다.
                done(null, false, { message : '가입되지 않은 회원입니다.' })
            }
        } catch (error) {
            console.error(error);
            done(error)
        }
    }))
}