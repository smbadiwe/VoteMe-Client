const fs = require("fs");

function createModel(modelName, folder) {
  const CURR_DIR = process.cwd();
  let baseDir = CURR_DIR;
  if (folder) {
    console.log("Changing directory to " + folder);
    process.chdir(folder);
    baseDir = process.cwd();
    console.log("Directory changed. CWD is " + baseDir);
  }
  const newFolder = `${baseDir}/${modelName}`;
  fs.mkdirSync(newFolder);

  // Package.json
  let writePath = `${newFolder}/package.json`;
  let contents = `{
    "name": "${modelName}",
    "version": "0.0.0",
    "private": true,
    "main": "./${modelName}.js"
}`;
  fs.writeFileSync(writePath, contents, "utf8");
  console.log("Package.json created");

  // The main file
  writePath = `${newFolder}/${modelName}.js`;
  contents = `import React, { Component } from "react";
import ${modelName}Service from './${modelName}.service';

export default class ${modelName} extends Component { 
   render() {}
}`;
  fs.writeFileSync(writePath, contents, "utf8");
  console.log(`${modelName}.js created`);

  // The test file
  writePath = `${newFolder}/${modelName}.test.js`;
  contents = `import React from "react";
import ReactDOM from "react-dom";
import ${modelName} from "./${modelName}";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<${modelName} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
`;
  fs.writeFileSync(writePath, contents, "utf8");
  console.log(`${modelName}.test.js created`);

  // The service file
  writePath = `${newFolder}/${modelName}.service.js`;
  contents = `export default class ${modelName}Service { }`;
  fs.writeFileSync(writePath, contents, "utf8");
  console.log(`${modelName}.service.js created`);

  if (folder) {
    console.log("Changing directory back to " + CURR_DIR);
    process.chdir(CURR_DIR);
    console.log("Directory changed. CWD is " + process.cwd());
  }
  console.log("Done");
}

const args = process.argv;
createModel(args[2], args[3]);
