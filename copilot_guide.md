# Copilot Guide for Screen‑Driven Development

> **Do not ov```

### 2.1  Mobile Design Library

The design system in `src/components/design-system/` provides reusa| Milestone    | Screens                 | Target Date |
| ------------ | ----------------------- | ----------- |
| M0 – Setup   | Splash, Home stub       | 10 Aug 2025 |
| M1 – Auth    | Welcome, Sign‑Up, Login | 17 Aug 2025 |
| M2 – Profile | Profile, Settings       | 24 Aug 2025 |omponents that automatically inherit styling from Uizard assets:

- **theme.ts**: Design tokens (colors, typography, spacing, shadows)
- **Button.tsx**: Configurable button component with variants
- **Input.tsx**: Form input with validation states
- **Card.tsx**: Container component with elevation
- **index.ts**: Consolidated exports

When assets are placed in `reference/<screen-slug>/assets/`, the Agent-RN will:
1. Analyze colors, fonts, and spacing from your designs
2. Update the design system theme accordingly
3. Generate new components if needed
4. Ensure consistency across all screens

### 2.2  Submodulesrite or remove any paragraphs in this guide unless the repository owner (you) explicitly instructs otherwise.**

This document defines the non‑negotiable automation workflow that powers feature‑first React Native (mobile + web) development driven by Uizard screenshots.

---

## 1  Process Overview

1. **Design** a screen in Uizard.
2. **Drop assets** into `reference/<screen‑slug>/`:
   - `screenshot/full.png` – full‑page mock‑up.
   - `assets/` – icons, images, SVGs.
3. A GitHub workflow (*Copilot Agent‑RN*) **auto‑generates a BDD **``** file** ➜ opens PR `[BDD] <Screen>`.
4. **You review / edit / merge** the BDD PR (label `accepted-bdd`).
5. Agent‑RN then **generates code + tests** ➜ PR `[feat] <Screen>`.
6. **Before any commit is finalised** the following **gates must all pass and be approved by you**:
   1. **ESLint** (`npm run lint`).
   2. **SonarQube Quality Gate** (≥ A rating, 0 code smells, 0 bugs, 80%+ coverage **project‑wide**, 100% for the new screen).
   3. **Unit tests** (100% coverage for the new screen).
   4. **Integration tests** (100% coverage for the new screen).
   5. **E2E tests**: Appium (iOS & Android) and Playwright (Web) generated from the confirmed BDD scenarios and passing on CI devices.
   6. **Manual confirmation**: the bot pauses and waits for a PR comment containing `✅ looks good` from you before pushing the final commit.

If any gate fails or if confirmation is missing the commit is aborted.

---

## 2  Repository Layout

```text
reference/
└── <screen‑slug>/
    ├── screenshot/full.png
    ├── assets/*              # Icons, images, SVGs from Uizard
    └── README.md             # Instructions for asset placement
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

### 2.1  Submodules

```bash
git submodule add https://github.com/noisegatemusicstudio/universal-appium2-framework submodules/appium-framework
git submodule add https://github.com/noisegatemusicstudio/universal-playwright-framework submodules/playwright-framework
```

Workflows reference test helpers & config from these submodules; keep them updated via `git submodule update --remote`.

---

## 3  Automated CI Workflow (.github/workflows/copilot.yml)

### Trigger

- `push` / `pull_request` on `reference/**` or `bdd/**` or `src/**`.

### Jobs (high‑level)

1. **bdd‑generate** – On new reference folder ➜ OCR + heuristics ➜ drafts BDD ➜ PR.
2. **code‑generate** – Post‑merge of BDD PR ➜ generates screen code + tests.
3. **pre‑commit‑checks (lint + sonar + tests)** – runs on each push to a `[feat]` branch.
4. **await‑manual‑confirm** – `actions/github-script` waits until the PR author comments `✅ looks good`.
5. **final‑commit** – merges generated code into branch once the above succeed.

### Required Status Checks

`eslint`, `sonarqube`, `unit-test`, `integration-test`, `e2e-ios`, `e2e-android`, `e2e-web`, `manual-confirm`.

---

## 4  Copilot Agent Prompt (internal)

You are GitHub Copilot **Agent‑RN**. When a new `reference/<screen‑slug>/` is added:

1. **Infer UI** from `screenshot/full.png` + optional `meta.json`.
2. **Draft BDD** into `bdd/<screen‑slug>.feature` with 1‑3 core scenarios and edge cases.
3. Open PR `[BDD] <Screen>`. Do **not** proceed until the PR is merged & labelled `accepted-bdd`.
4. **Generate screen code** into `src/screens/` + styles + atomic components.
5. **Create tests**:
   - **Unit**: `tests/<slug>/unit.test.tsx` – render & assert component behaviour. Achieve 100% stmt/branch/func/line for this file.
   - **Integration**: `tests/<slug>/integration.test.tsx` – test Redux, navigation, API mocks.
   - **E2E**:
     - Appium (iOS): `e2e.appium.ios.test.ts`
     - Appium (Android): `e2e.appium.android.test.ts`
     - Playwright (Web): `e2e.playwright.web.test.ts` All E2E tests derive steps from the BDD scenarios.
6. **Run quality gates**: `npm run lint`, SonarQube scan, Jest coverage.
7. **Pause** and await PR comment `✅ looks good` from repository owner. If not received within 24 h, post a gentle reminder and keep waiting.
8. After confirmation, push final commit & create PR `[feat] <Screen>` targeting `main`.

Strictly adhere to linting rules (`.eslintrc`), SonarQube gate, and test coverage thresholds. **Never override docs/copilot-guide.md**, workflow files, or manually‑written code without explicit instructions.

---

## 5  Developer Workflow (You)

```text
# 1. design & export
# 2. place assets
# 3. commit + push
# 4. review BDD PR
# 5. merge after edits (label accepted-bdd)
# 6. wait for [feat] PR
# 7. run the app locally, verify UI
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

## 6  Milestone Template

| Milestone    | Screens                 | Target Date |
| ------------ | ----------------------- | ----------- |
| M0 – Setup   | Splash, Home stub       | DD MMM 2025 |
| M1 – Auth    | Welcome, Sign‑Up, Login | DD MMM 2025 |
| M2 – Profile | Profile, Settings       | DD MMM 2025 |

Add `[BDD]` and `[feat]` PRs to milestones for tracking.

---

### Remember

- **All pre‑commit gates are mandatory**.
- **No automated commit proceeds without your manual OK**.
- **This guide is immutable unless you direct otherwise.**

