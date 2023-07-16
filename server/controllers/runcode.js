const { generateFile, generateInput } = require("../generateFile");
const { executeCpp } = require("../executeCpp");
const fs = require("fs-extra");
const path = require("path");

const outputPath = path.join(__dirname, "..", "codes");

const runCode = async (req, res) => {
  const { language = "cpp", code ,input} = req.body;

  if (code === undefined) {
    return res.status(400).json({ success: false, error: "empty code body" });
  }

  try {
    const inputfile = await generateInput(input)
    const filepath = await generateFile(language, code);
    const output = await executeCpp(filepath);
    fs.emptyDirSync(outputPath);

    return res.json({ filepath, output });
  } catch (err) {
    res.status(500).json({ err });
  }
};

module.exports = {
  runCode,
};
