# Phase 06: Document Viewer - Manual Verification Tests

## Test Environment Setup

**Prerequisites:**
- Backend running with sample documents
- At least 3 documents of varying lengths (short: <5k words, medium: 5-20k words, long: >50k words)
- Documents with sections/chapters
- Test devices: Mobile (iPhone/Android), Tablet (iPad), Desktop

---

## 1. Document Loading Tests

### Test 1.1: Basic Document Load
**Steps:**
1. Navigate to `/documents/[id]` for a medium-length document
2. Observe loading state
3. Wait for content to appear

**Expected Results:**
- Loading skeleton appears immediately
- Document title visible in loading state
- Content renders within 2 seconds
- No layout shift during loading
- Typography is readable at default size

**Pass Criteria:** ✓ All expected results observed

---

### Test 1.2: Long Document Performance
**Steps:**
1. Navigate to a document with >50k words
2. Measure time to interactive
3. Scroll through entire document
4. Monitor frame rate

**Expected Results:**
- Time to Interactive < 3 seconds
- Scroll performance > 55fps
- No browser freezing or lag
- Memory usage stable (<200MB)

**Pass Criteria:** ✓ Performance metrics met

---

### Test 1.3: Document Not Found
**Steps:**
1. Navigate to `/documents/non-existent-id`

**Expected Results:**
- 404 page displays
- Message: "Document not found"
- Link to browse topics or homepage
- Proper HTTP 404 status code

**Pass Criteria:** ✓ 404 handling correct

---

## 2. Typography and Reading Experience

### Test 2.1: Font Size Adjustment
**Steps:**
1. Open any document
2. Click font size control
3. Select "Small"
4. Select "Medium" 
5. Select "Large"

**Expected Results:**
- Text size changes immediately
- Small: noticeably smaller than default
- Large: comfortably readable for visually impaired
- Line spacing adjusts proportionally
- No text overflow or clipping

**Pass Criteria:** ✓ All 3 sizes functional and readable

---

### Test 2.2: Reading Theme Toggle
**Steps:**
1. Open document in daylight conditions
2. Switch to Light theme
3. Switch to Sepia theme
4. Switch to Dark theme
5. Verify each theme

