# Phase 09: Exports - Acceptance Criteria

## Definition of Done

All criteria must be met and verified before Phase 09 is considered complete.

---

## Functional Requirements

### FR-01: Export Trigger Component

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| FR-01-01 | Export button renders on document pages | Button visible in DOM on all document detail pages | ☐ |
| FR-01-02 | Export button renders on topic pages | Button visible in DOM on all topic detail pages | ☐ |
| FR-01-03 | Dropdown shows all formats | PDF, LaTeX, Markdown options present | ☐ |
| FR-01-04 | Button disabled state works | Button disabled when user lacks permission | ☐ |
| FR-01-05 | Click opens export modal | Modal opens within 200ms of click | ☐ |

---

### FR-02: Export Modal

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| FR-02-01 | Modal displays title | Title reads "Export Document" | ☐ |
| FR-02-02 | Format selection works | User can select PDF, LaTeX, or Markdown | ☐ |
| FR-02-03 | Quality options for PDF only | Quality radios hidden for LaTeX/Markdown | ☐ |
| FR-02-04 | Include references checkbox | Checkbox toggles without error | ☐ |
| FR-02-05 | Include metadata checkbox | Checkbox toggles without error | ☐ |
| FR-02-06 | Custom filename input | Input accepts alphanumeric + hyphens | ☐ |
| FR-02-07 | Submit button loading state | Spinner shows during API call | ☐ |
| FR-02-08 | Modal closes on success | Modal closes after successful export creation | ☐ |
| FR-02-09 | Redirect to status page | Browser navigates to `/exports/[jobId]` | ☐ |
| FR-02-10 | Cancel button works | Modal closes without action on cancel | ☐ |

---

### FR-03: Export Status Page

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| FR-03-01 | Page loads with job ID | URL contains valid job ID parameter | ☐ |
| FR-03-02 | Initial status displays | Shows "Preparing..." or current status | ☐ |
| FR-03-03 | Progress bar renders | Bar shows 0-100% progress | ☐ |
| FR-03-04 | Auto-polling works | Status updates every 2 seconds | ☐ |
| FR-03-05 | Status icon changes | Icon matches current status | ☐ |
| FR-03-06 | Timestamp formatting | Dates display in user's locale | ☐ |
| FR-03-07 | Format displayed | Export format shown in uppercase | ☐ |
| FR-03-08 | Polling stops on completion | No more requests after completed/failed | ☐ |

---

### FR-04: Download Completion

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| FR-04-01 | Status changes to completed | UI shows "Ready to download" | ☐ |
| FR-04-02 | Download button appears | Button visible on completion | ☐ |
| FR-04-03 | File downloads on click | Browser initiates download | ☐ |
| FR-04-04 | Correct filename | Filename matches document + format | ☐ |
| FR-04-05 | File opens correctly | PDF/LaTeX/MD file is valid | ☐ |
| FR-04-06 | File content accurate | Downloaded content matches source | ☐ |

---

### FR-05: Error Handling

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| FR-05-01 | Invalid job ID handled | Shows "Job not found" message | ☐ |
| FR-05-02 | Network errors displayed | Specific error message shown | ☐ |
| FR-05-03 | Retry button functional | Retry initiates new request | ☐ |
| FR-05-04 | Export creation failure | Toast notification displayed | ☐ |
| FR-05-05 | Polling failure recovery | Manual refresh option available | ☐ |
| FR-05-06 | Download failure handling | Alternative download method offered | ☐ |
| FR-05-07 | Job failure message | Server error message displayed | ☐ |

---

### FR-06: Export History (Optional)

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| FR-06-01 | History table renders | Table shows past exports | ☐ |
| FR-06-02 | Columns correct | Document, Format, Status, Date, Actions | ☐ |
| FR-06-03 | Sorting by date | Most recent first | ☐ |
| FR-06-04 | Download from history | Completed items downloadable | ☐ |
| FR-06-05 | Retry from history | Failed items can be retried | ☐ |
| FR-06-06 | Empty state displays | Message shown when no history | ☐ |

---

### FR-07: Multiple Formats

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| FR-07-01 | PDF export works | Valid PDF file generated | ☐ |
| FR-07-02 | LaTeX export works | Valid .tex file generated | ☐ |
| FR-07-03 | Markdown export works | Valid .md file generated | ☐ |
| FR-07-04 | Content preserved | All formats contain full content | ☐ |
| FR-07-05 | Formatting maintained | Structure preserved in all formats | ☐ |

---

