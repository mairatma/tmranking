# App Redesign Plan - Table Tennis Ranking Platform

## Overview
Redesign the CBTM (Confederação Brasileira de Tênis de Mesa) table tennis ranking and tournament tracking app with a modern, professional aesthetic based on CBTM's brand colors (blue, green, yellow). The redesign focuses on UI/styling improvements while preserving all existing data fetching and business logic.

## Current State
- **Framework**: Next.js 16 with app router
- **UI Library**: Chakra UI (used throughout)
- **Current Color Scheme**: Teal-based (teal.500, teal.600, teal.800)
- **Theme**: No custom theme file; using Chakra defaults
- **Layout**: Simple top navigation with logo + 2 links, container-based content
- **Key Pages**: Ranking (/?category=52), Tournaments (/tournaments), Tournament Detail (/tournaments/[id])
- **Design System**: Minimal custom styling; mostly Chakra component props and inline styles

## Design Goals
1. Extract and implement CBTM brand colors (blue, green, yellow + neutrals)
2. Improve visual hierarchy and spacing
3. Enhance navigation styling and appearance
4. Improve typography and contrast
5. Ensure mobile responsiveness (particularly for tournament tabs)
6. Maintain consistency across all pages and components

## Recommended Approach

### Phase 1: Brand Colors & Theme Setup
**Goal**: Establish a centralized Chakra theme with CBTM brand colors

