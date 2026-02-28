# Page Transition Animation - Complete Guide

## Table of Contents
1. [Understanding Page Transitions](#understanding-page-transitions)
2. [Problems We Face](#problems-we-face)
3. [The Thinking & Logic](#the-thinking--logic)
4. [Architecture Overview](#architecture-overview)
5. [Component Breakdown](#component-breakdown)
6. [Hook Explanation](#hook-explanation)
7. [Animation Timeline](#animation-timeline)
8. [How to Implement](#how-to-implement)
9. [Common Issues & Solutions](#common-issues--solutions)

---

## Understanding Page Transitions

### What is a Page Transition Animation?

A page transition animation is a visual effect that plays **between** two pages when you navigate. Instead of content instantly changing, the animation creates a bridge between the old page and new page. Think of it like:

```
Click Link → Animation Starts → Page Changes (Hidden) → Animation Ends → New Page Visible
```

This gives your website a **professional, polished feel** and makes navigation smooth rather than jarring.

### Why Use Page Transitions?

- **Visual Polish**: Makes your site feel premium and well-designed
- **User Feedback**: Users know something is happening (navigation in progress)
- **Time Masking**: Hides loading delays - user sees cool animation instead of blank page
- **Professional Feel**: Used on top-tier websites (Apple, Nike, creative agencies)

---

## Problems We Face

When building page transitions, you encounter several challenges:

### 1. **Timing Mismatch** ⏱️
**Problem**: Page changes too early or too late
- If page changes too early: User sees new page content behind animation bars (looks bad)
- If page changes too late: Animation finishes before page changes (animation feels wasted)

**Solution**: Calculate exact timing when animation covers 100% of screen, change page then.

```javascript
// Timeline: 0s -------- 0.6s -------- 0.85s ------- 1.4s
//          |         |              |             |
//          Start     Full Cover      Start Out    Full Out
//          Anim      Page Change     Anim
```

### 2. **Multiple Rapid Clicks** 🖱️🖱️🖱️
**Problem**: User clicks multiple links while animation is running
- Multiple animations queue and overlap
- Animation gets stuck or glitches
- System consumes more resources

**Solution**: Add a "guard" flag that only allows one animation at a time. New clicks are ignored during animation.

### 3. **Timeline Conflicts** ⚔️
**Problem**: Old animation doesn't finish before new one starts
- Multiple GSAP timelines running simultaneously
- Each has different state values
- Unpredictable results

**Solution**: Kill previous timeline before starting new one with `timeline.kill()`

### 4. **State Not Reset** 🔄
**Problem**: Elements remain in animation state from previous cycle
- Bars stay at `height: 100%` instead of resetting to `0%`
- Next animation starts from wrong position

**Solution**: Always reset elements to initial state with `gsap.set()` before starting new animation

### 5. **Heavy Performance Impact** 🐢
**Problem**: Animations drop frames or lag on slower devices
- Too many animated properties
- Complex easing functions
- Continuous updates

**Solution**: Optimize by animating simple properties (height, opacity) and use GPU-friendly properties like `transform`

---

## The Thinking & Logic

### How to Think About Page Transitions

When designing a page transition, think in **phases**:

#### Phase 1: Entrance Animation (0s - 0.6s)
```
Goal: Cover the entire screen so user can't see old page
- Bars rise from bottom to top (like stairs)
- Each bar slightly delayed (stagger effect)
- Overlay becomes semi-transparent

Result: Screen is 100% covered with black
```

#### Phase 2: Page Change (at 0.6s)
```
Goal: Switch pages while covered
- Page change happens instantly
- User can't see it (fully covered by bars)
- Animation continues so transition is seamless
```

#### Phase 3: Exit Animation (0.6s - 1.4s)
```
Goal: Reveal new page gradually
- Bars collapse from top to bottom
- Overlay fades out
- Stagger effect reverses direction

Result: New page is fully visible
```

### Why Stagger Effect?

Instead of all bars animating together:
```
❌ All at once (boring):
████████████

✅ Stagger effect (dynamic):
█
 █
  █
   █
    █
```

Stagger creates visual rhythm and professional polish. Each bar has slight delay (0.1s between each).

### Why Transform origin?

```javascript
transformOrigin: "top center"
```

This means when we collapse bars, they shrink from the **top downward**, not from the center. Visually:

```
Bad (from center):          Good (from top):
█ █ █ █ █                   █ █ █ █ █
 ███████                      █ █ █
   █████                        █
    ███

Looks weird              Looks like stairs coming down
```

---

## Architecture Overview

Our page transition system has **3 main pieces**:

```
Nav.jsx
  ↓ (User clicks link)
  ↓
usePageTransition Hook
  ↓ (Calls animation + navigation)
  ↓
PageTransition Component
  ↓ (Runs GSAP stagger animation)
  ↓
New Page Displayed
```

### Data Flow

```
1. User clicks [about] link
   ↓
2. Nav.jsx calls: navigateWithTransition("/about")
   ↓
3. usePageTransition Hook:
   - Calls: window.triggerPageTransition(navigate)
   - Waits for animation to complete
   ↓
4. PageTransition Component:
   - Animates bars up (0-0.6s)
   - At 0.6s: hook calls navigate("/about")
   - Animates bars down (0.6-1.4s)
   ↓
5. New page displayed when animation ends
```

---

## Component Breakdown

### 1. **PageTransition Component** 📦

This is the visual element - the 5 black bars that animate.

```javascript
// State Management
isAnimatingRef = flag to prevent multiple animations
timelineRef = store GSAP timeline so we can kill it later
transitionRef = reference to DOM element containing bars
overlayRef = reference to overlay element
```

**Key Concept: Refs vs State**
- We use `useRef` instead of `useState` because:
  - Refs don't cause re-renders
  - We need to store references to DOM elements and timelines
  - We need to check `isAnimating` instantly (useState has delays)

### 2. **usePageTransition Hook** 🎣

This hook connects navigation with animation.

```javascript
// What it does:
- Takes the navigation destination (path)
- Triggers animation
- Waits for animation to finish
- Then navigates to new page
```

**Why a custom hook?**
- Reusable across any component
- Encapsulates animation logic
- Clean separation of concerns

### 3. **Nav Component** 🗺️

Updated to use the hook instead of React Router's `<Link>`:

```javascript
// Before:
<Link to="/about">About</Link>

// After:
<button onClick={() => navigateWithTransition("/about")}>
  About
</button>
```

**Why change from Link to button?**
- `<Link>` navigates instantly (no time for animation)
- `<button>` + hook allows us to animate first, navigate second
- Better control over timing

---

## Hook Explanation

### `usePageTransition` Hook Breakdown

```javascript
export const usePageTransition = () => {
  const navigate = useNavigate();  // React Router navigation

  const navigateWithTransition = async (path) => {
    // 1. Check if animation is already running
    if (isAnimatingRef.current) {
      return;  // Ignore this click
    }

    // 2. Request animation
    if (window.triggerPageTransition) {
      // Pass a callback that will be called when animation is at 70% (fully covering)
      await window.triggerPageTransition(() => {
        navigate(path);  // Actually change the page
      });
    } else {
      // Fallback if component not mounted
      navigate(path);
    }
  };

  return navigateWithTransition;
};
```

**Key Points:**
- `async/await`: Makes sure animation completes before function returns
- `window.triggerPageTransition`: Global function set by PageTransition component
- Callback function `navigate(path)`: Called by animation at perfect moment

---

## Animation Timeline

### Visual Timeline Breakdown

```
Time (seconds):    0        0.3      0.6      0.75      0.85     1.4
                   |--------|--------|--------|----------|--------|
                   
Overlay Opacity:   0%       50%      50%      50%        0%       0%
                   ↑        ↑                             ↓
                   Fade In            PAGE CHANGES      Fade Out

Bars Height:       0%       0%       100%     100%       0%       0%
                   |========================================|
                   ↑        ↑         ↑        ↑          ↓
                   Reset   Stagger   Full    Page       Animate
                   to 0%   Animate   Cover   Change     Down

Bars ScaleY:       1        1        1        1          0        0
                                                         ↓
                                                    Collapse
                                                    from top
```

### What Happens at Each Time Point

| Time | Event | Why? |
|------|-------|------|
| 0.0s | Animation starts | User clicked link |
| 0.0s | Overlay fades in | Start covering screen |
| 0.0s | Bars animate up (stagger) | Create staircase effect |
| 0.3s | Overlay at 50% opacity | Semi-transparent cover |
| 0.6s | Bars fully covering | Mission accomplished |
| **0.75s** | **PAGE CHANGES** | **Bars block view - user can't see change** |
| 0.85s | Bars start collapsing down | Reveal new page |
| 0.85s | Overlay fades out | Remove cover |
| 1.4s | Animation complete | Everything reset, new page visible |

**Why 0.75s for page change?**
- Bars reach full height at ~0.6s
- But animation still running (looks smooth)
- 0.75s ensures bars are FULLY covering before change
- User never sees old→new transition

---

## How to Implement

### Step 1: Create PageTransition Component

See `src/components/PageTransition/PageTransition.jsx` - handles animation visuals and GSAP timeline.

**Key features:**
- Creates 5 vertical bars (stagger elements)
- Manages animation state with refs
- Prevents multiple simultaneous animations
- Exports `window.triggerPageTransition` function

### Step 2: Create usePageTransition Hook

See `src/hooks/usePageTransition.js` - handles navigation logic.

**What it does:**
- Wrap any navigation with animation
- Called at perfect timing (0.75s)
- Returns function for navigation calls

### Step 3: Add to App

```javascript
// App.jsx
<PageTransition />  {/* Add this */}
<Nav />
<Routing />
```

**Why in App and not in Routing?**
- PageTransition needs to exist at top level
- Must persist across all pages
- Needs to be above routes in DOM hierarchy

### Step 4: Update Navigation Components

Replace `<Link>` with button + hook:

```javascript
// Before
<Link to="/about">About</Link>

// After
const navigateWithTransition = usePageTransition();

<button onClick={() => navigateWithTransition("/about")}>
  About
</button>
```

---

## Common Issues & Solutions

### Issue 1: Animation Plays But Page Doesn't Change

**Cause**: `window.triggerPageTransition` not found

**Solution**: 
- Check PageTransition is in App.jsx
- Check component mounted: `{window.triggerPageTransition}` in console should exist
- Verify usePageTransition is called correctly

```javascript
// Debug
useEffect(() => {
  console.log("Animation function available?", !!window.triggerPageTransition);
}, []);
```

### Issue 2: Rapid Clicks Cause Multiple Animations

**Cause**: No guard against multiple clicks

**Solution**: Already built in! The `isAnimatingRef` flag handles this.

```javascript
if (isAnimatingRef.current) {
  return;  // Ignore click during animation
}
```

### Issue 3: Animation Gets Stuck Halfway

**Cause**: Previous timeline not killed properly

**Solution**: Ensure timeline cleanup happens

```javascript
if (timelineRef.current) {
  timelineRef.current.kill();  // Kill old animation
}
```

### Issue 4: Can See Page Change Behind Bars

**Cause**: Page changes too early (bars not fully covering)

**Solution**: Increase page change timing

```javascript
// Instead of:
tl.call(onPageChange, null, 0.6);  // ❌ Changes at 0.6s

// Do this:
tl.call(onPageChange, null, 0.75);  // ✅ Changes at 0.75s (more covered)
```

### Issue 5: Animation Too Slow or Too Fast

**Cause**: Duration values not optimized

**Solution**: Adjust these values:

```javascript
// Animation in (currently 0.5s):
duration: 0.5  // Increase for slower, decrease for faster

// Stagger delay (currently 0.1s):
stagger: 0.1   // Increase for more spacing, decrease for faster

// Page change timing (currently 0.75s):
tl.call(onPageChange, null, 0.75)  // Adjust based on animation

// Exit starts (currently 0.85s):
0.85  // When exit animation begins
```

---

## Advanced Customization

### Changing Animation Style

#### More bars (10 instead of 5):
```javascript
{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
  // ...
))}
```

#### Different colors:
```javascript
className="transition-bar flex-1 bg-purple-900"  // Change color
```

#### Different easing:
```javascript
ease: "power4.inOut"  // Try: "back.inOut", "elastic.out", "sine.inOut"
```

#### Overlay opacity:
```javascript
tl.to(overlay, { opacity: 0.7, duration: 0.3 }, 0);  // Change 0.5 to 0.7
```

### Skip Animation on First Load

Sometimes you don't want animation on initial page load:

```javascript
// In usePageTransition.js
const isFirstLoad = useRef(true);

const navigateWithTransition = async (path) => {
  if (isFirstLoad.current && path === "/") {
    isFirstLoad.current = false;
    navigate(path);
    return;
  }

  // ... rest of animation code
};
```

---

## Best Practices

### ✅ DO:
- Keep animation **fast** (0.7-1.5s total)
- Ensure page change happens **during full cover**
- Guard against multiple simultaneous animations
- Test on **slow devices** too
- Use simple properties (height, opacity, transform)
- Kill old timelines before creating new ones

### ❌ DON'T:
- Make animation too slow (feels unresponsive)
- Change page before bars fully cover (user sees jank)
- Allow multiple animations to overlap
- Animate too many properties (kills performance)
- Forget to reset element states
- Use page transitions on every single state change (only route changes)

---

## Performance Tips

### 1. Use will-change CSS (Optional)
```css
/* Add to bars */
.transition-bar {
  will-change: height, transform;
}
```

### 2. Reduce Bar Count on Mobile
```javascript
const barCount = window.innerWidth < 768 ? 3 : 5;
{Array.from({length: barCount}).map((_, i) => (...))}
```

### 3. Disable on Slow Networks
```javascript
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (prefersReducedMotion) {
  navigate(path);  // Skip animation
  return;
}
```

---

## Summary Flow

```
1. User clicks nav link
   ↓
2. Button calls: navigateWithTransition("/about")
   ↓
3. Hook checks: Is animation running? No? Continue.
   ↓
4. Hook calls: window.triggerPageTransition(navigate)
   ↓
5. PageTransition component:
   - Resets bars to height 0%
   - Timeline starts: bars animate up (stagger)
   - At 0.75s: bars are 100% and covering screen
   - At 0.75s: hook calls navigate("/about") ← PAGE CHANGES
   - Bars continue down (user doesn't see change)
   - At 1.4s: animation complete, new page visible
   ↓
6. Clean up: Flag set to false, ready for next animation
```

---

## Learning Resources

To understand better:
- **GSAP Timeline**: https://gsap.com/docs/v3/GSAP/Timeline
- **Stagger Effect**: https://gsap.com/docs/v3/GARSAPTlings/stagger
- **React Refs**: https://react.dev/reference/react/useRef
- **Custom Hooks**: https://react.dev/reference/react/hooks

---

## Final Thoughts

Page transitions seem complex, but they're just:
1. **Animation** (GSAP handles timing)
2. **Navigation** (React Router handles changing page)
3. **Synchronization** (hook coordinates both at perfect moment)

The key insight: **Animate while covering, navigate while covered, reveal after page changed.**

Once you understand this concept, you can create transitions of any style! 🚀
