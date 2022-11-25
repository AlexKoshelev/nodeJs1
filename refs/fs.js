const fs = require("fs/promises");
const path = require("path");
const base = path.join(__dirname, "temp");
fs.mkdir(base)
  .then(() => {
    console.log("folder created");
  })
  .catch((err) => {
    console.log("ere", err);
  });
