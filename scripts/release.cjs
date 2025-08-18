// @ts-check

const { version } = require("../package.json");
const { exec } = require("@actions/exec");

async function main() {
  await exec("git", ["checkout", "--detach"]);
  await exec("git", ["add", "--force", "dist"]);
  await exec("git", ["commit", "-m", `publish: v${version}`]);

  // needs to work, git tag itself is not used
  await exec("changeset", ["tag"]);

  const [major] = version.split(".");

  await exec("git", ["push", "--force", "origin", `HEAD:refs/heads/v${major}`]);
}

void main();
