const {Prob} = require ("../models/prob.js");

async function getProblems(req,res){
  console.log("get all problems was called");
    try {
        const problems = await Prob.find();
        res.status(200).json(problems);
      } catch (e) {
        console.log(e);
        return "Error";
      }
}

module.exports={getProblems}