### FR-08: Quality Settings

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| FR-08-01 | Low quality option | Produces smaller file | ☐ |
| FR-08-02 | Medium quality option | Balanced file size | ☐ |
| FR-08-03 | High quality option | Produces largest file | ☐ |
| FR-08-04 | Quality difference visible | >20% size difference between levels | ☐ |
| FR-08-05 | All qualities readable | Output usable at all quality levels | ☐ |

---

## Technical Requirements

### TR-01: Performance

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| TR-01-01 | Initial page load | < 2 seconds | ☐ |
| TR-01-02 | First status fetch | < 500ms | ☐ |
| TR-01-03 | Polling interval | Exactly 2000ms (±100ms) | ☐ |
| TR-01-04 | Memory stability | No increase over 10 minutes | ☐ |
| TR-01-05 | No layout shift | CLS < 0.1 | ☐ |
| TR-01-06 | Bundle size | Export components < 50KB gzipped | ☐ |

---

### TR-02: Accessibility

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| TR-02-01 | Keyboard navigation | All elements reachable via Tab | ☐ |
| TR-02-02 | Focus indicators | Visible outline on focus | ☐ |
| TR-02-03 | ARIA labels | All interactive elements labeled | ☐ |
| TR-02-04 | Screen reader announcements | Status changes announced | ☐ |
| TR-02-05 | Modal focus trap | Focus contained while open | ☐ |
| TR-02-06 | Escape key closes | Modal closes on Escape | ☐ |
| TR-02-07 | Color contrast | WCAG AA compliant (4.5:1) | ☐ |
| TR-02-08 | Touch target size | Minimum 44px on mobile | ☐ |

---

### TR-03: Responsive Design

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| TR-03-01 | Mobile layout (< 640px) | Full-width modal, stacked fields | ☐ |
| TR-03-02 | Tablet layout (640-1024px) | Centered modal, 90% max-width | ☐ |
| TR-03-03 | Desktop layout (> 1024px) | Fixed-width modal, 500px max | ☐ |
| TR-03-04 | Touch interaction | Works on touch devices | ☐ |
| TR-03-05 | Orientation change | Adapts to portrait/landscape | ☐ |

---

### TR-04: API Integration

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| TR-04-01 | POST /api/v1/exports | Creates job, returns job_id | ☐ |
| TR-04-02 | GET /api/v1/exports/:jobId | Returns job status object | ☐ |
| TR-04-03 | GET /api/v1/exports/:jobId/download | Returns file stream | ☐ |
| TR-04-04 | DELETE /api/v1/exports/:jobId | Cancels job successfully | ☐ |
| TR-04-05 | GET /api/v1/users/:userId/exports | Returns history array | ☐ |
| TR-04-06 | Authentication enforced | All endpoints require auth | ☐ |
| TR-04-07 | Rate limiting handled | 429 responses handled gracefully | ☐ |
| TR-04-08 | Error responses parsed | Server errors displayed to user | ☐ |

---

### TR-05: State Management

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| TR-05-01 | Export store initialized | Zustand store created | ☐ |
| TR-05-02 | Job addition works | addJob updates state | ☐ |
| TR-05-03 | Job update works | updateJob modifies existing | ☐ |
| TR-05-04 | Job removal works | removeJob deletes from state | ☐ |
| TR-05-05 | Persistence configured | Active jobs survive refresh | ☐ |
| TR-05-06 | Cleanup on unmount | No memory leaks | ☐ |

---

### TR-06: TypeScript

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| TR-06-01 | All files typed | No `any` types used | ☐ |
| TR-06-02 | Export types defined | ExportFormat, ExportStatus, etc. | ☐ |
| TR-06-03 | Props interfaces | All components have prop types | ☐ |
| TR-06-04 | API response types | All endpoints typed | ☐ |
| TR-06-05 | No type errors | `tsc` passes with no errors | ☐ |

---

## User Experience Requirements

### UX-01: Loading States

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| UX-01-01 | ExportTrigger loading | Disabled state during permission check | ☐ |
| UX-01-02 | Modal submitting | Spinner on submit button | ☐ |
| UX-01-03 | Status initial load | "Loading status..." message | ☐ |
| UX-01-04 | Progress indication | Bar fills smoothly | ☐ |
| UX-01-05 | Download initiating | Spinner during download start | ☐ |

---

### UX-02: Error Messages

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| UX-02-01 | User-friendly language | No technical jargon | ☐ |
| UX-02-02 | Actionable guidance | Tells user what to do next | ☐ |
| UX-02-03 | Specific errors | Shows actual error reason | ☐ |
| UX-02-04 | Visual distinction | Error styling (red, icons) | ☐ |
| UX-02-05 | Recovery options | Retry/cancel buttons provided | ☐ |

