const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

exports.commit = async (path, content, message = 'chore: update by admin') => {
  const [owner, repo] = process.env.REPO.split('/');
  const { data } = await octokit.repos.getContent({ owner, repo, path });
  await octokit.repos.createOrUpdateFileContents({
    owner, repo, path, message,
    content: Buffer.from(content).toString('base64'),
    sha: data.sha,
  });
};