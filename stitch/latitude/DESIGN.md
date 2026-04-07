# Design System: The Intelligent Estate

## 1. Overview & Creative North Star: "The Digital Curator"

This design system is engineered to transform property management from a chaotic logistical task into a curated, high-performance experience. Our Creative North Star is **"The Digital Curator."** 

We reject the cluttered, "boxed-in" aesthetic of traditional real estate portals. Instead, we draw inspiration from the precision of high-end productivity tools like Linear, utilizing **intentional asymmetry**, **extreme tonal depth**, and **negative space as a structural element**. The goal is a UI that feels "breathable" yet dense with information—a calm, intelligent workspace where the interface recedes to let property data and high-resolution imagery shine.

---

## 2. Color & Surface Philosophy

The palette transitions from a crisp, architectural foundation to a sophisticated teal accent, emphasizing clarity and professional "edge."

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning. 
Structure must be achieved through **Background Color Shifts**. For example, a global `surface` background should host `surface-container-low` sidebar elements. Boundaries are felt, not seen, creating an uninterrupted visual flow that mimics high-end editorial layouts.

### Surface Hierarchy & Nesting
Treat the UI as layers of fine paper and frosted glass.
- **Base Layer:** `surface` (#FAF8FF) for the main canvas.
- **Structural Layer:** `surface-container-low` (#F2F3FF) for persistent sidebars.
- **Interactive Layer:** `surface-container-lowest` (#FFFFFF) for cards and active content areas to create a "lifted" feel.
- **High-Intensity Layer:** `surface-container-highest` (#DAE2FD) for active states or focused property panels.

### The Glass & Gradient Rule
To move beyond "standard" UI, use **Glassmorphism** for floating Command Bars (⌘K) and popovers.
- **Surface:** `surface_variant` at 60% opacity with a `24px` backdrop blur.
- **CTAs:** Utilize subtle linear gradients from `primary` (#00685F) to `primary_container` (#008378) at a 135° angle to give action buttons a tactile, premium depth.

---

## 3. Typography: Editorial Precision

The system utilizes **Inter** for all UI elements to ensure maximum legibility at high speeds, while leaning on weight and scale to establish authority.

*   **Display & Headlines:** Use `display-md` and `headline-lg` with a `-0.02em` letter-spacing. This "tightening" creates a bespoke, editorial feel found in high-end magazines.
*   **The Mono Accent:** For property IDs, square footage, and price metrics, use a monospaced font (Berkeley Mono style) to signal technical precision.
*   **Labels:** `label-sm` should be used in `on_surface_variant` (#3D4947) with `0.05em` tracking for a sophisticated, professional "metadata" look.

---

## 4. Elevation & Depth

We convey hierarchy through **Tonal Layering** rather than structural scaffolding.

*   **Ambient Shadows:** For floating elements (Modals/Command Bars), use a multi-layered "Ambient Shadow." 
    *   *Value:* `0 20px 50px -12px rgba(19, 27, 46, 0.08)`
    *   The shadow is tinted with the `on_surface` color to ensure it feels like a natural lighting effect on the teal/navy environment.
*   **The Ghost Border:** If containment is strictly required (e.g., in high-contrast accessibility modes), use a `1px` border of `outline_variant` at **15% opacity**.
*   **The Layering Principle:** A `surface-container-lowest` card sitting on a `surface-container-low` section provides a soft, natural lift that replaces the need for drop shadows in most "flat" views.

---

## 5. Components

### Sophisticated Command Bar
The centerpiece of the "Intelligent" atmosphere.
- **Style:** Floating, center-aligned. `surface_container_highest` background with 40% opacity and `backdrop-blur: 20px`.
- **Border:** `Ghost Border` (15% `outline_variant`).
- **Interaction:** No hover states; use a `primary_fixed` (#89F5E7) left-accent indicator to show selection.

### Activity Feed Rows
- **Layout:** Rounded `lg` (0.5rem) containers.
- **Separation:** Strictly vertical white space (16px). No dividers.
- **Status Indicators:** Use a "Glow" style. Instead of a flat dot, use a small `6px` circle with a `4px` blur of the same color (e.g., `tertiary` for active property status).

### Slim Sidebars
- **Width:** 240px.
- **Visuals:** `surface-container-low`.
- **Active State:** A subtle shift to `surface-container-high`. Avoid high-contrast background changes.

### Buttons
- **Primary:** Gradient fill (`primary` to `primary_container`), `on_primary` text. No border.
- **Secondary:** `surface-container-highest` background, no border, `on_surface` text.
- **States:** Hover should trigger a `10%` brightness increase rather than a color swap.

### Input Fields
- **Style:** Underline-only or ghost-style inputs.
- **Focus:** 2px solid `primary` bottom border only. This maintains the "slim" architectural feel.

---

## 6. Do’s and Don'ts

### Do:
- **Embrace White Space:** Use the `spacing-xl` scale to separate property blocks. Space is a luxury; use it.
- **Use Tonal Transitions:** Use `surface-dim` to define the "footer" or "background" areas of the app.
- **Focus on Typography:** Let the `title-lg` do the heavy lifting for hierarchy, not bold colors or lines.

### Don't:
- **No Heavy Borders:** Never use a 100% opaque border to separate content. It breaks the "Curator" atmosphere.
- **No Default Shadows:** Avoid the standard CSS `box-shadow`. Always use tinted, diffused ambient shadows.
- **No Rounded Corners Over 12px:** Keep the "Property Tool" feel professional. While `xl` is `0.75rem`, avoid fully pill-shaped buttons unless they are secondary "Action Chips."

---

## 7. Token Summary

| Role | Token | Hex | Usage |
| :--- | :--- | :--- | :--- |
| **Foundation** | `surface` | #FAF8FF | Global Background |
| **Accent** | `primary` | #00685F | Main CTAs & Teal Highlights |
| **Text** | `on_surface` | #131B2E | High-contrast Navy Typography |
| **Muted Text** | `on_surface_variant`| #3D4947 | Secondary Metadata / Labels |
| **Container** | `surface-container-low` | #F2F3FF | Sidebars / Navigation |
| **Card** | `surface-container-lowest`| #FFFFFF | Elevated Content Sheets |
| **Special** | `secondary` | #4648D4 | System Notifications / Secondary Actions |