---

### UX-03: Success Feedback

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| UX-03-01 | Export started confirmation | Toast or redirect confirms start | ☐ |
| UX-03-02 | Completion notification | Clear "Ready" state | ☐ |
| UX-03-03 | Download success | File appears in Downloads folder | ☐ |
| UX-03-04 | Positive reinforcement | Green colors, checkmark icons | ☐ |

---

## Security Requirements

### SEC-01: Authentication & Authorization

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| SEC-01-01 | Auth required | Unauthenticated users redirected | ☐ |
| SEC-01-02 | Owner check | Users can only access own exports | ☐ |
| SEC-01-03 | Token validation | JWT validated on each request | ☐ |
| SEC-01-04 | Session expiry handled | Redirect to login on 401 | ☐ |

---

### SEC-02: Data Protection

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| SEC-02-01 | HTTPS enforced | All requests over HTTPS | ☐ |
| SEC-02-02 | Secure headers | CSP, X-Frame-Options set | ☐ |
| SEC-02-03 | No sensitive data in URL | Job IDs are opaque tokens | ☐ |
| SEC-02-04 | Download URL expiration | Time-limited download links | ☐ |
| SEC-02-05 | XSS prevention | User input sanitized | ☐ |

---

## Browser Compatibility

### BC-01: Supported Browsers

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| BC-01-01 | Chrome (latest) | All features work | ☐ |
| BC-01-02 | Firefox (latest) | All features work | ☐ |
| BC-01-03 | Safari (latest) | All features work | ☐ |
| BC-01-04 | Edge (latest) | All features work | ☐ |
| BC-01-05 | Mobile Safari (iOS) | All features work | ☐ |
| BC-01-06 | Mobile Chrome (Android) | All features work | ☐ |

---

## Edge Cases

### EC-01: Boundary Conditions

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| EC-01-01 | Zero-byte document | Handles empty content | ☐ |
| EC-01-02 | Very large document | Handles 100+ pages | ☐ |
| EC-01-03 | Special characters in title | Filename sanitized | ☐ |
| EC-01-04 | Concurrent exports | Multiple jobs run simultaneously | ☐ |
| EC-01-05 | Rapid duplicate requests | Both jobs created successfully | ☐ |
| EC-01-06 | Network interruption | Recovers gracefully | ☐ |
| EC-01-07 | Browser refresh mid-export | State persists | ☐ |
| EC-01-08 | Timezone differences | Timestamps convert correctly | ☐ |
| EC-01-09 | Rate limit exceeded | User informed, cooldown shown | ☐ |
| EC-01-10 | Expired download URL | Regeneration option provided | ☐ |

---

## Documentation Requirements

### DOC-01: Code Documentation

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| DOC-01-01 | Component JSDoc | All components documented | ☐ |
| DOC-01-02 | Hook documentation | Custom hooks have usage examples | ☐ |
| DOC-01-03 | Type definitions | Complex types explained | ☐ |
| DOC-01-04 | API client docs | Endpoint usage documented | ☐ |

---

### DOC-02: User Documentation

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| DOC-02-01 | Help text in modal | Tooltips for options | ☐ |
| DOC-02-02 | Format descriptions | User understands differences | ☐ |
| DOC-02-03 | Quality explanations | User knows what each means | ☐ |
| DOC-02-04 | Error help links | Link to support docs | ☐ |

---

## Testing Requirements

### TEST-01: Manual Testing

| ID | Criterion | Measurement | Status |
|----|-----------|-------------|--------|
| TEST-01-01 | All manual tests pass | 33/33 tests from tests.md | ☐ |
| TEST-01-02 | Cross-browser tested | 6 browsers verified | ☐ |
| TEST-01-03 | Mobile tested | iOS and Android verified | ☐ |
| TEST-01-04 | Accessibility tested | Screen reader tested | ☐ |
| TEST-01-05 | Performance tested | Metrics meet requirements | ☐ |

---

## Sign-off

### Approval Checklist

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | | | ☐ |
| Tech Lead | | | ☐ |
| QA Engineer | | | ☐ |
| Frontend Developer | | | ☐ |

---

## Notes

- All criteria marked with ☐ must be checked (☑) before phase completion
- Any failures must be documented with follow-up tickets created
- Partial completion is not acceptable - all criteria are mandatory
- Optional features (Export History) must be explicitly marked as deferred if not implemented

---

**Phase 09 is complete when all checkboxes are marked and all approvers have signed off.**