**Expected Results:**
- Light: White background, dark text
- Sepia: Cream background (#f4ecd8), brown text
- Dark: Dark background, light text
- Transitions are smooth
- All text remains readable in each theme

**Pass Criteria:** ✓ All 3 themes working correctly

---

### Test 2.3: Text Rendering Quality
**Steps:**
1. Open document with formatted text (bold, italic, quotes)
2. Check heading hierarchy
3. Verify paragraph spacing
4. Check list rendering

**Expected Results:**
- Headings (H1-H6) properly sized and weighted
- Bold and italic text renders correctly
- Blockquotes indented and styled
- Lists have proper bullets/numbers
- Paragraphs have adequate spacing

**Pass Criteria:** ✓ Typography professional and readable

---

## 3. Navigation and Table of Contents

### Test 3.1: TOC Display
**Steps:**
1. Open document with 5+ sections
2. Verify TOC appears in sidebar (desktop)
3. Check section titles match document

**Expected Results:**
- TOC visible on desktop by default
- All sections listed
- Hierarchy indicated by indentation
- Section numbers/titles accurate

**Pass Criteria:** ✓ TOC displays correctly

---

### Test 3.2: TOC Navigation
**Steps:**
1. Click on a section in TOC (middle of document)
2. Observe scroll behavior
3. Click another section
4. Return to top via TOC

**Expected Results:**
- Smooth scroll to section
- Section heading aligns near top of viewport
- Active section highlighted in TOC
- No overshooting or undershooting

**Pass Criteria:** ✓ Navigation smooth and accurate

---

### Test 3.3: Mobile TOC Behavior
**Steps:**
1. Open document on mobile device (<768px)
2. Look for TOC toggle button
3. Tap to open TOC
4. Select a section
5. Close TOC

**Expected Results:**
- TOC hidden by default on mobile
- Toggle button visible in header
- TOC opens in drawer/modal overlay
- Section selection closes drawer and scrolls
- Overlay dismissible by tapping outside

**Pass Criteria:** ✓ Mobile TOC usable

---

### Test 3.4: Keyboard Navigation
**Steps:**
1. Open document on desktop
2. Press Tab repeatedly
3. Navigate through TOC with arrow keys
4. Press Enter on a section

**Expected Results:**
- Focus moves logically through interactive elements
- Focus indicators visible on all elements
- Arrow keys navigate within TOC
- Enter activates focused section
- No keyboard traps

**Pass Criteria:** ✓ Full keyboard navigation works

---

## 4. Scroll Position Persistence

### Test 4.1: Scroll Position Save
**Steps:**
1. Open document
2. Scroll to middle of document
3. Note position (e.g., section 3)
4. Refresh page
5. Observe scroll position

**Expected Results:**
- Page restores to previous scroll position
- Same section visible after refresh
- Restoration happens within 1 second
- No jarring jump

**Pass Criteria:** ✓ Position persists across refresh

---

### Test 4.2: Multiple Documents
**Steps:**
1. Open Document A, scroll to 50%
2. Navigate to Document B, scroll to 75%
3. Return to Document A
4. Return to Document B

**Expected Results:**
- Document A restores to ~50%
- Document B restores to ~75%
- Each document maintains independent position
- Positions saved in localStorage

**Pass Criteria:** ✓ Multiple documents tracked separately

---

### Test 4.3: Direct Section Link
**Steps:**
1. Navigate to `/documents/[id]?section=chapter-3`
2. Observe initial scroll position

**Expected Results:**
- Page loads with chapter-3 at top
- Overrides saved scroll position
- Section highlighted in TOC
- URL parameter respected

**Pass Criteria:** ✓ Direct section links work

---

## 5. Metadata and Information Display

### Test 5.1: Metadata Sidebar
**Steps:**
1. Open document with full metadata
2. Review sidebar information

**Expected Results:**
- Authors listed with badges
- Collection name displayed
- Topics/tags shown
- Word count accurate
- Reading time estimate shown
- Publication date formatted correctly
- Version number if applicable

**Pass Criteria:** ✓ All metadata displayed accurately

---

### Test 5.2: Mobile Metadata
**Steps:**
1. Open document on mobile
2. Look for metadata display

**Expected Results:**
- Metadata accessible (accordion or separate tab)
- Information complete but compact
- Readable on small screen
- Expandable/collapsible

**Pass Criteria:** ✓ Mobile metadata accessible

---

## 6. Citation Tools

### Test 6.1: APA Citation Copy
**Steps:**
1. Open document
2. Click citation tool (quote icon)
3. Select "Copy APA"
4. Paste into text editor

**Expected Results:**
- Toast notification: "APA citation copied!"
- Clipboard contains properly formatted APA citation
- Format: `Author(s). (Year). Title. Sijil Digital Library.`

**Pass Criteria:** ✓ APA citation copies correctly

---

### Test 6.2: MLA Citation Copy
**Steps:**
1. Click citation tool
2. Select "Copy MLA"
3. Paste into text editor

**Expected Results:**
- Toast notification appears
- Clipboard contains MLA format
- Format: `Author(s). "Title." Sijil Digital Library, Year.`

**Pass Criteria:** ✓ MLA citation copies correctly

---

### Test 6.3: Chicago Citation Copy
**Steps:**
1. Click citation tool
2. Select "Copy Chicago"
3. Paste into text editor

**Expected Results:**
- Toast notification appears
- Clipboard contains Chicago format
- Correct formatting applied

**Pass Criteria:** ✓ Chicago citation copies correctly

---

## 7. Reading Progress Indicator

### Test 7.1: Progress Bar Visibility
**Steps:**
1. Open document
2. Look at top of viewport
3. Scroll through document

**Expected Results:**
- Thin progress bar visible at top
- Bar fills as user scrolls
- 0% at top, 100% at bottom
- Smooth animation
- Color contrasts with background

**Pass Criteria:** ✓ Progress bar functions correctly

---

### Test 7.2: Progress Accuracy
**Steps:**
1. Open document
2. Scroll to estimated 25%, 50%, 75%
3. Compare with progress bar

**Expected Results:**
- Progress matches approximate scroll position
- Accurate within ±5%
- Updates in real-time

**Pass Criteria:** ✓ Progress indicator accurate

---

## 8. Responsive Design Tests

### Test 8.1: Mobile Layout (< 768px)
**Steps:**
1. Resize browser to 375px width (iPhone)
2. Review entire document interface

**Expected Results:**
- Single column layout
- Text readable without horizontal scroll
- Header controls accessible
- TOC in drawer
- Metadata collapsible
- Touch targets ≥ 44px
- Adequate padding/margins

**Pass Criteria:** ✓ Mobile layout fully functional

---

### Test 8.2: Tablet Layout (768px - 1024px)
**Steps:**
1. Resize browser to 834px (iPad portrait)
2. Review layout

**Expected Results:**
- Two-column layout (content + sidebar)
- TOC visible in sidebar
- Metadata displayed
- Comfortable reading width
- Controls accessible

**Pass Criteria:** ✓ Tablet layout optimized

---

### Test 8.3: Desktop Layout (> 1024px)
**Steps:**
1. Use 1920px width display
2. Review layout

**Expected Results:**
- Three-column or wide two-column layout
- Maximum text width ~70 characters
- Sidebar with TOC and metadata
- Ample whitespace
- Professional appearance

**Pass Criteria:** ✓ Desktop layout professional

---

## 9. Accessibility Tests

### Test 9.1: Screen Reader Compatibility
**Steps:**
1. Enable VoiceOver (Mac) or NVDA (Windows)
2. Navigate through document
3. Listen to announcements

**Expected Results:**
- Document title announced
- Sections announced with heading levels
- Interactive elements described
- Progress bar value announced
- No confusing or missing announcements

**Pass Criteria:** ✓ Screen reader experience good

---

### Test 9.2: Skip Links
**Steps:**
1. Open document
2. Press Tab once

**Expected Results:**
- "Skip to main content" link appears
- Activating link jumps to article content
- Bypasses navigation and controls

**Pass Criteria:** ✓ Skip links functional

---

### Test 9.3: Color Contrast
**Steps:**
1. Use contrast checker tool
2. Test text on all three themes
3. Test interactive elements

**Expected Results:**
- Normal text: contrast ratio ≥ 4.5:1
- Large text: contrast ratio ≥ 3:1
- UI elements: contrast ratio ≥ 3:1
- All themes pass WCAG AA

**Pass Criteria:** ✓ Contrast ratios compliant

---

### Test 9.4: Focus Indicators
**Steps:**
1. Navigate with Tab key
2. Observe focus on each element

**Expected Results:**
- Visible focus ring on all interactive elements
- Focus ring has sufficient contrast
- Focus never lost or hidden
- Clear indication of current focus

**Pass Criteria:** ✓ Focus management correct

---

## 10. Print Functionality

### Test 10.1: Print Preview
**Steps:**
1. Open document
2. Press Ctrl/Cmd + P
3. Review print preview

**Expected Results:**
- Header/footer/navigation hidden
- Only article content prints
- Text size appropriate for print (~12pt)
- Page breaks avoid splitting sections
- Background colors removed (save ink)
- URLs not printed (clean output)

**Pass Criteria:** ✓ Print layout clean and usable

---

## 11. Error Handling

### Test 11.1: API Failure Recovery
**Steps:**
1. Stop backend server
2. Try to load document
3. Observe error state
4. Restart backend
5. Click "Try Again"

**Expected Results:**
- Error message displayed clearly
- "Try Again" button visible
- Retry successfully loads document
- No infinite loading spinner

**Pass Criteria:** ✓ Error recovery works

---

### Test 11.2: Network Interruption
**Steps:**
1. Start loading document
2. Disconnect network mid-load
3. Observe behavior
4. Reconnect network
5. Retry

**Expected Results:**
- Error message indicates network issue
- Offline banner appears (if implemented)
- Cached content shown if available
- Retry works after reconnection

**Pass Criteria:** ✓ Network errors handled gracefully

---

## 12. Edge Cases

### Test 12.1: Empty Document
**Steps:**
1. Load document with no content

**Expected Results:**
- Graceful empty state
- Message: "No content available"
- No broken layout

**Pass Criteria:** ✓ Empty state handled

---

### Test 12.2: Very Long Section Titles
**Steps:**
1. Load document with section title > 100 characters
2. Check TOC display

**Expected Results:**
- Title truncates elegantly with ellipsis
- Full title visible on hover (tooltip)
- Layout not broken

**Pass Criteria:** ✓ Long titles handled

---

### Test 12.3: Special Characters in Content
**Steps:**
1. Load document with Arabic, RTL text, emojis, math symbols
2. Verify rendering

**Expected Results:**
- All characters display correctly
- RTL text properly aligned if applicable
- No encoding issues

**Pass Criteria:** ✓ Special characters render correctly

---

### Test 12.4: Rapid Theme/Font Changes
**Steps:**
1. Rapidly toggle between themes 10 times
2. Rapidly change font sizes

**Expected Results:**
- No flickering or visual glitches
- Final state matches last selection
- No performance degradation

**Pass Criteria:** ✓ Rapid changes handled smoothly

---

## Browser Compatibility Matrix

Test on these browsers minimum:

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ☐ Pass / ☐ Fail |
| Firefox | Latest | ☐ Pass / ☐ Fail |
| Safari | Latest | ☐ Pass / ☐ Fail |
| Edge | Latest | ☐ Pass / ☐ Fail |
| Safari iOS | Latest | ☐ Pass / ☐ Fail |
| Chrome Android | Latest | ☐ Pass / ☐ Fail |

---

## Regression Test Checklist

After any update, re-run these critical tests:

☐ Document loads correctly
☐ Font size adjustment works
☐ Theme toggle functional
☐ TOC navigation smooth
☐ Scroll position persists
☐ Citations copy correctly
☐ Mobile layout usable
☐ Keyboard navigation complete
☐ Screen reader compatible
☐ Print layout clean

---

## Sign-Off

**Tester Name:** _________________
**Date:** _________________
**All Tests Passed:** ☐ Yes / ☐ No
**Notes:** ___________________________________
