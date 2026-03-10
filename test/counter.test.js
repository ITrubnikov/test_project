/**
 * Tests for the computeCounts() module (src/counter.js)
 */

const { computeCounts } = require('../src/counter');

describe('computeCounts()', () => {
  test('returns {total:0, active:0, done:0} for empty array', () => {
    expect(computeCounts([])).toEqual({ total: 0, active: 0, done: 0 });
  });

  test('returns correct counts for all-active tasks', () => {
    const tasks = [
      { id: '1', text: 'Task 1', done: false },
      { id: '2', text: 'Task 2', done: false },
      { id: '3', text: 'Task 3', done: false },
    ];
    expect(computeCounts(tasks)).toEqual({ total: 3, active: 3, done: 0 });
  });

  test('returns correct counts for mixed done/active tasks', () => {
    const tasks = [
      { id: '1', text: 'Task 1', done: false },
      { id: '2', text: 'Task 2', done: false },
      { id: '3', text: 'Task 3', done: true },
    ];
    expect(computeCounts(tasks)).toEqual({ total: 3, active: 2, done: 1 });
  });

  test('returns correct counts for all-done tasks', () => {
    const tasks = [
      { id: '1', text: 'Task 1', done: true },
      { id: '2', text: 'Task 2', done: true },
    ];
    expect(computeCounts(tasks)).toEqual({ total: 2, active: 0, done: 2 });
  });

  test('handles single active task', () => {
    const tasks = [{ id: '1', text: 'Solo', done: false }];
    expect(computeCounts(tasks)).toEqual({ total: 1, active: 1, done: 0 });
  });

  test('handles single done task', () => {
    const tasks = [{ id: '1', text: 'Solo', done: true }];
    expect(computeCounts(tasks)).toEqual({ total: 1, active: 0, done: 1 });
  });
});
