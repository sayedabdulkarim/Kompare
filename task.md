# Kompare - JSON Comparison Tool

> A web app to compare two JSONs and sort keys alphabetically at all nested levels

---

## Features

### 1. JSON Comparison
- Side by side comparison
- Highlight differences:
  - **Green** = Added
  - **Red** = Removed
  - **Yellow** = Changed

### 2. Alphabetical Sort
- Sort all keys alphabetically
- Works on all nested levels
- Preserves arrays order (only sorts object keys)

### 3. UI Features
- Two text areas (Left & Right JSON)
- Format/Beautify JSON
- Minify JSON
- Copy to clipboard
- Clear buttons
- Swap JSONs
- Dark/Light mode

---

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Vanilla JS (No dependencies) |
| Styling | CSS3 |
| Hosting | GitHub Pages (FREE) |

---

## Folder Structure

```
Kompare/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── app.js           # Main app logic
│   ├── diff.js          # Diff algorithm
│   ├── sort.js          # Alphabetical sort
│   └── utils.js         # Utility functions
├── task.md
└── README.md
```

---

## Implementation Steps

### Phase 1: Setup
- [x] Create folder structure
- [x] Create index.html with basic layout
- [x] Create CSS styling
- [x] Create JS files structure

### Phase 2: Core Features
- [x] JSON validation
- [x] JSON beautify/format
- [x] JSON minify
- [x] Alphabetical sort (nested)

### Phase 3: Comparison
- [x] Deep diff algorithm
- [x] Highlight differences
- [x] Side by side view
- [x] Line by line diff

### Phase 4: UI Polish
- [x] Dark/Light mode
- [x] Copy buttons
- [x] Swap JSONs
- [x] Error handling
- [x] Responsive design

### Phase 5: Deploy
- [ ] Test all features
- [ ] GitHub repo create
- [ ] Deploy to GitHub Pages

---

## UI Layout

```
┌─────────────────────────────────────────────────────────────┐
│                        KOMPARE                               │
│                  JSON Comparison Tool                        │
├─────────────────────────────────────────────────────────────┤
│  [Sort A-Z] [Format] [Minify] [Compare] [Swap] [Clear All]  │
├────────────────────────┬────────────────────────────────────┤
│     Original JSON      │        Modified JSON               │
│  ┌──────────────────┐  │  ┌──────────────────────────────┐  │
│  │                  │  │  │                              │  │
│  │   textarea       │  │  │      textarea                │  │
│  │                  │  │  │                              │  │
│  └──────────────────┘  │  └──────────────────────────────┘  │
│  [Copy] [Clear]        │  [Copy] [Clear]                    │
├────────────────────────┴────────────────────────────────────┤
│                     DIFF RESULT                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Line 1:  "name": "John"  →  "name": "Jane"          │   │
│  │  Line 2:  + "age": 25     (added)                    │   │
│  │  Line 3:  - "city": "NYC" (removed)                  │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## Alphabetical Sort Example

**Before:**
```json
{
  "zebra": 1,
  "apple": {
    "mango": 2,
    "banana": {
      "zeta": 3,
      "alpha": 4
    }
  }
}
```

**After:**
```json
{
  "apple": {
    "banana": {
      "alpha": 4,
      "zeta": 3
    },
    "mango": 2
  },
  "zebra": 1
}
```

---

## Color Scheme

```css
/* Diff Colors */
--added: #d4edda;      /* Light green */
--removed: #f8d7da;    /* Light red */
--changed: #fff3cd;    /* Light yellow */

/* Dark Mode */
--bg-dark: #1e1e1e;
--text-dark: #d4d4d4;

/* Light Mode */
--bg-light: #ffffff;
--text-light: #333333;
```

---

**Created by: Sayed Abdul Karim**
