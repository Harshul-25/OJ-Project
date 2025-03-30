const {User} = require ("../models/user.js");
const {generateToken} = require('../generateJWT.js');
const bcrypt = require('bcrypt');

 async function checkLogin(req,res){
    const {mail, pass} = req.body;

    if (!mail || !pass) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email: mail });

        if (user && await bcrypt.compare(pass, user.password)) {
           const {error, token} = await generateToken({ name: user.name, mail: user.email, handle: user.handle });
           
           if (error) {
            console.error("Token Generation Error:", error);
            return res.status(500).json({
              message: "Couldn't create access token. Please try again later.",
            });
          } 
          return res.json({ token, mail: user.email, handle: user.handle });
        
        } else {
           return res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
       console.error("Login Server Error:", error);
       return res.status(500).json({ message: "Login failed due to a server error." });
    }
}

async function signup(req,res){
    const {mail, handle, pass, name}= req.body;

    try {
        const check = await User.findOne({email:mail});
        if(check){
            return res.status(409).json({ message: "Email already exists" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(pass, saltRounds);
        
        const newUser = new User({handle:handle, name:name, email:mail, password: hashedPassword});
        
        await newUser.save();
        
        return res.status(201).json({ message: "Registration successful!" });

    } catch (error) {
        console.error("Signup Server Error:", error);
        return res.status(500).json({ message: "Registration failed due to a server error." });
    }
}

module.exports ={checkLogin, signup}