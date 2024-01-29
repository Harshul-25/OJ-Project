const jwt = require("jsonwebtoken");
const dotenv = require ('dotenv');
dotenv.config();

const options = {
    expiresIn: "24h",
};

async function generateToken({name,mail}) {
    try {
      const payload = {username:name,email:mail};
      const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
      return { error: false, token };
    } catch (error) {
      console.log(error)
      return { error: true };
    }
  }
  
module.exports={generateToken};
