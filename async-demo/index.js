console.log("Before");

getUser(1, (user) => {
  getRepos(user.githubUsername, (repos) => {
    console.log(repos);
  });
});

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
