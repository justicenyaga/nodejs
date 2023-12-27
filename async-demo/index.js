console.log("Before");
getUser(1, getRepos);
console.log("After");

function getRepos(user) {
  getAPIRepos(user.githubUsername, getCommits);
}

function getCommits(repos) {
  getAPICommits(repos.repos[0], displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from the database...");
    callback({ id, githubUsername: "justice" });
  }, 2000);
}

function getAPIRepos(username, callback) {
  setTimeout(() => {
    console.log("Calling Github API...");
    callback({ username, repos: ["repo1", "repo2"] });
  }, 2000);
}

function getAPICommits(repo, callback) {
  setTimeout(() => {
    console.log("Reading the list of commits from Github...");
    callback({ repo, commits: ["commit1", "commit2"] });
  }, 2000);
}
