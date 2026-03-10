/**
 * animatedCounter.js — animated counter helper module
 *
 * Provides a function to update a counter element and trigger a CSS animation
 * when the value changes.
 */

/**
 * Update a counter element's text content and trigger a pop animation if the
 * value changed from its previous value.
 *
 * @param {HTMLElement} el       - The <b> element to update
 * @param {number}      newVal  - The new counter value
 * @param {number}      prevVal - The previous counter value (use -1 to always animate)
 */
function animateCounter(el, newVal, prevVal) {
  el.textContent = newVal;
  if (newVal !== prevVal) {
    el.classList.remove('counter-pop');
    // Force reflow so removing+re-adding the class restarts the animation
    void el.offsetWidth;
    el.classList.add('counter-pop');
    el.addEventListener('animationend', () => el.classList.remove('counter-pop'), { once: true });
  }
}

// Support both CommonJS (Jest/Node) and browser (script tag) environments
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { animateCounter };
}
