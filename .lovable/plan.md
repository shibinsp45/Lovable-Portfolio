

# Plan: Update Hero Section Font Style

## Overview
Update the Hero section typography to match the reference image style - a rounded sans-serif font with light weight and italic styling.

## What I'll Change

### 1. Add a Rounded Sans-Serif Font
The reference image shows a rounded, soft sans-serif font. I'll add **"Quicksand"** font from Google Fonts, which has that clean, rounded aesthetic similar to the reference.

### 2. Update Hero Text Styling
Apply these changes to the Hero section headings:
- **Font family**: Change to Quicksand (rounded sans-serif)
- **Font weight**: Change to light (300) for that thin appearance
- **Font style**: Add italic styling
- **Color**: Change from blue to white/foreground color

## Files to Modify

| File | Changes |
|------|---------|
| `src/index.css` | Add Quicksand font import |
| `tailwind.config.ts` | Add Quicksand to font family configuration |
| `src/components/Hero.tsx` | Update h1, h2, and p elements with new font styling |

## Technical Details

**CSS Import (index.css):**
```css
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");
```

**Tailwind Config:**
```typescript
fontFamily: {
  quicksand: ['Quicksand', 'sans-serif'],
  // ... existing fonts
}
```

**Hero Component Text Classes:**
```
font-quicksand font-light italic text-foreground
```

This will give the Hero section that elegant, rounded, thin italic look matching your reference image.

