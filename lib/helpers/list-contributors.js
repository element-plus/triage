module.exports = listContributors

/**
 * List all contributors in the repo.
 *
 * @param {import('probot').Context<'pull_request'>} context
 * @param {number} page
 * @param {number} per_page
 */
async function listContributors(
  context,
  page = 1,
  per_page = 100
) {
  const { repo: repoInvoker, octokit } = context
  const { owner, repo } = repoInvoker()

  let { data: contributors } = await octokit.repos.listContributors({
    owner,
    repo,
    per_page,
    page,
  })

  if (contributors.length === per_page) {
    contributors = [
      ...contributors,
      ...(await listContributors(context, page + 1, per_page)),
    ]
  }

  return contributors
}
