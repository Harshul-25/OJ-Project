const { generateFile, generateInput } = require("../generateFile");
const { executeCpp, executePy, executeC } = require("../executeFile");
const fs = require("fs-extra");
const path = require("path");

const outputPath = path.join(__dirname, "..", "codes");

const runCode = async (req, res) => {
  const { language = "cpp", code ,input} = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "empty code body" });
  }
  let output;
  try {
    const inputfile = await generateInput(input)
    const filepath = await generateFile(language, code);
    if(language==="cpp"){
      output = await executeCpp(filepath);
    }
    else if (language==="py") {
      output= await executePy(filepath);
    }
    else if(language==="c"){
      output = await executeC(filepath);
    }
    fs.emptyDirSync(outputPath);

    return res.json({ filepath, output });
  } catch (err) {
    // err likely contains { error: "sanitized message" } from executeFile
    console.error("Run Code Error:", err);
    // Send back in the format frontend might expect (check frontend code)
    // Assuming frontend checks error.response.data.message or error.response.data.err
    res.status(500).json({ message: err.error || "Code execution failed", err: err }); // Pass sanitized message
  }
};

module.exports = {
  runCode,
};
