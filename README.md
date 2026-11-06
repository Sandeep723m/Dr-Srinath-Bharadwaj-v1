# Dr. R. Srinath Bharadwaj — React portfolio

Responsive React/Vite implementation of the supplied portfolio PRD and Clinical Editorial design strategy.

## Design system

- Palette: Clinical Navy `#183347`, Oncology Teal `#247D79`, Warm Ivory `#F7F6F2`, Pure White `#FFFFFF`, Slate Ink `#344650`, Soft Sage `#E4EFEB`, and sparing Muted Bronze `#A47746`.
- Type: Newsreader for editorial headings and quotations; Inter for interface, body, and metadata.
- Layout: 1240px maximum content width, generous editorial spacing, thin neutral dividers, documentary image crops, and responsive single-column mobile layouts.
- Tokens: spacing scale from 4px to 96px, 10px card corners, 8px button corners, and visible keyboard focus.
- Navigation connects the About, Treatments, and Articles sections, with appointment enquiry available in the header.

The visual direction is clinical precision, human compassion, and scientific authority. Portfolio claims and research facts still require source review before being added as content.

## Run locally

```sh
npm install
npm run dev
```

## Page structure

The single-page route is `/`. `src/main.jsx` contains the page composition and the reusable `Header`, `Button`, and `Reveal` components. `src/gsap.js` centralizes GSAP and its registered plugins; `Reveal` uses ScrollTrigger, while the hero uses a short GSAP entrance timeline. `src/styles.css` holds design tokens, responsive layouts, and reduced-motion behavior.

The homepage order is hero, about, services and treatments, patient-centred care, testimonials, articles, FAQs, appointment enquiry, and footer. Care and contact information is presented as general guidance; patients should contact the clinic about individual circumstances and appointment availability.

## Content and asset review before publishing

- Replace representative Unsplash photographs with approved portraits and event imagery; update descriptive alt text.
- Confirm current qualifications and the listed clinical services with the doctor.
- Add verified awards, publications, career milestones and affiliations with evidence.
- Have proposed cancer education topics written or reviewed by a qualified clinician before publication.
- Add clinic address, phone, email, official social profile URLs and approved WhatsApp appointment number/message.
- Replace the appointment enquiry email link with the clinic's approved booking destination.
- Add approved privacy policy, terms and any required medical disclaimer.

No contact information, treatment outcomes, patient testimonials, or achievements have been fabricated. The current footer and artwork notes identify content that remains to be confirmed.
