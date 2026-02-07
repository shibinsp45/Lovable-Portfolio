
# Redesign Projects Section: Bold Heading + Horizontal Layout with Project Cards

## Overview
Redesign the Projects section to feature a bold section heading, horizontal alignment of project type titles, and display project cards in a 3-column grid below.

## Changes

### 1. Bold Section Heading
Add a large, bold "Projects" or "My Work" heading at the top of the section using the Quicksand font, matching the existing style.

### 2. Horizontal Project Type Navigation
Change the vertical centered list of project titles into a horizontal row of clickable category labels. The active label will be bold/highlighted while inactive ones are dimmed -- similar to tabs.

### 3. Project Cards Grid (3 per row)
Below the horizontal navigation, display project cards in a responsive 3-column grid. Each card will show:
- Project image
- Project title
- Short description
- Category badge
- Link to project detail page

The dynamic background gradient will still change based on the active/selected category.

### 4. Responsive Behavior
- Desktop: 3 cards per row
- Tablet: 2 cards per row
- Mobile: 1 card per row

## Files to Modify

| File | Changes |
|------|---------|
| `src/components/Projects.tsx` | Complete layout restructure -- bold heading, horizontal tabs, 3-column card grid |

## Technical Details

**Layout Structure:**
```text
+------------------------------------------+
|            PROJECTS  (bold heading)       |
|                                          |
|  UI UX  |  Web Dev  |  Branding  | ...   |  <-- horizontal tabs
|                                          |
|  +--------+  +--------+  +--------+     |
|  | Card 1 |  | Card 2 |  | Card 3 |     |  <-- 3-col grid
|  +--------+  +--------+  +--------+     |
|  +--------+  +--------+  +--------+     |
|  | Card 4 |  | Card 5 |  | Card 6 |     |
|  +--------+  +--------+  +--------+     |
+------------------------------------------+
```

**Card Design:**
- Rounded corners with glassmorphism (`bg-card/30 backdrop-blur-xl`)
- Project image at top
- Title and description below
- Hover effect: scale up slightly with shadow
- Arrow link icon to project detail page

**Heading Style:**
- Font: Quicksand, bold weight (700)
- Large size: `text-5xl md:text-7xl`
- White color for contrast against dynamic background

**Horizontal Tabs:**
- Quicksand font, italic, light weight
- Active tab: full opacity, underline or bold indicator
- Inactive tabs: dimmed opacity with hover effect
- Clicking "All" shows all 6 projects; clicking a specific type filters to that category

The gradient fades at top and bottom will be preserved.
