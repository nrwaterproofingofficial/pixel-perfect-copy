# Architecture rules
- Public pages live under the `_site` pathless layout; admin under `/admin` (separate dashboard layout). Why: completely different chrome per area.
- All public forms submit through `submitEnquiry` in src/lib/enquiries.ts with a `source`. Why: one central enquiry pipeline for the admin.
- Content shapes in src/data/* mirror future DB tables; no LocalStorage persistence. Why: easy swap to a real database.
- Business contact info comes only from src/lib/site.ts. Why: single source, later editable in admin settings.
