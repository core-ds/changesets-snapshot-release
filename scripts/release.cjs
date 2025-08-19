// @ts-check

// copied from https://github.com/changesets/action/blob/04d574e831923498156e0b2b93152878063203a3/scripts/release.ts

const { version } = require("../package.json");
const { exec, getExecOutput } = require("@actions/exec");

async function main() {
  const tag = `v${version}`;

  const { exitCode, stderr } = await getExecOutput(
    `git`,
    ["ls-remote", "--exit-code", "origin", "--tags", `refs/tags/${tag}`],
    { ignoreReturnCode: true }
  );
  if (exitCode === 0) {
    console.log(`Action is not being published because version ${tag} is already published`);
    return;
  }
  /**
   * Exit with status "2" when no matching refs are found in the remote repository.
   * @see https://git-scm.com/docs/git-ls-remote#Documentation/git-ls-remote.txt---exit-code
   */
  if (exitCode !== 2) {
    throw new Error(`git ls-remote exited with ${exitCode.toString()}:\n${stderr}`);
  }

  await exec("git", ["checkout", "--detach"]);
  await exec("git", ["add", "--force", "dist"]);
  await exec("git", ["commit", "-m", `publish: v${version}`]);

  await exec("changeset", ["tag"]);

  const [major] = version.split(".");
  const branch = `v${major}`;

  await exec("git", ["push", "--force", "--follow-tags", "origin", `HEAD:refs/heads/${branch}`]);
}

void main();
