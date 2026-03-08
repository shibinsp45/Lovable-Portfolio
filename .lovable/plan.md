

# Stacked Card Projects Section

## Overview
Replace the current alternating case study layout with an interactive **stacked card** UI — cards are layered on top of each other like ATM/credit cards. Clicking a card brings it to the front, and each card shows the project image, title, description, and a "Tap to Preview" button linking to the project detail page.

## Design

```text
┌─────────────────────────────────┐
│  Selected Work / Projects       │
│  [Category Tabs]                │
│                                 │
│   ┌───────────────────────┐     │
│   │  ┌─────────────────┐  │     │  ← Stacked cards with
│   │  │  ┌────────────┐  │  │     │     slight offset/rotation
│   │  │  │  FRONT CARD │  │  │     │
│   │  │  │  ┌────────┐ │  │  │     │
│   │  │  │  │ IMAGE  │ │  │  │     │
│   │  │  │  └────────┘ │  │  │     │
│   │  │  │  Title      │  │  │     │
│   │  │  │  Desc       │  │  │     │
│   │  │  │ [Tap to     │  │  │     │
│   │  │  │  Preview]   │  │  │     │
│   │  │  └────────────┘  │  │     │
│   │  └─────────────────┘  │     │
│   └───────────────────────┘     │
│                                 │
│  ● ● ● ● ● ●  (dot indicators) │
└─────────────────────────────────┘
```

## Implementation — `src/components/Projects.tsx`

1. **State**: Track `activeIndex` for the front card.

2. **Stacked layout**: Render all filtered cards absolutely positioned in a fixed-height container. Each card gets:
   - Decreasing `scale` (e.g., 1, 0.95, 0.9) for depth
   - Increasing `translateY` offset for the stacked peek effect
   - Decreasing `zIndex` so the active card is on top
   - Lower `opacity` for background cards

3. **Click to swap**: Clicking any card sets it as `activeIndex`, animating it to the front with `AnimatePresence` + `layout` transitions.

4. **Card content**: Each card is a glassmorphism container (`rounded-3xl`, `backdrop-blur`, `border`) containing:
   - Project image (same images, unchanged)
   - Title (Quicksand font-light)
   - Description (Poppins)
   - Category / Year / Role metadata
   - "Tap to Preview" button → links to `/project/${slug}`

5. **Navigation dots**: Below the stack, render dot indicators showing which card is active. Clicking a dot also swaps.

6. **Category tabs**: Keep existing filter tabs. When category changes, reset `activeIndex` to 0.

7. **Animations**: Use framer-motion `animate` with spring transitions for smooth card swapping (scale, y, opacity, zIndex changes).

8. **Responsive**: On mobile, cards take full width with tighter stacking offsets. On desktop, cards are centered at a max-width (~500px).

## Files Changed
- `src/components/Projects.tsx` — Full rewrite of the cards section (keep header, categories, and project data unchanged)

