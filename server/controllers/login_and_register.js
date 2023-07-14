import User from "../models/user.js";

// app.post("/",async(req,res)=>{
//     const{email,password}=req.body

//     try{
//         const check=await collection.findOne({email:email})

//         if(check){
//             res.json("exist")
//         }
//         else{
//             res.json("notexist")
//         }

//     }
//     catch(e){
//         res.json("fail")
//     }

// })


 export async function checkLogin(req,res){
    const {mail, pass} = req.body
    try {
        const check= await User.findOne({email:mail,password:pass})
        if(check){
            res.send("success")
        }
        else{
            res.send("failed")
        }
    } catch (error) {
       console.log(error).msg("unable to login"); 
    }
}

export async function signup(req,res){
    const {mail, handle, pass, name}= req.body
    console.log(mail,handle,pass,name);
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

