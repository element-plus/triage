const { autoAssign } = require('../helpers');
const { ensureList } = require('../utils');

/**
 * Add label to the pull request when first time contribution detected
 * @param {import('probot').Context<'pull_request.opened'> } context
 * @param {TriageConfig} config
 */
async function autoAssignPRAssignees(context, config) {
  if (config.autoAssignWhenPRCreated) {
    const actor = context.payload.pull_request.user.login;
    const assignees = [actor, ...ensureList(config.PRAutoAssignees)];

    context.log.info('Assigning to:', assignees);
    await autoAssign(context, assignees)
  }
}

module.exports = { autoAssignPRAssignees }
