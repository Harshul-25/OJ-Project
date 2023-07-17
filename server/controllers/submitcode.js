const { generateFile, generateInput } = require("../generateFile");
const {getTestcases} = require("../getTestcases")
const { executeCpp } = require("../executeCpp");
const fs = require("fs-extra");
const path = require("path");


const outputPath = path.join(__dirname, "..", "codes");

const submitCode = async (req, res) => {
  const { language = "cpp", code, id} = req.body;
    
  if (code === undefined) {
    return res.status(400).json({ success: false, error: "empty code body" });
  }

  let testcases=[]; let filepath='';
  try {
      const Tcases = await getTestcases(id)
     filepath = await generateFile(language, code);
     testcases=Tcases.cases; 
  } catch (err) {
    return res.status(500).json({ err });
  }
  console.log(testcases);
  let accepted=0; const totalcases=testcases.length;
  for (let i = 0; i < testcases.length; i++) {
    try {
        const inputfile = await generateInput(testcases[i].input)
        const output = await executeCpp(filepath); 
        const out=output.trim();
        console.log(out);
        if(out==testcases[i].output){accepted=accepted+1;}
    
      } catch (err) {
        return res.status(500).json({ err });
      }
  }
  fs.emptyDirSync(outputPath);
  return res.status(200).json({accepted, totalcases})
};

module.exports = {
  submitCode,
};
