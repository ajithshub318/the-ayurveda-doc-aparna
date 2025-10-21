# Component Structure

This document outlines the refactored component structure of the Ayurveda Doc website.

## Directory Structure

```
src/
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── WhatIDoSection.tsx
│   │   ├── HowIWorkSection.tsx
│   │   ├── HealingNeedsSpaceSection.tsx
│   │   ├── PricingPlansSection.tsx
│   │   ├── InPersonHealingSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── WordsReflectionsSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── FinalInvitationSection.tsx
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── Modal.tsx
│   ├── ContactForm.tsx
│   └── BookingForm.tsx
└── App.tsx
```

## Components Overview

### Main Components

#### `App.tsx`
- Main application component
- Manages state for modals (Contact, Booking)
- Manages success message display
- Coordinates all section components

### Layout Components

#### `Navigation.tsx`
- Fixed top navigation bar
- Logo and navigation links
- Book Consultation CTA button
- Props: `onBookingClick`

#### `Footer.tsx`
- Site footer with company info, links, and contact details
- Social media links
- Quick links navigation
- Props: `onContactClick`, `onBookingClick`

### Section Components (in order of appearance)

#### 1. `HeroSection.tsx`
- Hero section with headline and image
- Trust indicators (500+ clients, 10+ years, 4.9 rating)
- Primary CTAs
- Props: `onBookingClick`, `onContactClick`

#### 2. `WhatIDoSection.tsx`
- "Personalized Ayurveda That Fits Your Life" section
- 4 feature cards:
  - 1:1 Consultations
  - Nutrition & Lifestyle Guidance
  - Postnatal & Women's Health Support
  - Detox & Rejuvenation Plans
- No props (standalone)

#### 3. `HowIWorkSection.tsx`
- Image + text section explaining the work process
- 4 benefit points with checkmarks
- No props (standalone)

#### 4. `HealingNeedsSpaceSection.tsx`
- Retreat recommendations section
- CTA for exploring recommended retreats
- Props: `onContactClick`

#### 5. `PricingPlansSection.tsx`
- Two pricing plan cards (Essential & Focused)
- Add-ons information
- Learn More buttons
- Props: `onBookingClick`

#### 6. `InPersonHealingSection.tsx`
- Full-width image section with overlay text
- Information about Kerala Ayurveda centers
- No props (standalone)

#### 7. `AboutSection.tsx`
- Dr. Aparna's bio section
- Image + text layout
- No props (standalone)

#### 8. `WordsReflectionsSection.tsx`
- Blog/content preview section
- 3 article cards:
  - Understanding Your Dosha
  - Daily Rituals for Balance
  - Food as Medicine
- No props (standalone)

#### 9. `TestimonialsSection.tsx`
- Client testimonials
- 2 large quote cards
- No props (standalone)

#### 10. `FinalInvitationSection.tsx`
- Final CTA section
- Book consultation and Write to me buttons
- Props: `onBookingClick`, `onContactClick`

### Form Components

#### `Modal.tsx`
- Reusable modal wrapper
- Props: `isOpen`, `onClose`, `title`, `children`

#### `ContactForm.tsx`
- Contact form for general inquiries
- Props: `onSuccess`

#### `BookingForm.tsx`
- Booking form for consultations
- Props: `onSuccess`

## Benefits of This Structure

1. **Modularity**: Each section is self-contained and reusable
2. **Maintainability**: Easy to find and update specific sections
3. **Readability**: App.tsx is now clean and easy to understand
4. **Scalability**: Easy to add, remove, or reorder sections
5. **Testing**: Individual components can be tested in isolation
6. **Performance**: Components can be lazy-loaded if needed
7. **Reusability**: Sections can be reused across different pages

## Content Updates (from nom.md)

All sections have been updated with the empathetic, mindful messaging from nom.md:

- Hero: "Your body always knows what it needs..."
- What I Do: Classical Ayurveda that fits your life
- Healing Needs Space: Personalized retreat recommendations
- About: Updated bio emphasizing reconnection with body's wisdom
- All copy focuses on listening, understanding, and gentle support
