const { ensureList } = require('../utils')

module.exports = autoAssign

/**
 * List all contributors in the repo.
 *
 * @param {import('probot').Context<'pull_request'>} context
 * @param {string} assignee
 */
async function autoAssign(
  context,
  assignees,
) {
  const { octokit } = context

  const params = context.issue({
    assignees: ensureList(assignees),
  })

  await octokit.issues.addAssignees(params)
}
