const fsP = require('fs/promises');

const argv = process.argv;
console.log(argv);

if (argv.length > 3) {
  process.exit(1);
}


async function cat(path) {
  try {
    let contents = await fsP.readFile(`${path}`, "utf8");
    console.log(contents);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

cat(argv[2]);