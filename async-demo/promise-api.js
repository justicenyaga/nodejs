const p1 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 1...");
    resolve(1);
  }, 3000);
});

const p2 = new Promise((resolve) => {
  setTimeout(() => {
    console.log("Async operation 2...");
    resolve(2);
  }, 2000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async operation 2...");
    reject(new Error("Because something failed"));
  }, 2000);
});

Promise.all([p1, p2]).then((result) => console.log("All resolved: ", result));
Promise.all([p1, p3])
  .then((result) => console.log(result))
  .catch((error) => console.log("At least one error: ", error.message));
Promise.race([p1, p2]).then((result) =>
  console.log("The first to be resolved: ", result)
);
