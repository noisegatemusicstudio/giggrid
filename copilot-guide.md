# Copilot Guide for Screen‑Driven Development

> **Do not overwrite or remove any paragraphs in this guide unless the repository owner (you) explicitly instructs otherwise.**

This document defines the non‑negotiable automation workflow that powers feature‑first React Native (mobile + web) development driven by Uizard screenshots.

---

## 1 Process Overview

1. **Design** a screen in Uizard.
2. **Drop assets** into `reference/<screen‑slug>/` with the following structure:
   - `screenshot/` – contains the full-page screenshot (`full.png`)
   - `components/` – individual component exports from Uizard
   - `assets/` – general images, backgrounds, graphics
   - `icons/` – icon assets and SVGs
3. **Copilot Agent analyzes and processes** all assets:
   - Identifies reusable vs. unique components
   - Integrates assets into the mobile design library
   - Renames components appropriately for consistency
   - Updates design system theme if new patterns are detected
4. A GitHub workflow (_Copilot Agent‑RN_) **auto‑generates a BDD file** ➜ opens PR `[BDD] <Screen>`.
5. **You review / edit / merge** the BDD PR (label `accepted-bdd`).
6. Agent‑RN then **generates code + tests** ➜ PR `[feat] <Screen>`.
7. **Before any commit is finalised** the following **gates must all pass and be approved by you**:
   1. **ESLint** (`npm run lint`).
   2. **SonarQube Quality Gate** (≥ A rating, 0 code smells, 0 bugs, 80%+ coverage **project‑wide**, 100% for the new screen).
   3. **Unit tests** (100% coverage for the new screen).
   4. **Integration tests** (100% coverage for the new screen).
   5. **E2E tests**: Appium (iOS & Android) and Playwright (Web) generated from the confirmed BDD scenarios and passing on CI devices.
   6. **Manual confirmation**: the bot pauses and waits for a PR comment containing `✅ looks good` from you before pushing the final commit.

If any gate fails or if confirmation is missing the commit is aborted.

---

## 2 Repository Layout

```text
reference/
└── <screen‑slug>/
    ├── screenshot/
    │   └── full.png          # Complete screen mockup from Uizard
    ├── components/           # Individual component exports
    │   ├── button.png        # Button component variations
    │   ├── input-field.png   # Input field components
    │   └── card.png          # Card/container components
    ├── assets/               # General design assets
    │   ├── background.png    # Background images/patterns
    │   ├── logo.png          # Logos and branding
    │   └── graphics/         # Other visual elements
    └── icons/                # Icon-specific assets
        ├── user.svg          # User interface icons
        ├── nav-home.png      # Navigation icons
        └── action-icons/     # Action/button icons
bdd/
submodules/
  appium-framework/         # universal-appium2-framework (git submodule)
  playwright-framework/     # universal-playwright-framework (git submodule)
src/
  screens/<Screen>Screen.tsx
  components/
    design-system/          # Mobile Design Library
      ├── theme.ts          # Design tokens & theme configuration
      ├── Button.tsx        # Reusable button component
      ├── Input.tsx         # Reusable input component
      ├── Card.tsx          # Reusable card component
      ├── Icon.tsx          # Icon component system
      └── index.ts          # Design system exports
  tests/
    <screen‑slug>/
      unit.test.tsx
      integration.test.tsx
      e2e.appium.ios.test.ts
      e2e.appium.android.test.ts
      e2e.playwright.web.test.ts
assets/                     # App-level assets (icons, splash, etc.)
App.tsx                     # Main app entry point
copilot_guide.md            # ← this file
```

### 2.1 Uizard Asset Processing Workflow

When you add new items to any `reference/<screen-slug>/` folder, the Copilot Agent will:

#### **Intelligent Component Analysis**

1. **Analyze** each asset to understand its purpose and design patterns
2. **Compare** with existing design system components for reusability
3. **Rename** appropriately using consistent naming conventions:
   - `button-primary.png` → `Button` component (primary variant)
   - `input-field-error.png` → `Input` component (error state)
   - `icon-user-profile.svg` → `UserProfileIcon` component

#### **Smart Integration Strategy**

- **Reuse Existing**: If component matches existing design system patterns
- **Extend Variants**: Add new variants to existing components (e.g., new button style)
- **Create New**: Only when genuinely unique functionality is required
- **Update Theme**: Extract colors, spacing, typography from new assets

#### **Mobile Design Library Updates**

- **Icons**: Integrated into centralized `Icon.tsx` component with type-safe names
- **Components**: Added as variants or new components with consistent API
- **Assets**: Optimized and stored in appropriate directories
- **Theme**: Updated with new design tokens extracted from assets

### 2.2 Asset Naming Conventions

The system will automatically rename assets following these patterns:

#### **Components Folder**

- `button-*.png` → Button component variants
- `input-*.png` → Input component variants
- `card-*.png` → Card component variants
- `modal-*.png` → Modal component variants

#### **Icons Folder**

- `nav-*` → Navigation icons
- `action-*` → Action/interaction icons
- `status-*` → Status/state icons
- `social-*` → Social media icons

#### **Assets Folder**

- `bg-*` → Background assets
- `logo-*` → Logo variations
- `pattern-*` → Repeatable patterns
- `graphic-*` → Decorative graphics

### 2.3 Mobile Design Library

The design system in `src/components/design-system/` provides reusable components that automatically inherit styling from Uizard assets:

- **theme.ts**: Design tokens (colors, typography, spacing, shadows)
- **Button.tsx**: Configurable button component with variants
- **Input.tsx**: Form input with validation states
- **Card.tsx**: Container component with elevation
- **Icon.tsx**: Centralized icon system with type safety
- **index.ts**: Consolidated exports

