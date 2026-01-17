/* ============================================
   APP - Main Application Logic
   ============================================ */

// DOM Elements
const leftJson = document.getElementById('leftJson');
const rightJson = document.getElementById('rightJson');
const leftError = document.getElementById('leftError');
const rightError = document.getElementById('rightError');
const diffResult = document.getElementById('diffResult');
const diffStats = document.getElementById('diffStats');

// Buttons
const sortBtn = document.getElementById('sortBtn');
const formatBtn = document.getElementById('formatBtn');
const minifyBtn = document.getElementById('minifyBtn');
const compareBtn = document.getElementById('compareBtn');
const swapBtn = document.getElementById('swapBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const themeToggle = document.getElementById('themeToggle');

// Initialize theme
function initTheme() {
  const savedTheme = localStorage.getItem('kompare-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
}

// Toggle theme
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('kompare-theme', next);
}

// Clear error messages
function clearErrors() {
  leftError.textContent = '';
  rightError.textContent = '';
}

// Validate and parse JSON
function validateJSON(textarea, errorEl) {
  const value = textarea.value.trim();
  if (!value) {
    errorEl.textContent = '';
    return { valid: false, data: null, empty: true };
  }

  const result = parseJSON(value);
  if (result.error) {
    errorEl.textContent = 'Invalid JSON: ' + result.error;
    return { valid: false, data: null, empty: false };
  }

  errorEl.textContent = '';
  return { valid: true, data: result.data, empty: false };
}

// Sort A-Z handler
function handleSort() {
  clearErrors();

  const left = validateJSON(leftJson, leftError);
  const right = validateJSON(rightJson, rightError);

  if (left.valid) {
    const sorted = sortObjectKeys(left.data);
    leftJson.value = formatJSON(sorted);
  }

  if (right.valid) {
    const sorted = sortObjectKeys(right.data);
    rightJson.value = formatJSON(sorted);
  }

  if (left.valid || right.valid) {
    showToast('Sorted alphabetically!', 'success');
  }
}

// Format handler
function handleFormat() {
  clearErrors();

  const left = validateJSON(leftJson, leftError);
  const right = validateJSON(rightJson, rightError);

  if (left.valid) {
    leftJson.value = formatJSON(left.data);
  }

  if (right.valid) {
    rightJson.value = formatJSON(right.data);
  }

  if (left.valid || right.valid) {
    showToast('Formatted!', 'success');
  }
}

// Minify handler
function handleMinify() {
  clearErrors();

  const left = validateJSON(leftJson, leftError);
  const right = validateJSON(rightJson, rightError);

  if (left.valid) {
    leftJson.value = minifyJSON(left.data);
  }

  if (right.valid) {
    rightJson.value = minifyJSON(right.data);
  }

  if (left.valid || right.valid) {
    showToast('Minified!', 'success');
  }
}

// Compare handler
function handleCompare() {
  clearErrors();

  const left = validateJSON(leftJson, leftError);
  const right = validateJSON(rightJson, rightError);

  if (!left.valid || !right.valid) {
    if (left.empty && right.empty) {
      showToast('Please enter JSON in both panels', 'warning');
    }
    return;
  }

  // Perform comparison
  const diffs = compareJSON(left.data, right.data);
  const stats = getDiffStats(diffs);

  // Update stats
  diffStats.innerHTML = `
    <span class="stat-added">+${stats.added} added</span>
    <span class="stat-removed">-${stats.removed} removed</span>
    <span class="stat-changed">~${stats.changed} changed</span>
  `;

  // Render diffs
  diffResult.innerHTML = renderDiffs(diffs);

  showToast(`Found ${diffs.length} difference(s)`, 'success');
}

// Swap handler
function handleSwap() {
  const temp = leftJson.value;
  leftJson.value = rightJson.value;
  rightJson.value = temp;

  // Also swap errors
  const tempError = leftError.textContent;
  leftError.textContent = rightError.textContent;
  rightError.textContent = tempError;

  showToast('Swapped!', 'success');
}

// Clear all handler
function handleClearAll() {
  leftJson.value = '';
  rightJson.value = '';
  clearErrors();
  diffResult.innerHTML = '<p class="placeholder-text">Click "Compare" to see differences</p>';
  diffStats.innerHTML = '';
  showToast('Cleared!', 'success');
}

// Copy handler
function handleCopy(target) {
  const textarea = target === 'left' ? leftJson : rightJson;
  const value = textarea.value.trim();

  if (!value) {
    showToast('Nothing to copy!');
    return;
  }

  copyToClipboard(value).then(success => {
    if (success) {
      showToast('Copied to clipboard!', 'success');
    } else {
      showToast('Failed to copy');
    }
  });
}

// Clear single panel handler
function handleClear(target) {
  const textarea = target === 'left' ? leftJson : rightJson;
  const errorEl = target === 'left' ? leftError : rightError;

  textarea.value = '';
  errorEl.textContent = '';
  showToast('Cleared!', 'success');
}

// Event Listeners
sortBtn.addEventListener('click', handleSort);
formatBtn.addEventListener('click', handleFormat);
minifyBtn.addEventListener('click', handleMinify);
compareBtn.addEventListener('click', handleCompare);
swapBtn.addEventListener('click', handleSwap);
clearAllBtn.addEventListener('click', handleClearAll);
themeToggle.addEventListener('click', toggleTheme);

// Editor action buttons (copy, clear)
document.querySelectorAll('[data-action]').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.getAttribute('data-action');
    const target = btn.getAttribute('data-target');

    if (action === 'copy') handleCopy(target);
    if (action === 'clear') handleClear(target);
  });
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + Enter to compare
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    handleCompare();
  }

  // Ctrl/Cmd + Shift + F to format
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
    e.preventDefault();
    handleFormat();
  }

  // Ctrl/Cmd + Shift + S to sort
  if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
    e.preventDefault();
    handleSort();
  }
});

// Initialize
initTheme();

// Add sample data for testing (remove in production)
// leftJson.value = '{"name":"John","age":30,"city":"NYC"}';
// rightJson.value = '{"name":"Jane","age":30,"country":"USA"}';
