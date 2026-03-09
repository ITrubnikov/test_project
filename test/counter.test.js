/**
 * Smoke test to verify the jest + jsdom test infrastructure works correctly.
 */

describe('Test infrastructure smoke test', () => {
  test('basic arithmetic works', () => {
    expect(1 + 1).toBe(2);
  });

  test('jsdom environment is available', () => {
    // Verify we have access to the DOM (jsdom environment)
    expect(typeof document).toBe('object');
    expect(typeof window).toBe('object');
  });

  test('can create DOM elements', () => {
    const div = document.createElement('div');
    div.textContent = 'Hello, test!';
    document.body.appendChild(div);

    const found = document.querySelector('div');
    expect(found).not.toBeNull();
    expect(found.textContent).toBe('Hello, test!');
  });
});
