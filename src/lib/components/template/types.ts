// src/lib/components/template/types.ts
export type FieldType = 
  | 'text'           // Simple text input
  | 'number'         // Numeric input
  | 'progress'       // Progress bar
  | 'list'          // List of items
  | 'group'          // Grouped fields
  | 'richText'       // Rich text editor
  | 'skillField'      // RPG-style skill tree
  | 'inventory'      // Items with quantities
  | 'statBlock'      // RPG stats (STR, DEX, etc.)
  | 'achievements'   // Achievements with conditions
  | 'links'          // Social/external links
  | 'tags'           // Tag collection
  | 'image'          // Image upload
  | 'timeline'       // Events/history timeline
  | 'custom';        // Custom field type

export type DisplayStyle =
  | 'default'
  | 'bar'
  | 'stars'
  | 'tags'
  | 'cards'
  | 'tree'
  | 'grid'
  | 'table'
  | 'timeline';

export interface BaseField {
  id: string;
  name: string;
  type: FieldType;
  displayStyle?: DisplayStyle;
  required?: boolean;
  description?: string;
}

export interface TextField extends BaseField {
  type: 'text';
  minLength?: number;
  maxLength?: number;
  placeholder?: string;
}

export interface NumberField extends BaseField {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface SkillTreeField extends BaseField {
  type: 'skillTreeField';
  skills: {
    id: string;
    name: string;
    description: string;
    level: number;
    maxLevel: number;
    dependencies?: string[];
    icon?: string;
  }[];
}

export interface StatBlockField extends BaseField {
  type: 'statBlock';
  stats: {
    name: string;
    abbreviation: string;
    description: string;
    min: number;
    max: number;
    defaultValue: number;
  }[];
}

export interface AchievementField extends BaseField {
  type: 'achievements';
  achievements: {
    id: string;
    name: string;
    description: string;
    icon?: string;
    condition?: string;
    reward?: string;
  }[];
}

export interface InventoryField extends BaseField {
  type: 'inventory';
  categories?: string[];
  maxItems?: number;
  allowStacking?: boolean;
}

export interface TimelineField extends BaseField {
  type: 'timeline';
  dateFormat?: string;
  allowFuture?: boolean;
  categories?: string[];
}

export type Field = 
  | TextField 
  | NumberField 
  | SkillTreeField 
  | StatBlockField 
  | AchievementField 
  | InventoryField 
  | TimelineField;
