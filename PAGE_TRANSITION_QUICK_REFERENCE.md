# Page Transition - Quick Reference & Troubleshooting

## 🔧 Quick Tweaks

### Animation Speed
Edit `PageTransition.jsx` lines 77-78 and 95:
```javascript
// Make faster (0.3 instead of 0.5):
duration: 0.3,

// Make slower (0.8 instead of 0.5):
duration: 0.8,
```

### Stagger Spacing
Edit `PageTransition.jsx` lines 79 and 96:
```javascript
// More spacing between bars (0.2 instead of 0.1):
stagger: 0.2,

// Less spacing (faster staircase):
stagger: 0.05,
```

### Overlay Opacity
Edit `PageTransition.jsx` line 65:
```javascript
// More opaque (darker):
opacity: 0.7,

// More transparent (lighter):
opacity: 0.3,
```

### Bar Color
Edit `PageTransition.jsx` line 118:
```javascript
// Purple instead of black:
className="transition-bar flex-1 bg-purple-900"

// White:
className="transition-bar flex-1 bg-white"

// Custom color (add to CSS):
className="transition-bar flex-1 bg-[#YOUR_HEX_CODE]"
```

### Number of Bars
Edit `PageTransition.jsx` line 113:
```javascript
// 10 bars instead of 5:
{[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (

// 3 bars:
{[0, 1, 2].map((index) => (
```

Then update width calculation line 116:
```javascript
width: `${100 / 10}%`  // For 10 bars
width: `${100 / 3}%`   // For 3 bars
```

### Easing Style
Edit `PageTransition.jsx` lines 80 and 97:
```javascript
// Try different easing:
ease: "back.inOut"      // Bouncy
ease: "elastic.out"     // Elastic
ease: "sine.inOut"      // Smooth
ease: "expo.inOut"      // Dramatic
```

---

## ❌🔧 Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| Animation doesn't play | PageTransition not in App.jsx | Check App.jsx has `<PageTransition />` at top |
| Page changes too early | Page change timing wrong | Increase `0.75` to `0.85` in line 85 |
| Page visible behind bars | Bars don't fully cover | Increase bar animation duration (line 77) |
| Animation stutters | Too much animating | Reduce to 3 bars, remove overlay |
| Rapid clicks break it | Multiple animations overlap | Already fixed! Guard is in place |
| Bars get stuck | Old timeline not killed | Restart browser, clear cache |
| Can't click during animation | Intentional! (interaction lock) | This is by design for safety |

---

## 🎨 Customization Ideas

### Vertical Sliding Instead of Bars
Replace bars with full-height sliding divs:
```javascript
// In PageTransition.jsx, change the flex direction
<div className="flex flex-col h-full">  {/* changed from "flex" */}
```

### Diagonal Effect
Add rotation to bars:
```javascript
tl.to(bars, {
  height: "100%",
  duration: 0.5,
  stagger: 0.1,
  rotate: 45,  // Add rotation
  ease: "power2.inOut",
}, 0);
```

### Circular Reveal
Use border-radius:
```javascript
tl.to(bars, {
  height: "100%",
  duration: 0.5,
  stagger: 0.1,
  borderRadius: "50%",  // Make circles
  ease: "power2.inOut",
}, 0);
```

### Two-Layer Animation
Animate bars + overlay differently:
```javascript
// Overlay enters faster
tl.to(overlay, { opacity: 0.5, duration: 0.15 }, 0);

// Bars enter slower
tl.to(bars, { height: "100%", duration: 0.7, ... }, 0);
```

### Custom Easing Timeline
Combine multiple easing types:
```javascript
tl.to(bars.slice(0, 3), {    // First 3 bars
  height: "100%",
  duration: 0.5,
  ease: "power1.inOut",
}, 0);

tl.to(bars.slice(3), {       // Last 2 bars
  height: "100%",
  duration: 0.5,
  ease: "back.out",          // Different easing
}, 0.05);
```

