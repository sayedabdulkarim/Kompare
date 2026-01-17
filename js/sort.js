/* ============================================
   SORT - Alphabetical Sort for JSON
   ============================================ */

// Sort object keys alphabetically at all nested levels
function sortObjectKeys(obj) {
  // Handle null or undefined
  if (obj === null || obj === undefined) {
    return obj;
  }

  // Handle arrays - sort each element if it's an object, but keep array order
  if (Array.isArray(obj)) {
    return obj.map(item => sortObjectKeys(item));
  }

  // Handle objects
  if (typeof obj === 'object') {
    const sortedObj = {};

    // Get all keys and sort them alphabetically
    const sortedKeys = Object.keys(obj).sort((a, b) =>
      a.toLowerCase().localeCompare(b.toLowerCase())
    );

    // Rebuild object with sorted keys
    for (const key of sortedKeys) {
      sortedObj[key] = sortObjectKeys(obj[key]);
    }

    return sortedObj;
  }

  // Return primitive values as-is
  return obj;
}

// Sort both JSONs
function sortBothJSONs(left, right) {
  return {
    left: sortObjectKeys(left),
    right: sortObjectKeys(right)
  };
}
