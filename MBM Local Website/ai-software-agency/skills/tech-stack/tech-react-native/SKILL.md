---
name: tech-react-native
description: >
  React Native & Expo framework micro-skill (Mobile UI, navigation, native hooks).
  Activate ONLY when React Native / Expo is selected in GATE-03 docs/ARCHITECTURE.md during Phase 13.
---

# Skill: React Native & Expo (Layer 3 Tech Skill)

> ⚡ **On-Demand Micro-Skill:** Activated only when `React Native` or `Expo` is selected in `docs/ARCHITECTURE.md`. Focuses strictly on React Native primitives, Expo SDK modules, and mobile navigation.

## React Native & Expo Conventions
- **Primitives Only:** Use `View`, `Text`, `Image`, `Pressable`, `FlatList` instead of web HTML tags (`div`, `span`, `img`, `button`).
- **Expo SDK Integration:** Use official Expo modules (`expo-camera`, `expo-notifications`, `expo-secure-store`, `expo-file-system`) for native features.
- **Navigation (Expo Router / React Navigation):** Use file-based routing (`app/`) or explicit stack/tab navigators with typed route params.
- **Styling:** Use `StyleSheet.create()` or Nativewind for styling. Avoid inline object creation in render loops (`style={{ padding: 10 }}`).

## Anti-Patterns to Avoid
- ❌ Do NOT use web DOM elements (`<div>`, `<span>`, `<a>`, `<p>`) or browser global objects (`window`, `document`) in React Native components.
- ❌ Do NOT render large dynamic lists with `.map()`. Always use `FlatList` or `FlashList` for memory efficiency.
