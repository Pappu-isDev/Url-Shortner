const User = require('../model/user');
const {v4: uuidv4} = require('uuid');
const {setUser} = require('../services/auth');
async function handleUserSignup (req,res){
    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    return res.redirect('/');
};
async function handleUserlogin (req,res){
    const { email,password} = req.body;
   const user =  await User.findOne({
        email,
        password,
    });
    console.log('user', user);
    if( !user) return res.render('login', {
        error : "invalid user please try again "
    });
    const sessionId = uuidv4();
    setUser (sessionId , user);
    res.cookie("uid",sessionId,{ httpOnly: true });
    return res.redirect('/');
};
module.exports = {
    handleUserSignup,
    handleUserlogin,
}