# Icon Assets

This directory contains processed icons from Uizard designs. Icons are automatically integrated into the Icon component system.

## Current Icons:

- Navigation icons: nav-home, nav-profile, nav-settings
- Action icons: action-send, action-edit, action-delete
- Status icons: status-online, status-offline, status-success, status-error

## Usage:

```tsx
import { Icon } from '@/design-system';

<Icon name="nav-home" size="md" color="#007AFF" />;
```

Icons are automatically processed and registered when you add them to `reference/<screen>/icons/` folders.
