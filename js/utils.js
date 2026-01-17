/* ============================================
   UTILS - Utility Functions
   ============================================ */

// Parse JSON safely
function parseJSON(str) {
  try {
    return { data: JSON.parse(str), error: null };
  } catch (e) {
    return { data: null, error: e.message };
  }
}

// Format JSON with indentation
function formatJSON(obj, indent = 2) {
  return JSON.stringify(obj, null, indent);
}

// Minify JSON
function minifyJSON(obj) {
  return JSON.stringify(obj);
}

// Copy to clipboard
async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    return false;
  }
}

// Show toast notification
function showToast(message, type = 'default') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = 'toast show ' + type;

  setTimeout(() => {
    toast.className = 'toast';
  }, 2500);
}

// Check if value is object
function isObject(val) {
  return val !== null && typeof val === 'object' && !Array.isArray(val);
}

// Check if value is array
function isArray(val) {
  return Array.isArray(val);
}

// Deep clone object
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Get type of value
function getType(val) {
  if (val === null) return 'null';
  if (isArray(val)) return 'array';
  return typeof val;
}

// Escape HTML
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
