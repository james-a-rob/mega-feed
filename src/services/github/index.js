const handleCommit = (payload) => {
  return `new commit by ${payload.pusher.name} to the ${payload.repository.name} repo with message ${payload.commits[0].message}`;
};

const parser = (payload) => {
  if (payload.commits) {
    return handleCommit(payload);
  }
  return "";
};

module.exports = {
  parser,
};
