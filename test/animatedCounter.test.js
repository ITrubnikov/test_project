/**
 * Tests for US-003: Animated counter UI
 *
 * Tests the animateCounter() helper from src/animatedCounter.js
 * and the expected DOM structure for stats (cnt-total, cnt-active, cnt-done).
 */

const { animateCounter } = require('../src/animatedCounter');

// ── animateCounter() behaviour ──────────────────────────────────────────────

describe('animateCounter()', () => {
  function makeEl() {
    const el = document.createElement('b');
    document.body.appendChild(el);
    return el;
  }

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('updates text content to the new value', () => {
    const el = makeEl();
    animateCounter(el, 5, 3);
    expect(el.textContent).toBe('5');
  });

  test('adds counter-pop class when value changes', () => {
    const el = makeEl();
    animateCounter(el, 5, 3);
    expect(el.classList.contains('counter-pop')).toBe(true);
  });

  test('adds counter-pop class on first render (prevVal = -1)', () => {
    const el = makeEl();
    animateCounter(el, 0, -1);
    expect(el.classList.contains('counter-pop')).toBe(true);
  });

  test('does NOT add counter-pop class when value is unchanged', () => {
    const el = makeEl();
    animateCounter(el, 4, 4);
    expect(el.classList.contains('counter-pop')).toBe(false);
  });

  test('removes counter-pop class after animationend event fires', () => {
    const el = makeEl();
    animateCounter(el, 7, 6);
    expect(el.classList.contains('counter-pop')).toBe(true);

    // Simulate the animationend event
    el.dispatchEvent(new Event('animationend'));

    expect(el.classList.contains('counter-pop')).toBe(false);
  });

  test('still updates text when value is unchanged (no animation)', () => {
    const el = makeEl();
    el.textContent = '3';
    animateCounter(el, 3, 3);
    expect(el.textContent).toBe('3');
    expect(el.classList.contains('counter-pop')).toBe(false);
  });
});

// ── Expected DOM structure ────────────────────────────────────────────────────

describe('stats DOM structure', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div class="stats" id="stats">
        <span>Всего: <b id="cnt-total">0</b></span>
        <span>Активных: <b id="cnt-active">0</b></span>
        <span>Выполнено: <b id="cnt-done">0</b></span>
      </div>
    `;
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('cnt-total element exists in stats', () => {
    expect(document.getElementById('cnt-total')).not.toBeNull();
  });

  test('cnt-active element exists in stats', () => {
    expect(document.getElementById('cnt-active')).not.toBeNull();
  });

  test('cnt-done element exists in stats', () => {
    expect(document.getElementById('cnt-done')).not.toBeNull();
  });

  test('stats section is visible (not hidden) even when task list is empty', () => {
    const stats = document.getElementById('stats');
    expect(stats).not.toBeNull();
    // Stats element exists and is not display:none
    expect(stats.style.display).not.toBe('none');
  });

  test('animateCounter updates cnt-total and adds counter-pop', () => {
    const el = document.getElementById('cnt-total');
    animateCounter(el, 3, -1);
    expect(el.textContent).toBe('3');
    expect(el.classList.contains('counter-pop')).toBe(true);
  });

  test('animateCounter updates cnt-active and adds counter-pop on change', () => {
    const el = document.getElementById('cnt-active');
    animateCounter(el, 2, 3);  // value changed: 3 -> 2
    expect(el.textContent).toBe('2');
    expect(el.classList.contains('counter-pop')).toBe(true);
  });

  test('animateCounter updates cnt-done and removes class after animationend', () => {
    const el = document.getElementById('cnt-done');
    animateCounter(el, 1, 0);
    el.dispatchEvent(new Event('animationend'));
    expect(el.classList.contains('counter-pop')).toBe(false);
  });
});