**Confirmed Brand Colors**:
- **Primary Blue**: #0052CC (used for primary actions, headers, accent elements)
- **Secondary Green**: #28A745 (used for secondary elements, success states)
- **Accent Yellow**: #FFC107 (used for highlights, warnings, tertiary actions)
- **Neutrals**: White (#FFFFFF), grays (#F5F5F5, #E0E0E0, #666666, #333333) for backgrounds and text

**Steps**:
1. Create color palette in theme:
   - Primary Blue (#0052CC): Used for primary actions, headers, accent elements
   - Secondary Green (#28A745): Used for secondary elements, success states
   - Accent Yellow (#FFC107): Used for highlights, warnings, tertiary actions
   - Neutrals: White, grays (light to dark) for backgrounds and text

2. Create a custom Chakra theme file at `app/_chakra/theme.ts` with:
   - **Color palette**: Define brand colors (primary, secondary, tertiary) and semantic colors (success, warning, error, info)
   - **Semantic tokens**: Create token aliases like `brand.primary`, `brand.secondary`, `text.primary`, `text.muted`
   - **Component style overrides**: Define default styles for Buttons, Tables, Cards, Tabs, Links, Badge, etc.
   - **Typography tokens**: Define heading sizes, font weights, line heights
   - **Spacing**: Define consistent spacing scale

3. Update `app/_chakra/provider.tsx` to:
   - Import and pass the theme to ChakraProvider
   - Ensure theme is applied globally

4. Replace all hardcoded color references:
   - Search for `teal.500`, `teal.600`, `teal.800`, `teal.200`, `fg.muted` throughout codebase
   - Replace with new semantic token names (e.g., `brand.primary`, `text.muted`)
   - Files to update:
     - `app/_layout/components/NavLink.tsx` (HOVER_COLOR, ACTIVE_COLOR, INACTIVE_COLOR constants)
     - `app/_ranking/components/RankingPage.tsx` (pagination colorPalette)
     - Any other components using hardcoded teal colors

### Phase 2: Navigation & Header Redesign
**Goal**: Improve the top navigation bar styling and visual impact

**Steps**:
1. Update `app/_layout/components/MainLayout.tsx`:
   - Enhance nav bar styling: better spacing, shadow, or background gradient
   - Improve logo presentation: consider sizing, alignment
   - Refine nav links: add underline indicator for active state, improve hover states
   - Ensure responsive behavior on mobile

2. Update `app/_layout/components/NavLink.tsx`:
   - Use theme colors instead of hardcoded constants
   - Add smooth transitions for hover/active states
   - Improve visual feedback for active state (underline, background, etc.)

3. Consider subtle enhancements:
   - Add a subtle background color or shadow to the nav
   - Improve spacing and padding
   - Ensure brand colors are visible in navigation

### Phase 3: Page-Level Styling
**Goal**: Improve visual hierarchy and consistency across all pages

**Steps**:
1. **Ranking Page** (`app/_ranking/components/RankingPage.tsx`):
   - Enhance the category/region header with better typography
   - Style the filters button with brand colors
   - Improve table styling (header row colors, row hover states)
   - Enhance pagination with better button styling

2. **Ranking Table** (`app/_ranking/components/RankingTable.tsx`):
   - Update table header background with brand color
   - Add row alternating background colors (subtle)
   - Improve link styling in table cells (use brand colors)
   - Ensure good contrast for readability

3. **Tournaments List Page** (`app/tournaments/page.tsx`):
   - Enhance page title styling
   - Improve search/filter controls
   - Style tournament cards or table with brand colors

4. **Tournament Detail Page** (`app/tournaments/[id]/page.tsx`):
   - Update tabs styling with brand colors
   - Ensure tabs are mobile-responsive (wrap or scroll on small screens)
   - Add visual polish to tab indicators

5. **Registrations Table** (`app/_tournaments/registrations/components/RegistrationsTable.tsx`):
   - Update table styling to match ranking table
   - Ensure consistency across all tables

### Phase 4: Component-Level Polish
**Goal**: Refine individual components for better appearance

**Steps**:
1. **Buttons**: 
   - Update all buttons to use brand colors from theme
   - Add proper hover and active states
   - Ensure sufficient contrast

2. **Cards/Sections**:
   - If cards are used, style them with subtle borders and shadows
   - Use brand colors for accents

3. **Form Controls** (CategoryChooser, SearchSelect):
   - Update with brand colors
   - Ensure good visibility and usability

4. **Badges & Labels**:
   - Use semantic colors (success, warning) with brand palette
   - Ensure readability

5. **Spinners & Loading States**:
   - Use brand primary color instead of default

### Phase 5: Mobile Responsiveness & Testing
**Goal**: Ensure the redesign looks great on all screen sizes

**Steps**:
1. Verify tournament tabs work well on mobile:
   - Consider switching to scrollable tabs or stacked layout on small screens
   - Ensure touch-friendly tap targets

2. Test all pages on mobile devices:
   - Ranking page (filters, pagination)
   - Tournaments list
   - Tournament detail (all tabs)

3. Verify color contrast meets accessibility standards

## Files to Modify (Summary)

### Create:
- `app/_chakra/theme.ts` - New Chakra theme configuration

### Update:
- `app/_chakra/provider.tsx` - Add theme to provider
- `app/_layout/components/MainLayout.tsx` - Enhance nav styling
- `app/_layout/components/NavLink.tsx` - Use theme colors, improve states
- `app/_ranking/components/RankingPage.tsx` - Update colors and styling
- `app/_ranking/components/RankingTable.tsx` - Update table styling
- `app/tournaments/page.tsx` - Enhance page styling
- `app/tournaments/[id]/page.tsx` - Update tabs and layout
- `app/_tournaments/registrations/components/RegistrationsTable.tsx` - Update table styling
- `app/_components/CategoryChooser.tsx` - Use theme colors
- `app/_components/SearchSelect.tsx` - Use theme colors
- Any other files with hardcoded `teal.*` or `fg.muted` color references

## Key Principles to Maintain
1. **No data logic changes** - All API calls, state management, and data fetching remain untouched
2. **Chakra UI only** - Don't introduce custom CSS or new components
3. **Mobile first** - Ensure all changes work well on small screens
4. **Accessibility** - Maintain color contrast and semantic HTML
5. **Simplicity** - Don't over-engineer; use Chakra's built-in capabilities

## Execution Order
1. Phase 1: Create theme file (foundation for all other work)
2. Phase 2: Update navigation (visible immediately)
3. Phase 3: Update pages in order: ranking, tournaments list, tournament detail
4. Phase 4: Polish individual components
5. Phase 5: Test and refine on mobile

## Notes
- CBTM logo colors will be extracted from the actual logo image (`/images/logo.png`)
- All hex color values will be defined in the theme file for easy adjustment
- Semantic tokens will make future brand color changes simple
- The redesign focuses on style/appearance; no functional changes
