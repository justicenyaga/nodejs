// A promise has 3 states, - Pending, Resolved or Rejected
// On creating a promise, the state is set to Pending. The promise is supposed to execute some
// async code from which it can either run successfully to a resolved state, or face an issue
// leading to a rejected state.

const p = new Promise((resolve, reject) => {
  // Kicking off some async work
  setTimeout(() => {
    resolve(1); // Pending => Resolved/Fulfilled
    reject(new Error("The error message")); // Pending => Rejected
  }, 2000);
});

p.then((result) => console.log("Result: ", result)).catch((err) =>
  console.log("Error: ", err.message)
);
