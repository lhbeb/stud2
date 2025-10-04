# AI Memory - StudioEyn Project (Summary for AI Model)

## Project Overview
StudioEyn is a Casablanca-based creative agency. This file summarizes all key lessons, requirements, and mistakes to avoid for the StudioEyn website project. Use this as context to avoid repeating past errors and to follow the project's design and technical standards.

---

## Core Principles & Rules

- **Always follow the STYLE_GUIDE.md** for colors, typography, spacing (8px rhythm), and component patterns.
- **Use light font weights (300-400)**, never heavy (600+), unless explicitly requested.
- **Spacing must be consistent** and always in multiples of 8px.
- **Design mobile-first** and enhance for desktop.
- **All elements (logo, hero text, buttons) must be left-aligned on mobile**, except the hero video, which is centered.
- **Navbar must smoothly invert colors on scroll** (white to black, logo switches SVGs, smooth transitions, sticky).
- **No duplicate components** (never render both mobile and desktop versions at once).
- **No horizontal scrolling** (overflow-x: hidden), but do not break navbar inversion.
- **Touch targets must be at least 44px** for accessibility.
- **No unnecessary creative changes**—only solve the specific issue requested.
- **Test all visual and functional changes immediately** on real devices.
- **Remove unused code, imports, and components regularly**.
- **No complex CSS overrides**—prefer simple, maintainable solutions.
- **No inline styles that conflict with CSS classes**.
- **No JSON/package syntax errors** (e.g., trailing commas).
- **No unnecessary border radius or font weight changes** unless asked.

---

## Frequent Mistakes to Avoid

- Centering hero text or buttons on mobile (should be left-aligned).
- Creating duplicate hero/nav components for different breakpoints.
- Breaking navbar inversion or sticky behavior.
- Adding creative touches (e.g., border radius, font weight changes) without explicit instruction.
- Overcomplicating CSS or JS for layout/positioning.
- Allowing horizontal scrolling or layout shifts.
- Ignoring the style guide or design system.

---

## Implementation Reminders

- **Navbar**: Inverts color on scroll, uses SVG logos, sticky, smooth transitions, accessible.
- **Hero Section**: Responsive, left-aligned text/buttons, video is centered and fills available width on mobile (no max-w constraints), no border radius unless requested.
- **Mobile Menu**: Correct overlay/push-down behavior depending on scroll, no unwanted shadows.
- **Spacing**: All paddings/margins in 8px increments.
- **Performance**: Use requestAnimationFrame for scroll events, optimize for smoothness.
- **Accessibility**: Sufficient contrast, touch target size, keyboard navigation.
- **Code Quality**: Clean up unused code, follow consistent patterns, document decisions.

---

## Project Status

- Codebase is clean and optimized.
- Style guide is comprehensive and must be followed.
- Navbar and hero are responsive and branded.
- Animations and transitions are smooth.
- Accessibility and performance are priorities.
- Only make changes explicitly requested by the user.

### Navbar Font Weight Update
**User**: "let's make fon't wight in navbar 400 update that on ai memory and style guide"
- **Action**: Changed navbar font weight from `font-light` (300) to `font-normal` (400) across all navbar elements:
  - Desktop navigation links
  - Desktop email button
  - Mobile navigation links
  - Mobile email button
- **Lesson**: When user explicitly requests font weight changes, apply consistently across all related elements

_Last updated: January 2025. Project is production ready._
