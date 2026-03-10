/**
 * counter.js — extracted counter logic module
 *
 * Computes task count statistics from a tasks array.
 * Designed to be testable independently of the DOM.
 */

/**
 * Compute total, active, and done counts from a tasks array.
 * @param {Array<{done: boolean}>} tasks
 * @returns {{ total: number, active: number, done: number }}
 */
function computeCounts(tasks) {
  const total = tasks.length;
  const done = tasks.filter(t => t.done).length;
  const active = total - done;
  return { total, active, done };
}

// Support both CommonJS (Jest/Node) and browser (script tag) environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { computeCounts };
}
