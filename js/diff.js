/* ============================================
   DIFF - JSON Comparison Algorithm
   ============================================ */

// Compare two JSON objects and return differences
function compareJSON(left, right, path = '') {
  const diffs = [];

  // Get all unique keys from both objects
  const allKeys = new Set([
    ...Object.keys(left || {}),
    ...Object.keys(right || {})
  ]);

  for (const key of allKeys) {
    const currentPath = path ? `${path}.${key}` : key;
    const leftVal = left?.[key];
    const rightVal = right?.[key];

    // Key exists only in left (removed)
    if (leftVal !== undefined && rightVal === undefined) {
      diffs.push({
        type: 'removed',
        path: currentPath,
        leftValue: leftVal,
        rightValue: undefined
      });
      continue;
    }

    // Key exists only in right (added)
    if (leftVal === undefined && rightVal !== undefined) {
      diffs.push({
        type: 'added',
        path: currentPath,
        leftValue: undefined,
        rightValue: rightVal
      });
      continue;
    }

    // Both have the key - check values
    const leftType = getType(leftVal);
    const rightType = getType(rightVal);

    // Different types
    if (leftType !== rightType) {
      diffs.push({
        type: 'changed',
        path: currentPath,
        leftValue: leftVal,
        rightValue: rightVal
      });
      continue;
    }

    // Both are objects - recurse
    if (leftType === 'object') {
      const nestedDiffs = compareJSON(leftVal, rightVal, currentPath);
      diffs.push(...nestedDiffs);
      continue;
    }

    // Both are arrays - compare
    if (leftType === 'array') {
      const arrayDiffs = compareArrays(leftVal, rightVal, currentPath);
      diffs.push(...arrayDiffs);
      continue;
    }

    // Primitive values - direct compare
    if (leftVal !== rightVal) {
      diffs.push({
        type: 'changed',
        path: currentPath,
        leftValue: leftVal,
        rightValue: rightVal
      });
    }
  }

  return diffs;
}

// Compare two arrays
function compareArrays(left, right, path) {
  const diffs = [];
  const maxLen = Math.max(left.length, right.length);

  for (let i = 0; i < maxLen; i++) {
    const currentPath = `${path}[${i}]`;
    const leftVal = left[i];
    const rightVal = right[i];

    // Index only in left
    if (i >= right.length) {
      diffs.push({
        type: 'removed',
        path: currentPath,
        leftValue: leftVal,
        rightValue: undefined
      });
      continue;
    }

    // Index only in right
    if (i >= left.length) {
      diffs.push({
        type: 'added',
        path: currentPath,
        leftValue: undefined,
        rightValue: rightVal
      });
      continue;
    }

    // Both have index - compare values
    const leftType = getType(leftVal);
    const rightType = getType(rightVal);

    if (leftType !== rightType) {
      diffs.push({
        type: 'changed',
        path: currentPath,
        leftValue: leftVal,
        rightValue: rightVal
      });
      continue;
    }

    if (leftType === 'object') {
      const nestedDiffs = compareJSON(leftVal, rightVal, currentPath);
      diffs.push(...nestedDiffs);
      continue;
    }

    if (leftType === 'array') {
      const arrayDiffs = compareArrays(leftVal, rightVal, currentPath);
      diffs.push(...arrayDiffs);
      continue;
    }

    if (leftVal !== rightVal) {
      diffs.push({
        type: 'changed',
        path: currentPath,
        leftValue: leftVal,
        rightValue: rightVal
      });
    }
  }

  return diffs;
}

// Format value for display
function formatValue(val) {
  if (val === undefined) return 'undefined';
  if (val === null) return 'null';
  if (typeof val === 'string') return `"${escapeHTML(val)}"`;
  if (typeof val === 'object') return JSON.stringify(val);
  return String(val);
}

// Render diff results to HTML
function renderDiffs(diffs) {
  if (diffs.length === 0) {
    return `
      <div class="no-diff">
        <div class="no-diff-icon">✓</div>
        <p>No differences found! JSONs are identical.</p>
      </div>
    `;
  }

  let html = '';

  for (const diff of diffs) {
    const leftFormatted = formatValue(diff.leftValue);
    const rightFormatted = formatValue(diff.rightValue);

    if (diff.type === 'added') {
      html += `
        <div class="diff-line added">
          <div class="diff-path">+ ${escapeHTML(diff.path)}</div>
          <div class="diff-value">${rightFormatted}</div>
        </div>
      `;
    } else if (diff.type === 'removed') {
      html += `
        <div class="diff-line removed">
          <div class="diff-path">- ${escapeHTML(diff.path)}</div>
          <div class="diff-value">${leftFormatted}</div>
        </div>
      `;
    } else if (diff.type === 'changed') {
      html += `
        <div class="diff-line changed">
          <div class="diff-path">~ ${escapeHTML(diff.path)}</div>
          <div class="diff-value">
            ${leftFormatted}
            <span class="diff-arrow">→</span>
            ${rightFormatted}
          </div>
        </div>
      `;
    }
  }

  return html;
}

// Get diff statistics
function getDiffStats(diffs) {
  const stats = { added: 0, removed: 0, changed: 0 };

  for (const diff of diffs) {
    stats[diff.type]++;
  }

  return stats;
}
