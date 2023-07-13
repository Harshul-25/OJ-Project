import Prob from "../models/prob.js";

export default  async function getProblems(req,res){
    const problems = await Prob.find();
    console.log(problems);
    res.send(problems);
}