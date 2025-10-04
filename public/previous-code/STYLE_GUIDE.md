# StudioEyn Design System Style Guide

## Overview
This style guide documents the design system for StudioEyn, a Casablanca-based creative agency specializing in brand identity and digital design for the Middle East and Gulf region. The design system emphasizes clean typography, strategic spacing, and sophisticated interactions.

---

## 🎨 Color Palette

### Primary Colors
- **Black**: `#000000` - Primary text, buttons, and strong accents
- **White**: `#FFFFFF` - Background, inverted text, and contrast elements

### Gray Scale
```css
gray-50:  #f9fafb  /* Light backgrounds */
gray-100: #f3f4f6  /* Subtle backgrounds */
gray-200: #e5e7eb  /* Borders, dividers */
gray-300: #d1d5db  /* Light text, subtle elements */
gray-400: #9ca3af  /* Muted text */
gray-500: #6b7280  /* Secondary text */
gray-600: #4b5563  /* Body text */
gray-700: #374151  /* Dark text */
gray-800: #1f2937  /* Very dark text */
gray-900: #111827  /* Almost black */
```

### Usage Rules
- **Primary Text**: Black (`#000000`) for headings and important content
- **Secondary Text**: Gray-600 (`#4b5563`) for body text and descriptions
- **Muted Text**: Gray-400 (`#9ca3af`) for captions and less important information
- **Backgrounds**: White (`#FFFFFF`) for main backgrounds, Gray-50 (`#f9fafb`) for subtle sections
- **Borders**: Gray-200 (`#e5e7eb`) for subtle dividers, Gray-300 (`#d1d5db`) for stronger separators

---

## 📝 Typography

### Font Stack
```css
font-family: 'Helvetica', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', sans-serif;
```

### Font Weights
- **300**: Light - Used for captions and subtle text
- **400**: Normal - Default weight for body text and headings (PRIMARY WEIGHT)
- **500**: Medium - Reserved for emphasis (not commonly used)
- **600**: Semi-bold - Reserved for strong emphasis (not commonly used)
- **700**: Bold - Reserved for maximum emphasis (not commonly used)

**IMPORTANT**: 
- Hero section headings use **400 (Normal)** weight. Do not change to 300 (Light) unless explicitly requested.
- Navigation elements use **400 (Normal)** weight for consistency.

### Typography Scale

#### Headings
```css
/* H1 - Hero Headlines */
font-size: clamp(3rem, 8vw, 6rem);  /* 48px - 96px */
font-weight: 300;
line-height: 1.1;
letter-spacing: -0.02em;
text-transform: uppercase;
tracking: tight;

/* H2 - Section Headlines */
font-size: clamp(1.5rem, 4vw, 2.5rem);  /* 24px - 40px */
font-weight: 400;
line-height: 1.2;
text-transform: uppercase;
tracking: tight;

/* H3-H6 - Subheadings */
font-weight: 400;
line-height: 1.2;
```

#### Body Text
```css
/* Paragraph */
font-size: 1rem;  /* 16px */
font-weight: 400;
line-height: 1.6;

/* Large Paragraph */
font-size: 1.125rem;  /* 18px */
font-weight: 400;
line-height: 1.6;

/* Caption */
font-size: 0.875rem;  /* 14px */
font-weight: 300;
opacity: 0.8;
```

### Typography Rules
- **Headings**: Always uppercase with tight tracking
- **Body Text**: Normal case with comfortable line-height (1.6)
- **Font Weight**: Prefer lighter weights (300-400) for modern, clean appearance
- **Letter Spacing**: Negative letter-spacing (-0.02em) for large headings
- **Line Height**: Tight (1.1-1.2) for headings, comfortable (1.6) for body text

---

## 📐 Spacing System

### Container System
```css
.container-custom {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 2rem;  /* 32px */
}
```

