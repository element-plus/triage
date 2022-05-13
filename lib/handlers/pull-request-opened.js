const {
  checkCollaborator,
  listContributors,
} = require('../helpers');
const { ensureList } = require('../utils');

module.exports = handlePullRequestOpened

/**
 * Add label to the pull request when first time contribution detected
 * @param {import('probot').Probot} app
 */
function handlePullRequestOpened(app) {
  app.on('pull_request.opened', async (context) => {

    const actor = context.payload.pull_request.user.login

    if (await checkCollaborator(context, actor)) {
      return;
    }

    // const config: TriageConfig
    const {
      firstTimeGreetings = '',
      firstTimeLabels = '',
      guideline_url = '',
      coc_url = '',
      greetings,
    } = await context.config('triage.yml', {})

    const contributors = await listContributors(context)

    const contributor = contributors.find(
      (contributor) => contributor.login === actor
    )

    const meta = context.repo();
    meta.issue_number = context.issue().issue_number;

    const greetingReplacer = (msg) => {
      return msg.replace(/\{user\}/g, actor)
        .replace(/\{repo\}/g, meta.repo)
        .replace(/\{guideline_url\}/, guideline_url || `https://github.com/${meta.owner}/${meta.repo}/GUIDELINE.md`)
        .replace(/\{coc_url\}/g, coc_url || `https://github.com/${meta.owner}/${meta.repo}/CODE_OF_CONDUCT.md`)
    }

    if (contributor) {
      if (greetings) {
        context.octokit.issues.createComment({
          ...meta,
          body: greetingReplacer(greetings),
        })
      }

    } else {

      if (firstTimeLabels) {
        context.octokit.issues.addLabels({
          ...meta,
          labels: ensureList(firstTimeLabels),
        })

      }

      if (firstTimeGreetings) {
        context.octokit.issues.createComment({
          ...meta,
          body: greetingReplacer(firstTimeGreetings),
        })
      }
    }
  })

}
