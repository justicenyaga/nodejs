const fs = require("fs");

// const files = fs.readdirSync("./");
// console.log(files);

// fs.readdir("$", function (error, result) {
//   if (error) console.log(error);
//   else console.log("Result: ", result);
// });

fs.readdir("./", function (error, result) {
  if (error) console.log(error);
  else console.log("Result: ", result);
});
