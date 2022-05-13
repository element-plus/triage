const listContributors = require('../helpers/list-contributors');

module.exports = labelIfFirstTime

/**
 * Add label to the pull request when first time contribution detected
 *
 * @param {import('probot').Context<'pull_request'>} context
 */
async function labelIfFirstTime(context) {
  const contributors = await listContributors(context)
  const pr_issuer = context.payload.pull_request.user.login

  const assertion = contributors.some(
    (contributor) => contributor.login === pr_issuer
  )

  if (assertion) {
    context.octokit.issues.addLabels({
      ...context.repo(),
      issue_number: context.issue().issue_number,
      labels: ['Contribution::First Time Contribution'],
    })
  }
}
