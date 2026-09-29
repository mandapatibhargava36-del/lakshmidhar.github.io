# Compliance checklist – advocate website (India)

Built against the Advocates Act 1961 (s.35), Bar Council of India (BCI) Rules Part VI Ch. II s.V **Rule 36**, and the BCI's 2008 resolution on advocate websites. Rules are amended from time to time – **have the advocate verify against the current BCI Rules and their State Bar Council's directions before going live.** This is not legal advice.

## Shown (permitted, factual)
Name; address, phone, email; enrolment number and date; State Bar Council; qualifications; areas of practice; bar association memberships and positions; languages; courts of practice; scholarly writing (citations only).

## Deliberately NOT shown
| Not shown | Reason |
|---|---|
| Testimonials, reviews, ratings | Rule 36 – advertisement/solicitation |
| Case results, "wins", notable/reported matters, client names/logos | Rule 36; client confidentiality (BSA 2023 s.132; BCI Rules Ch. II s.II) |
| Fees, packages, "free consultation", discounts | Rule 36 – inducement |
| "Best/top/leading/expert/specialist", rankings, awards for promotion | Rule 36 – self-laudation |
| "Book now / Hire us" CTAs, live chat, WhatsApp buttons, popups, newsletters | Solicitation |
| Ashoka emblem, court logos, court/judge imagery | State Emblem of India (Prohibition of Improper Use) Act 2005 |
| Commentary on pending matters | Contempt of Courts Act 1971 |
| "Senior Advocate" (unless designated by a court) | Advocates Act s.16 |
| Analytics, ad pixels, third-party fonts/scripts | DPDP Act 2023 – data minimisation |

## Built in
- Click-through disclaimer at entry (visitor seeks information voluntarily; no solicitation; no advice); static fallback in `<noscript>` and in the footer of every page.
- Terms & Disclaimer and Privacy Notice pages (DPDP Act 2023 consent, rights, grievance contact).
- Contact form with explicit consent checkbox, "no confidential info" warning, and no server-side storage (opens the visitor's email app).
- References to BNS/BNSS/BSA 2023 in place of IPC/CrPC/IEA.

## Before going live
1. Replace every yellow-highlighted `placeholder` with real, verified facts (search for `class="placeholder"`), then remove the highlight class and the "Dummy content" footer note.
2. Do not add photos, social-media links, blog posts about cases, or paid promotion.
3. Have the advocate/counsel review Terms and Privacy text.
4. Keep information accurate and updated; the advocate is responsible for the content (professional misconduct exposure under Advocates Act s.35).
