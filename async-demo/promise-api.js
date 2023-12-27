// Creating a resolved promise
const resolved_p = Promise.resolve({ id: 1 });
resolved_p.then((result) => console.log(result));

// Creating a rejected promise
const rejected_p = Promise.reject(new Error("Reason for rejection..."));
rejected_p.catch((error) => console.log("Error: ", error.message));
