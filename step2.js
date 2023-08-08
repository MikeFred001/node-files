"use strict";


const fsP = require('fs/promises');
const axios = require("axios");
const argv = process.argv;
console.log(argv);

//if too many arguments, exit immediately.

if (argv.length > 3) {
  process.exit(1);
}

/** Reads file of entered path, else print an error. */

async function cat(path) {
  try {
    let contents = await fsP.readFile(`${path}`, "utf8");
    console.log(contents);
  } catch (err) {
    console.log(`Error reading ${path}:`, err);

    process.exit(1);
  }
}


// cat(argv[2]);


/** Takes in a url and if successful, returns content of the URL, if not,
 * display error
 */

async function webCat(path){
  try {
    const response = await axios.get(path);
    console.log(response.data.slice(0, 80));
  } catch (err) {
    console.log(`Error fetching ${path}:`, err.response.statusText);
    process.exit(1);
  }

}


/** Determines whether to run webCat or cat, depending on argv[2]. */

function handleCat(path){
  if (path.slice(0, 4) === 'http'){
    webCat(path)
  } else {
    cat(path)
  }
}

handleCat(argv[2]);

