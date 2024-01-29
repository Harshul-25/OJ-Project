const {User} = require ("../models/user.js");
const {generateToken} = require('../generateJWT.js');

 async function checkLogin(req,res){
    const {mail, pass} = req.body
    try {
        const user= await User.findOne({email:mail,password:pass})
        if(user){
           const {error, token} = await generateToken({name:user.name,mail:user.email})
           if (error) {
            return res.status(500).json({
              error: true,
              message: "Couldn't create access token. Please try again later.",
            });
          } 
          return res.json({status:"success",token, handle:user.handle});
        //    return res.json({status:"success",user})
        }
        else{
           return res.json({status:"failed"})
        }
    } catch (error) {
       console.log(error).msg("unable to login"); 
    }
}

async function signup(req,res){
    const {mail, handle, pass, name}= req.body
    const newUser = new User({handle:handle,name:name,email:mail,password:pass})
    console.log(newUser);
    try {
        const check = await User.findOne({email:mail})
        if(check){
            res.send("exists");
            console.log("already exists");
        }
        else{
            res.send("success")
            await User.insertMany([newUser])
        }
    } catch (error) {
        console.log(error).msg("Registration failed");
    }
}

module.exports ={checkLogin, signup}