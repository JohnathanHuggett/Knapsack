const fs = require("fs");

// create way to read txt file
// this removes the first two args that we do not need
const argValue = process.argv.slice(2);
// console.log(argValue);

// error checker to make sure the correct number of params are being passed in if not exit
if (argValue.length !== 2) {
    console.error("usage: [filename] [capacity]");
    process.exit(1);
}

// argument variables
const filename = argValue[0];
const capacity = argValue[1];

// this will read the file that is passed into this file
const fileData = fs.readFileSync(filename, "utf8");
// console.log("===", fileData);

// breaks data at eacd line break and trims whitespace
// returns data in array with each line representing an index
const lines = fileData.trim().split(/[\r\n]+/g);
// console.log("++", lines);

const items = [];
// process the lines in the structure that we need them to be in
// iterate through and parse each line
for (let l of lines) {
    // destructors the array to split into different values that are needed
    // split each line @ the spaces and map through
    const [index, size, value] = l.split(" ").map(n => parseInt(n));
    // console.log(index, size, value);

    items[index] = {
        index,
        size,
        value,
    };
}

// take off index 0 since we indexed @ 1
items.shift();
// console.log(items);

module.exports = { items, capacity };
