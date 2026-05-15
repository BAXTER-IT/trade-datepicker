# Angular 15 → Angular 19 Upgrade Plan — `trade-datepicker`

This document is the step-by-step plan for upgrading this repository from **Angular 15.2.x** to **Angular 19 (latest stable)**.

The repository contains **two Angular projects** in a single workspace:

| Project | Type | Path |
|---|---|---|
| `AngularMyDatePicker` | **Library** (published as `trade-datepicker`) | `projects/angular-mydatepicker` |
| `angular-mydatepicker-example` | Application (demo) | `example/` |

Both must be migrated together, in lock-step, for every Angular major version.

---

## Decisions

| # | Topic | Decision |
|---|---|---|
| 1 | Protractor / e2e | **Drop entirely.** Delete `e2e/`, remove `e2e` builder & project from `angular.json`, remove `protractor` and `@types/jasminewd2` from `package.json`. (Cypress/Playwright can be added later as a separate task.) |
| 2 | Linting | **Migrate TSLint → ESLint** via `ng add @angular-eslint/schematics`. Remove `tslint`, `codelyzer`, `tsickle`, `tslint.json`, all `lint` builder configs that use `@angular-devkit/build-angular:tslint`. |
| 3 | Optional code-style migrations | **Defer** to a separate task — `@if/@for` control-flow, standalone components, `inject()`. Done **after** the v19 upgrade is green. |
| 4 | Test runner | **Keep Karma + Jasmine.** No migration to Jest / web-test-runner in this task. |
| 5 | Angular version | **Latest stable 19.x** (not pre-release, not `next`). |

---

## Prerequisites

- **Node.js**: 20.11+ LTS or 22.x (Angular 19 also accepts 18.19+, but we recommend 20 LTS).
- **npm**: 10+
- **Git**: working tree must be clean before each `ng update` (the schematics refuse to run otherwise).
- **Branch**: do all of this on a dedicated branch, e.g. `feat/upgrade-angular-19`.

> ⚠️ **Important:** Angular does not support skipping major versions. We must upgrade **15 → 16 → 17 → 18 → 19** in that exact order, committing per major. This is the officially supported migration path; each `ng update` runs the schematics for that step.

---

## Current state snapshot (as of this plan)

`package.json`
- `@angular/*`: `~15.2.8`
- `@angular/cli`, `@angular-devkit/build-angular`: `~15.2.6`
- `ng-packagr`: `^15.2.2`
- `typescript`: `~4.9.5`
- `zone.js`: `~0.13.0`
- `rxjs`: `~7.8.0`
- `tslint`, `codelyzer`, `protractor`, `tsickle`, `@types/jasminewd2`, `ts-node@7`, `@types/node@~8.9.4` — all **legacy / to remove**.

`tsconfig.json`
- `target: "es5"`, `module: "es2015"`, `lib: ["es2018","dom"]` — must be raised to `ES2022`.

`projects/angular-mydatepicker/tsconfig.lib.json`
- Contains legacy ViewEngine flags: `enableIvy`, `annotateForClosureCompiler`, `skipTemplateCodegen`, `strictMetadataEmit`, `fullTemplateTypeCheck` — must be removed.
- `compilationMode: "partial"` — keep (correct for library).

`angular.json`
- Has `defaultProject` (deprecated, removed by Angular 17 schematic).
- `serve` and `extract-i18n` use `browserTarget` (renamed to `buildTarget` in v17).
- Has `@angular-devkit/build-angular:tslint` lint builders — to be removed.

`example/polyfills.ts`
- Uses old import path: `import 'zone.js/dist/zone';` — must be `import 'zone.js';`.

`projects/angular-mydatepicker/package.json` (peerDependencies)
- `@angular/common`, `@angular/core` `^15.2.8`. **`@angular/forms` is missing**, even though the library uses Forms (`NG_VALUE_ACCESSOR` in `angular-mydatepicker.input.ts`). Add it during the upgrade.

---

## Step-by-step procedure

### Step 0 — Preparation

```bash
node -v        # must be >= 20.11 (or 22.x)
git checkout -b feat/upgrade-angular-19
git status     # must be clean
```

Tag the starting point so we can roll back: `git tag pre-ng-upgrade`.

---

### Step 1 — Pre-upgrade cleanup (still on Angular 15)

These removals are required because the tools they refer to are removed in Angular 16+. Do them **before** the first `ng update` so the migrations don't trip over them.

1. **Drop Protractor / e2e**
   - Delete folder: `e2e/`
   - In `angular.json`: remove the `angular-mydatepicker-example-e2e` project entry and any `e2e` architect entries.
   - In `package.json`:
     - Remove from `devDependencies`: `protractor`, `@types/jasminewd2`.
     - Remove `e2e` script.