### Section Spacing
```css
/* Standard Section Padding */
py-16 md:py-32  /* 64px mobile, 128px desktop */

/* Large Section Padding */
py-20 md:py-40  /* 80px mobile, 160px desktop */
```

### Component Spacing
```css
/* Card Padding */
p-8 md:p-12  /* 32px mobile, 48px desktop */

/* Button Padding */
px-8 py-4  /* 32px horizontal, 16px vertical */

/* Form Input Padding */
px-4 py-3  /* 16px horizontal, 12px vertical */

/* Icon Container */
w-16 h-16  /* 64px square */
```

### Spacing Rules
- **Consistent Rhythm**: Use multiples of 8px (0.5rem) for consistent spacing
- **Responsive Scaling**: Double spacing on desktop (md: breakpoint)
- **Breathing Room**: Generous padding in cards and sections
- **Visual Hierarchy**: Larger spacing between major sections

---

## 🎯 Component Philosophy

### Design Principles

#### 1. **Minimalism & Clarity**
- Clean, uncluttered interfaces
- Focus on essential elements
- Generous white space
- Subtle visual hierarchy

#### 2. **Sophisticated Interactions**
- Smooth transitions (300-500ms duration)
- Subtle hover effects
- Elegant animations
- Hardware-accelerated transforms

#### 3. **Responsive-First**
- Mobile-first approach
- Progressive enhancement
- Consistent experience across devices
- Touch-friendly interactions

#### 4. **Accessibility**
- High contrast ratios
- Focus indicators
- Semantic HTML
- Reduced motion support

### Component Patterns

#### Cards
```css
/* Standard Card */
bg-white rounded-lg p-8 md:p-12 hover:shadow-lg transition-all duration-300

/* Dark Card */
bg-black rounded-lg p-8 text-white

/* Subtle Card */
bg-gray-50 rounded-lg p-8 hover:shadow-lg transition-all duration-300
```

#### Buttons
```css
/* Primary Button */
bg-black text-white px-8 py-4 rounded-md font-normal uppercase
hover:bg-gray-900 transition-colors duration-200

/* Secondary Button */
border border-black text-black px-8 py-4 rounded-md font-normal uppercase
hover:bg-black/10 transition-all duration-200

/* CTA Button */
px-8 py-4 bg-black text-white font-normal rounded-md
hover:bg-gray-900 transition-all duration-300 uppercase
```

#### Forms
```css
/* Input Fields */
w-full px-4 py-3 border border-gray-200 rounded-lg bg-white text-black font-light
focus:ring-2 focus:ring-black focus:border-transparent transition-colors duration-200

/* Labels */
block text-sm font-light text-gray-700 mb-2
```

#### Icons
```css
/* Icon Container */
w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center
group-hover:bg-black group-hover:text-white transition-all duration-300

/* Icon Size */
h-5 w-5  /* Small icons */
h-6 w-6  /* Medium icons */
h-8 w-8  /* Large icons */
```

### Animation System

#### Transitions
```css
/* Standard Transition */
transition-all duration-300 ease-in-out

/* Smooth Transition */
transition-all duration-500 ease-in-out

/* Quick Transition */
transition-colors duration-200
```

#### Animations
```css
/* Slide Up Animation */
.animate-slide-up {
  animation: slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

/* Animation Delays */
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-400 { animation-delay: 400ms; }
```

#### Scroll Animations
- Elements fade in with `translate-y-10` to `translate-y-0`
- Staggered animations for grid items
- Smooth scroll behavior with `scroll-behavior: smooth`

