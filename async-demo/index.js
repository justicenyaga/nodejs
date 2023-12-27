console.log("Before");

// CALLBACK APPROACH
// getUser(1, (user) => {
//   getRepos(user.githubUsername, (repos) => {
//     getCommits(repos.repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });

// PROMISE APPROACH
// getUser(1)
//   .then((user) => getRepos(user.githubUsername))
//   .then((repos) => getCommits(repos.repos[0]))
//   .then((commits) => console.log(commits))
//   .catch((error) => console.log("Error: ", error.message));

// ASYNC and AWAIT APPROACH
async function displayCommits() {
  try {
    const user = await getUser(1);
    const repos = await getRepos(user.githubUsername);
    const commits = await getCommits(repos.repos[0]);
    console.log(commits);
  } catch (error) {
    console.log(error.message);
  }
}
displayCommits();

console.log("After");

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading a user from the database...");
      resolve({ id, githubUsername: "justice" });
    }, 2000);
  });
}

function getRepos(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Calling Github API...");
      resolve({ username, repos: ["repo1", "repo2"] });
      // reject(new Error("Could not fetch the repos"));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading the list of commits from Github...");
      resolve({ repo, commits: ["commit1", "commit2"] });
    }, 2000);
  });
}
