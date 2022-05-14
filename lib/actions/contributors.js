const {
  checkCollaborator,
  listContributors,
} = require('../helpers');
const { ensureList } = require('../utils');

module.exports = contributors
/**
 * Add label to the pull request when first time contribution detected
 * @param {import('probot').Context<'pull_request.opened'> } context
 * @param {TriageConfig} config
 */
async function contributors(context, config) {
  const actor = context.payload.pull_request.user.login

  if (config.skipCollaboratorCheck !== true && await checkCollaborator(context, actor)) {
    return;
  }

  const {
    firstTimePRGreetings = '',
    firstTimePRLabels = '',
    PRGreetings = '',
    COCUrl = '',
    guidelineUrl = '',
  } = config

  const contributors = await listContributors(context)

  const contributor = contributors.find(
    (contributor) => contributor.login === actor
  )

  const { repo, owner } = context.repo();

  const greetingReplacer = (msg) => {
    return msg.replace(/\{user\}/g, actor)
      .replace(/\{repo\}/g, repo)
      .replace(/\{guidelineUrl\}/, guidelineUrl || `https://github.com/${owner}/${repo}/README.md`)
      .replace(/\{COCUrl\}/g, COCUrl || `https://github.com/${owner}/${repo}/CODE_OF_CONDUCT.md`)
  }

  let labelsToAdd = ensureList(config.labelsWhenPROpened || [])

  if (contributor) {
    if (PRGreetings) {
      await context.octokit.issues.createComment(context.issue({ body: greetingReplacer(PRGreetings) }))
    }
  } else {
    if (firstTimePRLabels) {
      labelsToAdd = [...labelsToAdd, ...ensureList(firstTimePRLabels)]
    }

    if (firstTimePRGreetings) {
      await context.octokit.issues.createComment(context.issue({
        body: greetingReplacer(firstTimePRGreetings)
      }))
    }
  }

  await context.octokit.issues.addLabels(context.issue({
    labels: labelsToAdd,
  }))
}
