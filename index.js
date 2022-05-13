
const handlePullRequestOpened = require('./lib/handlers/pull-request-opened');

module.exports = triage;
/**
 * Redirect `GET /` to `/stats`, pass `POST /` to Probot's middleware
 *
 * @param {import('probot').Probot} robot
 */
function triage(robot) {
  robot.on(
    ['pull_request.edited', 'pull_request.synchronize'],
    (context) => {
      context.log.debug(context.id);
    }
  )

  handlePullRequestOpened(robot);

}
