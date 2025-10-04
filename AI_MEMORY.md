# AI Memory - StudioEyn Project (CRITICAL INSTRUCTIONS)

## ⚠️ ABSOLUTE RULES - NEVER VIOLATE

### 1. STYLE GUIDE IS LAW
- **ALWAYS reference STYLE_GUIDE.md before ANY change**
- Colors, typography, spacing (8px rhythm), components are DEFINED
- **DO NOT invent new styles or deviate from the guide**
- **DO NOT add creative flourishes unless explicitly requested**

### 2. FONT WEIGHT RESTRICTIONS
- **DEFAULT: font-light (300) or font-normal (400) ONLY**
- **NEVER use font-medium (500), font-semibold (600), or font-bold (700)**
- **Current navbar font weight: 400 (font-normal)** - DO NOT CHANGE
- When user says "light fonts", they mean 300-400, NOT heavier

### 3. SPACING DISCIPLINE
- **ALL spacing MUST be multiples of 8px** (0, 8, 16, 24, 32, 40, 48, 56, 64...)
- Use Tailwind classes: p-0, p-1 (4px), p-2 (8px), p-4 (16px), p-8 (32px), etc.
- **DO NOT use arbitrary values** like `p-[13px]` or `mt-[27px]`

### 4. MOBILE-FIRST ALIGNMENT
- **ALL elements LEFT-ALIGNED on mobile**: logo, hero text, buttons, video
- **NO centering on mobile** (text-center, mx-auto, justify-center)
- Desktop can be different, but mobile = strict left alignment

### 5. NO DUPLICATE COMPONENTS
- **NEVER render both mobile AND desktop versions simultaneously**
- Use `hidden md:block` and `md:hidden` correctly
- Check that only ONE version renders at any breakpoint

---

## 🚫 COMMON HALLUCINATIONS TO AVOID

### Hallucination #1: "Improving" Without Being Asked
- **DO NOT add border radius unless requested**
- **DO NOT change font weights "for consistency"**
- **DO NOT add shadows, gradients, or effects**
- **DO NOT restructure working code "to be cleaner"**
- **ONLY solve the EXACT problem stated**

### Hallucination #2: Breaking Navbar Inversion
- Navbar MUST invert colors on scroll (white bg → black bg, black text → white text)
- Navbar MUST switch between TWO logo SVGs (dark.svg and light.svg)
- Navbar MUST stay sticky with smooth transitions
- **DO NOT break this when fixing overflow-x or layout issues**
- **Test scroll behavior after ANY navbar change**

### Hallucination #3: Creating Horizontal Scroll
- **NO horizontal scrolling allowed** (`overflow-x-hidden` on body/html)
- **BUT do not break navbar functionality to fix overflow**
- If fixing overflow, test navbar inversion still works

### Hallucination #4: Centering Things on Mobile
- User explicitly wants LEFT alignment on mobile
- Video, text, buttons = all left-aligned
- **DO NOT use mx-auto, text-center, or justify-center on mobile**

### Hallucination #5: Ignoring Spacing Requirements
- User wants generous spacing between navbar and content
- Current mobile hero: `pt-32` between navbar and video
- **DO NOT reduce this** unless explicitly told
- Text and buttons need `px-4` padding (not px-0)

### Hallucination #6: "Optimizing" Working Code
- If something works, **LEAVE IT ALONE**
- User prefers "complete restoration to previous working state" over experimental fixes
- **DO NOT refactor working code without explicit permission**

### Hallucination #7: Adding Package Dependencies
- **DO NOT suggest installing new packages** without checking existing dependencies
- **DO NOT add trailing commas in package.json** (causes syntax errors)
- Verify all imports are already available

---

## 📋 COMPONENT-SPECIFIC RULES

### NAVBAR
- **Font weight: 400 (font-normal)** on all nav elements
- Sticky positioning, smooth color inversion on scroll
- Two SVG logos: `/images/logo-dark.svg` and `/images/logo-light.svg`
- Mobile menu: proper overlay/push behavior depending on scroll state
- **Touch targets: minimum 44px** for accessibility
- Transitions: smooth and performant (use requestAnimationFrame for scroll)

### HERO SECTION (Mobile)
- `pt-32`: Space between navbar and video (DO NOT reduce)
- `px-0`: Video container has no horizontal padding (left-aligns with logo)
- `px-4`: Text and CTA buttons have horizontal padding (not flush to edge)
- `pt-4`: Space between text and CTA (was pt-12, user reduced it)
- Video width: `w-full` (fills available width, no max-w constraints)
- **NO border radius on video** unless requested
- All elements left-aligned

### CREATIVE PROCESS GRID
- Smart image distribution across columns (3 mobile, 5 desktop)
- Handle 26-image array without hardcoded slicing
- Distribute remainder images intelligently
- **DO NOT break this section** - user called it "fucked up" when broken

---

## 🎯 USER PREFERENCES (EXPLICIT)

### LIKES:
- Proper spacing (generous, breathable)
- Left alignment on mobile
- Clean restoration when things break
- Smart, automatic solutions (like image distribution)
- Following mobile-first principles

### DISLIKES:
- Elements stuck to edges (needs padding)
- Insufficient spacing (especially navbar-to-content)
- Broken layouts requiring fixes
- Inconsistent alignment
- Poor mobile experience

### TYPICAL USER LANGUAGE:
- "fucked up" = completely broken, restore immediately
- "let's make" = explicit request, follow exactly
- "increase spacing 30%" = precise requirement, calculate and apply
- "perfectly left-aligned" = strict alignment requirement

---

## ✅ BEFORE MAKING ANY CHANGE, ASK:

1. **Is this change explicitly requested?** If no → STOP
2. **Does this follow the style guide?** If no → STOP
3. **Will this break navbar inversion?** If yes → STOP
4. **Will this create horizontal scroll?** If yes → STOP
5. **Does this maintain left alignment on mobile?** If no → STOP
6. **Am I using 8px spacing multiples?** If no → STOP
7. **Am I adding font weights 500+?** If yes → STOP
8. **Am I duplicating components?** If yes → STOP

---

## 🔧 IMPLEMENTATION CHECKLIST

When making changes:
- [ ] Reference STYLE_GUIDE.md
- [ ] Verify spacing in 8px increments
- [ ] Test on mobile first
- [ ] Check navbar inversion still works
- [ ] Verify no horizontal scroll
- [ ] Confirm left alignment on mobile
- [ ] Remove any unused code/imports
- [ ] Check for duplicate components
- [ ] Verify touch targets ≥44px
- [ ] Test scroll performance

---

## 📊 CURRENT STATE (Production Ready)

- Navbar: Responsive, inverts on scroll, font-weight 400
- Hero: Left-aligned mobile, proper spacing (pt-32, px-4), responsive video
- Creative Process: 26-image smart grid distribution
- Performance: Optimized scroll listeners, smooth transitions
- Accessibility: Sufficient contrast, keyboard navigation, touch targets
- Code quality: Clean, documented, follows patterns

**Project Status**: Production ready, only make changes explicitly requested by user

---

## 🎓 LEARNING FROM PAST MISTAKES

1. **"Let's make font weight in navbar 400"** → Changed ALL navbar elements to font-normal (400)
   - Lesson: Apply font weight changes consistently across related elements
   
2. **"Video too close to navbar"** → Increased pt-16 to pt-32
   - Lesson: User wants generous spacing, don't be conservative
   
3. **"Creative Process fucked up"** → Restored entire section
   - Lesson: When things break, restore completely, don't patch

---

_Last updated: October 2025_
_Version: 2.0 - Reinforced against AI hallucinations_