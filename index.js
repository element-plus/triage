
const labelIfFirstTime = require('./lib/actions/label-if-first-time');

module.exports = triage;
/**
 * Redirect `GET /` to `/stats`, pass `POST /` to Probot's middleware
 *
 * @param {import('probot').Probot} robot
 */
function triage(robot) {
  robot.on(
    ['pull_request.opened', 'pull_request.edited', 'pull_request.synchronize'],
    (context) => {

      context.log.debug(context.id);

      labelIfFirstTime(context);
    }
  )
}
