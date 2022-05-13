module.exports = ensureList

/**
 * Check if the given value is an array, convert it if not.
 *
 * @param {unknown} val
 * @returns {Array<typeof val>}
 */
function ensureList(val) {
  return Array.isArray(val) ? val : [val];
}
