# Compliance & content notes – advocate website (India)

Designed against the Advocates Act 1961 (s.35) and Bar Council of India (BCI) Rules, Part VI, Ch. II, s.V, **Rule 36** (no solicitation/advertising) as I understand them. Rules are amended from time to time – **the advocate must verify the final site against the current BCI Rules and their State Bar Council's directions.** This is not legal advice.

## Content policy: nothing is invented
Only these facts are stated as true: the advocate's **name**, that they practise as an **Advocate before the High Court of Andhra Pradesh**, and their **telephone number** (all supplied by the advocate). Everything else is a `[BRACKETED PLACEHOLDER]` (class `ph`, dashed underline). The public site therefore carries `noindex, nofollow` until it is filled.

### To go live
1. Replace every `[PLACEHOLDER]` in `index.html` (search for `class="ph"`), and in `terms.html` / `privacy.html` (contact email, place of jurisdiction).
2. Set the email in `<form id="cf" data-to="">` – until then the form shows an "activates once email is added" message.
3. Delete the `<meta name="robots" content="noindex, nofollow">` line from all three pages.
4. Replace the illustrated gallery (`assets/g1–g6.svg`) with the advocate's own photographs of chambers/library only, or delete the gallery block.
5. Update canonical/OG URLs, `sitemap.xml` and `robots.txt` if the domain changes.
6. Have the advocate/counsel review Terms and Privacy text.

## QR codes and digital visiting card
- Telephone **+91 95050 78050** (supplied by the advocate) is shown in Contact; its QR encodes `tel:+919505078050`.
- Second QR links to `card.html`, generated in the browser from the page's own address, so it stays correct if the domain changes. Printed copies of the QR must be regenerated only if the domain changes (download the card again from the new address).
- `card.html` offers PNG, PDF (3.5 × 2 in) and `.vcf` (save to contacts). All built in the browser – no external service, nothing uploaded.
- The card carries identification and contact details only (name, "Advocate", court, phone; email/address are skipped until added in `assets/card.js`). No photograph, tagline, practice-area claims or promotional wording – keep it that way. A visiting card is conventionally acceptable, but confirm the wording with the State Bar Council.
- QR libraries: `assets/qrcode.js` is qrcode-generator (MIT, Kazuhiko Arase).

## Shown (permitted, factual)
Name; contact details; enrolment number/date; State Bar Council; qualifications; areas of practice; bar memberships/positions; languages; courts; publications (citations only).

## Deliberately NOT shown
Testimonials/reviews/ratings; case results, "wins", success rates, client names; fees, "free consultation", discounts; "best/top/leading/expert/specialist", rankings, promotional awards; "hire us/book now" CTAs, live chat, WhatsApp buttons, pop-ups, newsletters; State Emblem/court logos (State Emblem of India Act 2005); commentary on pending matters (Contempt of Courts Act 1971); "Senior Advocate" unless court-designated (Advocates Act s.16); analytics/ad pixels/third-party fonts or scripts (DPDP Act 2023 data minimisation).

## Built in
- Click-through BCI acknowledgement at entry; disclaimer in the footer of every page and in `<noscript>`.
- Terms & Disclaimer and Privacy Notice (DPDP Act 2023: consent, rights, grievance route).
- Contact form: consent checkbox, "no confidential info / no advocate–client relationship" notice, and **no server-side storage** (opens the visitor's own email app).
- BNS / BNSS / BSA 2023 terminology where laws are named.
- Self-hosted fonts (Cormorant Garamond, Manrope); no external requests.

## Advocate's photograph (caution)
The portrait (`assets/portrait.jpg` / `.webp`) is the advocate's own headshot. A headshot is not in the list of items I understand the BCI's 2008 resolution to permit, though Rule 36 specifically bars photographs published *in connection with cases*. **Confirm with the State Bar Council before publishing**, or remove the `<figure class="portrait">` block. Keep to a plain professional portrait.

## Technical notes
- The hero 3D scene is pure CSS 3D (no WebGL/libraries) driven by scroll – see `assets/scene.js`. On phones it uses fewer particles, a lighter frame rate and a background scene; with `prefers-reduced-motion` or short landscape screens it renders the finished composition statically.
- Custom cursor, tilt and magnetic buttons are desktop-pointer only.
