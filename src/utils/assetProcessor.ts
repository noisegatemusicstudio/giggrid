// Asset Processing Utilities for Uizard Integration
// This module handles intelligent analysis and integration of Uizard assets

export interface AssetAnalysis {
  type: 'component' | 'icon' | 'asset';
  category: string;
  suggestedName: string;
  reusable: boolean;
  existingComponent?: string;
  designTokens?: {
    colors?: string[];
    spacing?: number[];
    fontSize?: number[];
    borderRadius?: number[];
  };
}

export interface ProcessingResult {
  processed: AssetAnalysis[];
  designSystemUpdates: {
    newComponents: string[];
    extendedComponents: string[];
    themeUpdates: Record<string, string | number | boolean>;
  };
  conflicts: string[];
}

/**
 * Analyzes Uizard assets and determines how to integrate them
 * into the mobile design system
 */
export class AssetProcessor {
  private readonly existingComponents: Set<string>;
  private readonly iconRegistry: Record<string, string>;

  constructor() {
    this.existingComponents = new Set(['Button', 'Input', 'Card', 'Icon']);
    this.iconRegistry = {};
  }

  /**
   * Process a folder of Uizard assets
   */
  async processAssetFolder(folderPath: string): Promise<ProcessingResult> {
    const result: ProcessingResult = {
      processed: [],
      designSystemUpdates: {
        newComponents: [],
        extendedComponents: [],
        themeUpdates: {},
      },
      conflicts: [],
    };

    // This would be implemented to actually read and analyze files
    // For now, it's a framework for the AI agent to use

    return result;
  }

  /**
   * Analyze a component asset and determine reusability
   */
  analyzeComponent(fileName: string, imageData?: Buffer): AssetAnalysis {
    const cleanName = this.cleanFileName(fileName);

    // Button detection
    if (cleanName.includes('button')) {
      return {
        type: 'component',
        category: 'button',
        suggestedName: this.generateComponentName(cleanName, 'button'),
        reusable: true,
        existingComponent: 'Button',
      };
    }

    // Input detection
    if (
      cleanName.includes('input') ||
      cleanName.includes('field') ||
      cleanName.includes('textbox')
    ) {
      return {
        type: 'component',
        category: 'input',
        suggestedName: this.generateComponentName(cleanName, 'input'),
        reusable: true,
        existingComponent: 'Input',
      };
    }

    // Card/Container detection
    if (
      cleanName.includes('card') ||
      cleanName.includes('container') ||
      cleanName.includes('box')
    ) {
      return {
        type: 'component',
        category: 'card',
        suggestedName: this.generateComponentName(cleanName, 'card'),
        reusable: true,
        existingComponent: 'Card',
      };
    }

    // New component
    return {
      type: 'component',
      category: 'custom',
      suggestedName: this.generateComponentName(cleanName),
      reusable: false,
    };
  }

  /**
   * Analyze an icon asset
   */
  analyzeIcon(fileName: string): AssetAnalysis {
    const cleanName = this.cleanFileName(fileName);
    const category = this.determineIconCategory(cleanName);

    return {
      type: 'icon',
      category,
      suggestedName: this.generateIconName(cleanName, category),
      reusable: true,
      existingComponent: 'Icon',
    };
  }

  /**
   * Analyze a general asset
   */
  analyzeAsset(fileName: string): AssetAnalysis {
    const cleanName = this.cleanFileName(fileName);
    let category = 'general';

    if (cleanName.includes('background') || cleanName.includes('bg')) {
      category = 'background';
    } else if (cleanName.includes('logo')) {
      category = 'logo';
    } else if (cleanName.includes('pattern')) {
      category = 'pattern';
    } else if (cleanName.includes('graphic')) {
      category = 'graphic';
    }

    return {
      type: 'asset',
      category,
      suggestedName: this.generateAssetName(cleanName, category),
      reusable: category !== 'general',
    };
  }

  /**
   * Generate appropriate component names
   */
  private generateComponentName(fileName: string, type?: string): string {
    const parts = fileName.split(/[-_\s]/);
    const cleaned = parts.map(part => this.capitalize(part)).join('');

    if (type) {
      const typeCapitalized = this.capitalize(type);
      if (!cleaned.includes(typeCapitalized)) {
        return `${cleaned}${typeCapitalized}`;
      }
    }

    return cleaned;
  }

  /**
   * Generate appropriate icon names
   */
  private generateIconName(fileName: string, category: string): string {
    const cleanName = this.cleanFileName(fileName);

    // Remove common icon suffixes
    const withoutSuffix = cleanName.replace(/(-icon|-ico|\.png|\.svg)$/i, '');

    // Add category prefix if not present
    if (!withoutSuffix.startsWith(category + '-')) {
      return `${category}-${withoutSuffix}`;
    }

    return withoutSuffix;
  }

  /**
   * Generate appropriate asset names
   */
  private generateAssetName(fileName: string, category: string): string {
    const cleanName = this.cleanFileName(fileName);

    // Add category prefix if not present
    if (!cleanName.startsWith(category + '-')) {
      return `${category}-${cleanName}`;
    }

    return cleanName;
  }

  /**
   * Determine icon category from filename
   */
  private determineIconCategory(fileName: string): string {
    if (fileName.includes('nav') || fileName.includes('menu')) return 'nav';
    if (fileName.includes('action') || fileName.includes('btn')) return 'action';
    if (fileName.includes('status') || fileName.includes('state')) return 'status';
    if (fileName.includes('social') || fileName.includes('share')) return 'social';
    return 'general';
  }

  /**
   * Clean filename for processing
   */
  private cleanFileName(fileName: string): string {
    return fileName
      .toLowerCase()
      .replace(/\.(png|jpg|jpeg|svg|gif)$/i, '')
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-')
      .replace(/(?:^-|-$)/g, '');
  }

  /**
   * Capitalize first letter of string
   */
  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export const assetProcessor = new AssetProcessor();