---

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
sm: 640px   /* Small tablets */
md: 768px   /* Tablets */
lg: 1024px  /* Small desktops */
xl: 1280px  /* Large desktops */
2xl: 1536px /* Extra large screens */
```

### Mobile Optimizations
- **Touch Targets**: Minimum 44px touch targets
- **Swipe Gestures**: Horizontal scrolling for partner logos
- **Viewport Units**: `calc(100vh - 80px)` for hero sections
- **Hardware Acceleration**: `transform: translateZ(0)` for smooth scrolling

### Desktop Enhancements
- **Hover States**: Rich hover interactions
- **Grid Layouts**: Multi-column layouts
- **Larger Typography**: Scaled up text sizes
- **Enhanced Spacing**: Doubled padding and margins

---

## 🎨 Visual Elements

### Borders & Radius
```css
/* Border Radius */
rounded-md    /* 6px - Standard */
rounded-lg    /* 8px - Large */
rounded-2xl   /* 16px - Extra large */

/* Borders */
border border-gray-200  /* Subtle borders */
border border-gray-300  /* Stronger borders */
border border-black     /* Primary borders */
```

### Shadows
```css
/* Subtle Shadow */
hover:shadow-lg  /* Card hover effects */

/* No Shadows */
/* Prefer clean, flat design with minimal shadows */
```

### Gradients
```css
/* Scroll Fade Gradients */
background: linear-gradient(to right, white 80%, transparent)
background: linear-gradient(to left, white 80%, transparent)
```

---

## 🔧 Technical Implementation

### CSS Architecture
- **Tailwind CSS**: Utility-first framework
- **CSS Custom Properties**: For consistent values
- **Layer System**: Base, components, utilities
- **Mobile-First**: Responsive design approach

### Performance Optimizations
- **Hardware Acceleration**: `transform: translateZ(0)`
- **Passive Event Listeners**: `{ passive: true }`
- **RequestAnimationFrame**: For smooth scroll handling
- **Reduced Motion**: Respects user preferences

### Accessibility Features
- **Focus Indicators**: `ring-2 ring-black ring-offset-2`
- **Semantic HTML**: Proper heading hierarchy
- **ARIA Labels**: For interactive elements
- **Color Contrast**: High contrast ratios

---

## 📋 Usage Guidelines

### Do's ✅
- Use consistent spacing multiples of 8px
- Apply uppercase to headings with tight tracking
- Use light font weights (300-400) for modern feel
- Implement smooth transitions (300-500ms)
- Design mobile-first, enhance for desktop
- Use generous white space
- Apply subtle hover effects
- Maintain high contrast ratios

### Don'ts ❌
- Don't use heavy font weights (600+) unless necessary
- Don't skip responsive design considerations
- Don't use excessive shadows or effects
- Don't ignore accessibility requirements
- Don't use inconsistent spacing
- Don't forget hover states for interactive elements
- Don't use low contrast color combinations
- Don't ignore reduced motion preferences

---

## 🚀 Implementation Examples

### Hero Section
```jsx
<h1 className="text-5xl lg:text-6xl font-normal text-black leading-tight mb-6 animate-slide-up uppercase tracking-tight">
  <span className="block w-full whitespace-nowrap">DON'T JUST</span>
  <span className="block w-full whitespace-nowrap">SEE BRANDS.</span>
  <span className="block w-full whitespace-nowrap">WE SHAPE THEM</span>
</h1>
```

### Service Card
```jsx
<div className="group bg-white rounded-lg p-8 md:p-12 hover:shadow-lg transition-all duration-300">
  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center mb-8 group-hover:bg-black group-hover:text-white transition-all duration-300">
    <Icon className="h-8 w-8" />
  </div>
  <h3 className="text-2xl md:text-3xl font-normal text-black mb-6">
    Service Title
  </h3>
  <p className="text-gray-600 font-light leading-relaxed">
    Service description
  </p>
</div>
```

### CTA Button
```jsx
<a href="#contact" className="inline-flex items-center px-8 py-4 bg-black text-white font-normal rounded-md hover:bg-gray-900 transition-all duration-300 uppercase">
  <span>GET IN TOUCH</span>
</a>
```

---

This style guide serves as the foundation for maintaining consistency across the StudioEyn brand and digital experiences. Follow these guidelines to ensure cohesive, professional, and accessible design implementations.