2. **Replace TSLint with ESLint**
   ```bash
   npx ng add @angular-eslint/schematics@15
   ```
   (Use the v15 version while we're still on Angular 15; later `ng update` calls will bump it.)
   - Remove `tslint.json`, `example/tslint.json`, `projects/angular-mydatepicker/tslint.json`.
   - In `angular.json`: remove every `lint` architect using `@angular-devkit/build-angular:tslint` (the schematic should already replace them with `@angular-eslint/builder:lint`).
   - In `package.json`: remove `tslint`, `codelyzer`, `tsickle` from `devDependencies`.

3. **Modernize misc dev dependencies**
   - `@types/node`: `~8.9.4` → `^20.11.0`
   - `ts-node`: `~7.0.0` → `^10.9.2`
   - `fs-extra`: `^8.0.1` → `^11.2.0`
   - Remove `codecov` (deprecated CLI) — keep only if you actually use it.

4. **Fix zone.js import**
   - In `example/polyfills.ts`:
     ```ts
     import 'zone.js';
     ```
     (instead of `import 'zone.js/dist/zone';`)

5. Smoke-build to make sure cleanup didn't break anything:
   ```bash
   npm install
   npm run build-lib
   npm run build
   npm run test-lib
   ```

Commit: `chore(deps): pre-upgrade cleanup (drop tslint/protractor/tsickle, fix zone.js import)`

---

### Step 2 — Upgrade to Angular 16

```bash
npx @angular/cli@16 update @angular/cli@16 @angular/core@16
npx @angular/cli@16 update @angular-eslint/schematics@16
npx @angular/cli@16 update ng-packagr@16
```

Manual follow-ups:
- `typescript` → `~5.1.6` (the schematic will set this).
- `zone.js` stays at `~0.13.x`.
- `rxjs` stays at `~7.8.x`.
- Update **library peerDependencies** in `projects/angular-mydatepicker/package.json`:
  ```json
  "peerDependencies": {
    "@angular/common": "^16.0.0",
    "@angular/core":   "^16.0.0",
    "@angular/forms":  "^16.0.0"
  }
  ```
- Run `npm run build-lib && npm run build && npm run test-lib`. Fix anything red.

Commit: `chore(deps): upgrade to Angular 16`

---

### Step 3 — Upgrade to Angular 17

```bash
npx @angular/cli@17 update @angular/cli@17 @angular/core@17
npx @angular/cli@17 update @angular-eslint/schematics@17
npx @angular/cli@17 update ng-packagr@17
```

Notable v17 items relevant to this repo:
- `typescript` → `~5.2.2`.
- `zone.js` → `~0.14.x`.
- The schematic **removes `defaultProject`** from `angular.json` (good — it was deprecated).
- The schematic **renames `browserTarget` → `buildTarget`** in the `serve` and `extract-i18n` configurations.
- Node 18.13+ required.
- We **stay on the `@angular-devkit/build-angular:browser` builder** — do **not** accept the optional migration to the new `application` builder. The current esbuild-based `application` builder doesn't yet handle every legacy CLI option we use, and switching is out of scope for this upgrade.
- Update library peerDependencies to `^17.0.0`.
- Build & test again.

Commit: `chore(deps): upgrade to Angular 17`

---

### Step 4 — Upgrade to Angular 18

```bash
npx @angular/cli@18 update @angular/cli@18 @angular/core@18
npx @angular/cli@18 update @angular-eslint/schematics@18
npx @angular/cli@18 update ng-packagr@18
```

Notable v18 items:
- `typescript` → `~5.4.x`.
- `zone.js` stays at `~0.14.x`.
- The legacy `@angular-devkit/build-angular:tslint` builder is fully gone (we already removed it in Step 1).
- Update library peerDependencies to `^18.0.0`.
- Build & test again.

Commit: `chore(deps): upgrade to Angular 18`

---

### Step 5 — Upgrade to Angular 19 (latest stable)

```bash
npx @angular/cli@19 update @angular/cli@19 @angular/core@19
npx @angular/cli@19 update @angular-eslint/schematics@19
npx @angular/cli@19 update ng-packagr@19
```

Notable v19 items:
- `typescript`: `~5.5.x` or `~5.6.x` (per Angular 19's supported range).
- `zone.js` → `~0.15.x`.
- Node ≥ 18.19 / 20.11 / 22.x required.
- **Standalone is the default** for newly generated components. Existing NgModule code (this repo) keeps working unchanged. The schematic adds:
  ```json
  // angular.json -> projects.<project>.schematics
  "@schematics/angular:component": { "standalone": false }
  ```
  if necessary, so that `ng generate component` still produces NgModule-style components matching the existing codebase.
- Update library peerDependencies to `^19.0.0`:
  ```json
  "peerDependencies": {
    "@angular/common": "^19.0.0",
    "@angular/core":   "^19.0.0",
    "@angular/forms":  "^19.0.0"
  }
  ```

Commit: `chore(deps): upgrade to Angular 19`

---

### Step 6 — Post-upgrade fixes specific to this repo

After all `ng update` runs, do the following manual cleanup:

#### 6.1 `tsconfig.json`
Replace the legacy compiler options with modern equivalents:
```jsonc
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "sourceMap": true,
    "declaration": false,
    "module": "ES2022",
    "moduleResolution": "node",
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "target": "ES2022",
    "useDefineForClassFields": false,
    "typeRoots": ["node_modules/@types"],
    "lib": ["ES2022", "dom"],
    "paths": {
      "angular-mydatepicker":   ["dist/angular-mydatepicker"],
      "angular-mydatepicker/*": ["dist/angular-mydatepicker/*"]
    }
  },
  "angularCompilerOptions": {
    "strictTemplates": true
  }
}
```

#### 6.2 `projects/angular-mydatepicker/tsconfig.lib.json`
Remove the dead ViewEngine flags. Resulting file:
```jsonc
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "../../out-tsc/lib",
    "target": "ES2022",
    "module": "ES2022",
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "inlineSources": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "importHelpers": true,
    "types": [],
    "lib": ["dom", "ES2022"]
  },
  "angularCompilerOptions": {
    "compilationMode": "partial",
    "strictInjectionParameters": true,
    "strictTemplates": true
  },
  "exclude": ["src/test.ts", "**/*.spec.ts"]
}
```

#### 6.3 `angular.json`
- Confirm `defaultProject` is gone.
- Confirm `serve` / `extract-i18n` use `buildTarget` (not `browserTarget`).
- Confirm there is no remaining `@angular-devkit/build-angular:tslint` reference.
- Confirm the e2e project entry is gone.

#### 6.4 `example/polyfills.ts`
Either keep the file with `import 'zone.js';` or move polyfills inline (recommended for v15+):
- Delete `example/polyfills.ts`.
- In `angular.json` `architect.build.options`:
  ```json
  "polyfills": ["zone.js"],
  ```
- And in `architect.test.options`:
  ```json
  "polyfills": ["zone.js", "zone.js/testing"],
  ```

#### 6.5 Library peer dependencies
`projects/angular-mydatepicker/package.json`:
```json
{
  "name": "trade-datepicker",
  "version": "3.1.0",
  "peerDependencies": {
    "@angular/common": "^19.0.0",
    "@angular/core":   "^19.0.0",
    "@angular/forms":  "^19.0.0"
  }
}
```
Bump `version` per your release policy.

#### 6.6 Specs
- Verify spec files compile against TS 5.5+ and Angular 19's stricter `TestBed` typings. Adjust any `any` casts that were silently masking issues.

Commit: `chore: post-upgrade cleanup for Angular 19`

---

### Step 7 — Verification

Run **all** of the following and make sure each passes before merging:

```bash
rm -r -fo node_modules, dist
npm ci

# 1. Build the library — must produce FESM2022 + .d.ts under dist/angular-mydatepicker
npm run build-lib

# 2. Build the demo app
npm run build

# 3. Run library unit tests
npm run test-lib

# 4. Lint
npx ng lint

# 5. Manual UI smoke test
npm start
# Then visit each demo route and verify pickers behave the same as before:
#   - date-picker-ngmodel
#   - date-picker-reactive-forms
#   - date-picker-inline
#   - date-picker-div-host-element
```

Optional final check: pack the library and consume it from a throwaway Angular 19 app:
```bash
cd dist/angular-mydatepicker
npm pack
# install the resulting tarball into a fresh `ng new` v19 app and verify it works.
```

---

### Step 8 (optional, separate task) — Modern Angular code-style migrations

To be done **only after** Steps 0–7 are merged and stable.

```bash
# Built-in control flow (@if / @for / @switch)
npx ng generate @angular/core:control-flow

# Standalone components migration (multi-step, interactive)
npx ng generate @angular/core:standalone

# Constructor → inject() migration
npx ng generate @angular/core:inject
```

Each of these is a separate, reviewable PR.

---

## Rollback strategy

- Every step is its own commit on `feat/upgrade-angular-19`. If something breaks irrecoverably at, say, v18, `git reset --hard <previous-step-commit>` and try again.
- The `pre-ng-upgrade` tag created in Step 0 is the absolute last-resort restore point.

---

## Estimated effort

| Step | Estimate |
|---|---|
| Step 0 — Prep | 15 min |
| Step 1 — Cleanup | 1–2 h |
| Step 2 — v16 | 1 h |
| Step 3 — v17 | 1–2 h (config renames) |
| Step 4 — v18 | 30–60 min |
| Step 5 — v19 | 1 h |
| Step 6 — Post-upgrade fixes | 1 h |
| Step 7 — Verification | 1 h |
| **Total** | **~1 working day** |

Optional Step 8 (control-flow + standalone + inject migrations) adds another 0.5–1 day depending on size.
