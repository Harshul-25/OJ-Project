const { exec } = require("child_process");
const path = require("path");

const outputPath = path.join(__dirname, "codes");

// General helper function to remove path prefixes from error lines
const sanitizeErrorOutput = (stderr) => {
  if (!stderr) return "Error (No details)";

  const lines = stderr.split(/\r?\n/); // Split into lines
  const processedLines = lines.map(line => {
    // Simple check: Does the line contain a potential code filename from our structure?
    // Followed by a colon, indicating potentially line/error info.
    const potentialErrorLine = /\/?([^\/]+\.(?:c|cpp|py)):/.test(line);

    if (potentialErrorLine) {
      // Find the last slash (either / or \ for cross-platform attempt)
      const lastSlashIndex = Math.max(line.lastIndexOf('/'), line.lastIndexOf('\\'));
      
      if (lastSlashIndex !== -1) {
        // If a slash exists, return the part *after* it
        return line.substring(lastSlashIndex + 1).trimStart(); 
      } else {
        // No slash found, maybe relative path or already clean? Return as is.
        return line;
      }
    } else {
      // Keep lines that don't look like error source lines (e.g., code snippets, notes)
      return line.trimEnd();
    }
  });

  // Join the processed lines, filtering out potentially empty lines
  return processedLines.filter(line => line).join("\n");
};

const executeCpp = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outpath = path.join(outputPath, `${jobId}.out`);
  return new Promise((resolve, reject) => {
    exec(
      `g++ ${filepath} -o ${outpath} && cd ${outputPath} && ./${jobId}.out < input.txt`,
      (error, stdout, stderr) => {
        if (error) {
           // Use the NEW general sanitizer
           const sanitizedError = sanitizeErrorOutput(stderr);
           reject({ error: sanitizedError }); 
           return; 
        }
        if (stderr) {
           console.warn("C++ Execution produced stderr:", stderr);
           // Decide if non-error stderr should also be sanitized or returned/logged differently
        }
        resolve(stdout);
      }
    );
  });
};

const executePy = (filepath) => {
  const filename = path.basename(filepath);
  return new Promise((resolve, reject) => {
    exec(
      `cd ${outputPath} && python3 ${filepath} < input.txt`, 
      (error, stdout, stderr) => {
        if (error) {
          // Use the NEW general sanitizer
          const sanitizedError = sanitizeErrorOutput(stderr || error.message);
          reject({ error: sanitizedError }); 
          return;
        }
        if (stderr) {
             console.warn(`Python execution (${filename}) produced stderr:`, stderr);
             // Decide if non-error stderr should also be sanitized or returned/logged differently
        }
        resolve(stdout);
      }
    );
  });
};


const executeC = (filepath) => {
  const jobId = path.basename(filepath).split(".")[0];
  const outpath = path.join(outputPath, `${jobId}.out`);
  return new Promise((resolve, reject) => {
    exec(
      `gcc ${filepath} -o ${outpath} && cd ${outputPath} && ./${jobId}.out < input.txt`,
      (error, stdout, stderr) => {
        if (error) {
           // Use the NEW general sanitizer
           const sanitizedError = sanitizeErrorOutput(stderr);
           reject({ error: sanitizedError });
           return;
        }
        if (stderr) {
           console.warn("C Execution produced stderr:", stderr);
           // Decide if non-error stderr should also be sanitized or returned/logged differently
        }
        resolve(stdout);
      }
    );
  });
};

module.exports = { executeCpp, executePy, executeC };
