---
name: mobile-app-dev
description: >
  Production mobile application development for iOS and Android.
  Activate when implementing mobile app UIs, native device integration,
  offline storage, push notifications, or mobile app build pipelines in Phase 13.
---

# Skill: Mobile Application Development (Layer 2 Platform)

## Purpose
Governs the implementation of production mobile applications for iOS and Android devices during Phase 13.

---

## Mobile Architecture Standards

### 1. Mobile UI & Touch Interaction Patterns
- Implement platform-idiomatic UI (iOS Human Interface Guidelines & Android Material Design 3).
- Handle safe area insets (notches, dynamic islands, home indicators) using safe-area context wrappers.
- Ensure minimum touch target size (44x44pt / 48x48dp).
- Handle keyboard open/close states dynamically (keyboard-aware scroll views).

### 2. Offline Capability & Local Storage
- Cache essential data locally for offline viewing (MMKV, WatermelonDB, SQLite, SecureStore).
- Manage network connectivity status changes gracefully.
- Queue offline actions locally and sync with backend upon connection restoration.

### 3. Native Device Features & Permissions
- Request permissions lazily with contextual explanation before triggering OS permission prompts.
- Handle permission denial gracefully with fallback UI options.
- Secure storage for auth tokens (iOS Keychain / Android Keystore).

### 4. Push Notifications & App Lifecycle
- Handle app lifecycle states (Active, Background, Inactive/Killed).
- Process incoming push notification payloads for foreground, background, and cold-boot taps.

### 5. App Store & Build Preparation
- Manage environment configurations for development, staging, and production builds.
- Configure iOS Bundle ID, App Version, Build Number, Info.plist permissions strings.
- Configure Android Package Name, Version Name, Version Code, AndroidManifest permissions.