**Automatic Processing Workflow:**

1. **Asset Detection**: New assets trigger analysis
2. **Pattern Recognition**: Compare with existing components
3. **Smart Integration**: Reuse, extend, or create components
4. **Theme Extraction**: Update design tokens from new visual patterns
5. **Type Generation**: Create TypeScript types for new components
6. **Documentation**: Auto-generate component documentation

### 2.4 Submodules

```bash
git submodule add https://github.com/noisegatemusicstudio/universal-appium2-framework submodules/appium-framework
git submodule add https://github.com/noisegatemusicstudio/universal-playwright-framework submodules/playwright-framework
```

Workflows reference test helpers & config from these submodules; keep them updated via `git submodule update --remote`.

---

## 3 Automated CI Workflow (.github/workflows/copilot-agent.yml)

### Trigger

- `push` / `pull_request` on `reference/**` or `bdd/**` or `src/**`.

### Jobs (high‑level)

1. **asset-analysis** – Analyze new Uizard assets and integrate into design system
2. **bdd‑generate** – On new reference folder ➜ OCR + heuristics ➜ drafts BDD ➜ PR.
3. **code‑generate** – Post‑merge of BDD PR ➜ generates screen code + tests.
4. **pre‑commit‑checks (lint + sonar + tests)** – runs on each push to a `[feat]` branch.
5. **await‑manual‑confirm** – `actions/github-script` waits until the PR author comments `✅ looks good`.
6. **final‑commit** – merges generated code into branch once the above succeed.

### Required Status Checks

`asset-analysis`, `eslint`, `sonarqube`, `unit-test`, `integration-test`, `e2e-ios`, `e2e-android`, `e2e-web`, `manual-confirm`.

---

## 4 Copilot Agent Prompt (internal)

You are GitHub Copilot **Agent‑RN**. When new assets are added to `reference/<screen‑slug>/`:

### **Asset Processing Phase**

1. **Analyze folder structure** (`screenshot/`, `components/`, `assets/`, `icons/`)
2. **Identify asset types** and categorize each file
3. **Compare with existing** design system components
4. **Rename appropriately** using consistent naming conventions
5. **Extract design tokens** (colors, fonts, spacing) from assets
6. **Update mobile design library**:
   - Reuse existing components where possible
   - Extend components with new variants
   - Create new components only when necessary
   - Update theme.ts with new design tokens

### **Code Generation Phase**

1. **Infer UI** from `screenshot/full.png` + processed assets
2. **Draft BDD** into `bdd/<screen‑slug>.feature` with 1‑3 core scenarios and edge cases
3. Open PR `[BDD] <Screen>`. Do **not** proceed until the PR is merged & labelled `accepted-bdd`
4. **Generate screen code** using mobile design library components
5. **Create tests**:
   - **Unit**: `tests/<slug>/unit.test.tsx` – render & assert component behaviour. Achieve 100% stmt/branch/func/line for this file
   - **Integration**: `tests/<slug>/integration.test.tsx` – test Redux, navigation, API mocks
   - **E2E**:
     - Appium (iOS): `e2e.appium.ios.test.ts`
     - Appium (Android): `e2e.appium.android.test.ts`
     - Playwright (Web): `e2e.playwright.web.test.ts` All E2E tests derive steps from the BDD scenarios
6. **Run quality gates**: `npm run lint`, SonarQube scan, Jest coverage
7. **Pause** and await PR comment `✅ looks good` from repository owner. If not received within 24 h, post a gentle reminder and keep waiting
8. After confirmation, push final commit & create PR `[feat] <Screen>` targeting `main`

**Component Reuse Priority:**

1. **First**: Check if existing component can be reused as-is
2. **Second**: Extend existing component with new variant/props
3. **Last Resort**: Create entirely new component

Strictly adhere to linting rules (`.eslintrc`), SonarQube gate, and test coverage thresholds. **Never override copilot_guide.md**, workflow files, or manually‑written code without explicit instructions.

---

## 5 Developer Workflow (You)

```text
# 1. design & export from Uizard
# 2. organize assets into folder structure:
#    screenshot/ → full.png
#    components/ → individual component images
#    assets/ → backgrounds, graphics, logos
#    icons/ → all icon assets
# 3. commit + push (triggers asset analysis)
# 4. review BDD PR (check auto-generated scenarios)
# 5. merge after edits (label accepted-bdd)
# 6. wait for [feat] PR (review generated code & design system updates)
# 7. run the app locally, verify UI matches design
# 8. comment "✅ looks good" to trigger final commit
```

Scripts to help:

```bash
npm run web           # Expo web
npm run ios           # Expo iOS
npm run android       # Expo Android
npm run lint          # ESLint
npm test              # Jest unit + integration
npm run e2e:ios       # Appium iOS
npm run e2e:android   # Appium Android
npm run e2e:web       # Playwright
```

---

## 6 Milestone Template

| Milestone    | Screens                 | Target Date |
| ------------ | ----------------------- | ----------- |
| M0 – Setup   | Splash, Home stub       | 10 Aug 2025 |
| M1 – Auth    | Welcome, Sign‑Up, Login | 17 Aug 2025 |
| M2 – Profile | Profile, Settings       | 24 Aug 2025 |

Add `[BDD]` and `[feat]` PRs to milestones for tracking.

---

### Remember

- **All pre‑commit gates are mandatory**.
- **Asset analysis happens automatically** when you add new items.
- **Components are reused intelligently** to maintain consistency.
- **No automated commit proceeds without your manual OK**.
- **This guide is immutable unless you direct otherwise**.