---

## 📊 Timeline Reference

```
Current Setup:
0.0s ━━━━━━┓  Overlay fade in (0.3s)
           ┃
           ├─ Bars animate up (0.5s, staggered)
           ┃
0.6s ━━━━━━┃  Bars fully covering
           ┃
0.75s ━━━━━┃  ⚡ PAGE CHANGES (hidden under bars)
           ┃
0.85s ━━━━━┃  Bars animate down (0.5s)
           ┃  Overlay fade out
           ┃
1.4s ━━━━━━┘  Animation complete

Adjustment Guide:
- Make faster? Reduce all durations: 0.5 → 0.3
- Make slower? Increase all durations: 0.5 → 0.7
- See page change? Increase page change time: 0.75 → 0.85
```

---

## 🧪 Testing Checklist

- [ ] Single click transitions smoothly
- [ ] Double clicking doesn't break animation
- [ ] Rapid clicking (5+ times) handled gracefully
- [ ] Page is fully hidden behind bars
- [ ] Bars look smooth, not jittery
- [ ] Works on mobile (test size)
- [ ] Works on slow devices
- [ ] Scrollbar hidden on first load
- [ ] No console errors

---

## 📚 Key Files

| File | Purpose |
|------|---------|
| `PageTransition.jsx` | Animation logic (GSAP) |
| `usePageTransition.js` | Navigation coordination |
| `Nav.jsx` | Navigation buttons using hook |
| `App.jsx` | Mounts PageTransition component |

---

## 💡 Pro Tips

1. **Test on slow 3G** - Animation might need adjustment
2. **Add prefers-reduced-motion** - Respect user accessibility settings
3. **Use DevTools** - Inspect bars element to see real-time height changes
4. **Test with mouse + keyboard** - Both should trigger animation
5. **Profile performance** - Chrome DevTools → Performance tab
6. **Mobile optimization** - Fewer bars on small screens

---

## 🚀 Next Level: Advanced Features

### Feature: Pause Animation if Loading Slow
```javascript
// In usePageTransition.js
if (pageLoadTime > 2000) {
  // Page taking too long to load
  // Keep bars visible longer
  await new Promise(r => setTimeout(r, 2000));
}
```

### Feature: Different Animation Per Route
```javascript
window.triggerPageTransition = async (onPageChange, route) => {
  if (route === "/projects") {
    // Special animation for projects page
    // Use different colors/speeds
  }
}
```

### Feature: Reverse Animation on Back Button
```javascript
// Detect browser back/forward
if (performance.navigation.type === 2) {
  // User pressed back button
  // Reverse animation direction
}
```

---

## 📖 Learn More

Read the main guide: `PAGE_TRANSITION_README.md`

Key concepts:
- GSAP Timeline: How to sequence animations
- Stagger: Creating visual rhythm
- Transform Origin: Controlling animation direction
- Refs in React: Accessing DOM directly
- Custom Hooks: Reusable logic

---

## 💬 Questions to Ask Yourself

When customizing page transitions, think about:

1. **Speed**: Does 1.4s feel fast or slow?
2. **Coverage**: Can user see old page content?
3. **Polish**: Does it feel smooth or jerky?
4. **Feedback**: Does user know something is loading?
5. **Accessibility**: Does it respect reduced-motion preference?
6. **Performance**: Does it impact frame rate?

---

## 🎓 Understanding the Magic

The "magic" of page transitions isn't really magic—it's **timing**:

```
Without animation:        With animation:
Click → Change            Click → Animate → Change → Animate
(instant)                 (1.4 seconds of transition)

Feels:                    Feels:
❌ Jarring                ✅ Polished
❌ Unprofessional         ✅ Professional
❌ Laggy (even if fast)   ✅ Intentional design
```

The animation **masks** the navigation, making it feel like one continuous flow instead of a jump.

---

Good luck! You've got this! 🚀
