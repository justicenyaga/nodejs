//Asynchronous
console.log("Before");
getUser(1, (user) => {
  getRepos(user.githubUsername, (repos) => {
    getCommits(repos[0], (commit) => {
      // CALLBACK HELL
    });
  });
});
console.log("After");

// Synchronouse
console.log("Before");
const user = getUser(1);
const repos = getRepos(user.githubUsername);
const commits = getCommits(repos[0]);
console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from the database...");
    callback({ id, githubUsername: "justice" });
  }, 2000);
}

function getRepos(username, callback) {
  setTimeout(() => {
    console.log("Calling Github API...");
    callback({ username, repos: ["repo1", "repo2"] });
  }, 2000);
}
