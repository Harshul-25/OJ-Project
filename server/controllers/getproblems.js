const {Prob} = require ("../models/prob.js");

async function getProblems(req,res){
    try {
        const problems = await Prob.find();
        console.log(problems);
        res.status(200).json(problems);
      } catch (e) {
        console.log(e);
        return "Error";
      }
}

module.exports={getProblems}
