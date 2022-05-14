const { autoAssignPRAssignees, contributors } = require('../actions')

module.exports = handlePullRequestOpened

/**
 * Add label to the pull request when first time contribution detected
 * @param {import('probot').Probot} app
 */
function handlePullRequestOpened(app) {
  app.on('pull_request.opened', async (context) => {
    // const config: TriageConfig
    const config = await context.config('triage.yml', {})

    return Promise.all([
      contributors(context, config),
      autoAssignPRAssignees(context, config),
    ])
  })

}
