# Welcome Screen Assets

Place your Uizard design assets here using the following structure:

## Required Folder Structure:

### 📸 `screenshot/`

- `full.png` - Complete screen mockup from Uizard (REQUIRED)

### 🧩 `components/`

- Individual component exports from Uizard
- Examples: `button-primary.png`, `input-field.png`, `card-user.png`
- Will be analyzed and integrated into the mobile design library

### 🎨 `assets/`

- General design assets (backgrounds, graphics, logos)
- Examples: `background.png`, `logo.png`, `pattern-dots.png`

### 🔗 `icons/`

- Icon-specific assets and SVGs
- Examples: `nav-home.svg`, `action-send.png`, `status-online.svg`

## Intelligent Processing:

When you add items, the Copilot Agent will:

1. **Analyze** each asset to understand its purpose
2. **Compare** with existing design system components
3. **Rename** appropriately for consistency
4. **Integrate** into mobile design library (`src/components/design-system/`)
5. **Reuse** existing components wherever possible
6. **Extend** components with new variants when needed
7. **Create** new components only when truly unique

## Next Steps:

1. Add your Uizard assets to the appropriate folders
2. Commit and push changes
3. The automated workflow will process and integrate everything
4. Review the generated BDD scenarios and code
