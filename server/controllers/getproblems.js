import Prob from "../models/prob.js";

// export const getImage = async (request, response) => {
//     try {   
//         const file = await File.findById(request.params.fileId);
        
//         file.downloadCount++;

//         await file.save();

//         response.download(file.path, file.name);
//     } catch (error) {
//         console.error(error.message);
//         response.status(500).json({ msg: error.message });
//     }
// }

export default  async function getProblems(req,res){
    const problems = await Prob.find();
    console.log(problems);
    res.send(problems);
}