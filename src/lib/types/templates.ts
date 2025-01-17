// Categories
export type TemplateCategory = 
  | 'Professional'
  | 'Creative'
  | 'Technical'
  | 'Academic'
  | 'Personal'
  | 'Gaming';

// Field Types
export type FieldType = 
  | 'text'
  | 'number'
  | 'progress'
  | 'skill'
  | 'list'
  | 'multiline'
  | 'stat'
  | 'specialty'
  | 'achievement'
  | 'project'
  | 'tags'
  | 'links'
  | 'image';

export type LayoutType = 'single' | 'double' | 'triple' | 'grid';

// Base Field
export interface BaseField {
  id: string;
  name: string;
  type: FieldType;
  description?: string;
  required?: boolean;
  defaultValue?: any;
}

// Specific Field Types
export interface TextField extends BaseField {
  type: 'text' | 'multiline';
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

export interface ProgressField extends BaseField {
  type: 'progress';
  min: number;
  max: number;
  showValue?: boolean;
}

export interface SkillField extends BaseField {
  type: 'skill';
  level: number;
  maxLevel: number;
  category?: string;
  dependencies?: string[];
}

export interface ListField extends BaseField {
  type: 'list';
  allowTags?: boolean;
  allowDescriptions?: boolean;
  availableTags?: string[];
  placeholder?: string;
}

export interface StatField extends BaseField {
  type: 'stat';
  value: number;
  minValue: number;
  maxValue: number;
  category: string;
}

export interface TagsField extends BaseField {
  type: 'tags';
  options?: string[];
  maxTags?: number;
}

export interface LinksField extends BaseField {
  type: 'links';
  allowTypes?: ('github' | 'website' | 'linkedin' | 'twitter' | 'other')[];
}

export interface ImageField extends BaseField {
  type: 'image';
  maxSize?: number; // in bytes
  allowedTypes?: string[]; // e.g., ['image/jpeg', 'image/png']
  aspectRatio?: number;
}

export type Field = 
  | TextField 
  | NumberField 
  | ProgressField 
  | SkillField 
  | ListField 
  | StatField
  | TagsField
  | LinksField
  | ImageField;

// Section
export interface Section {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  layout: LayoutType;
  fields: Field[];
}

// Complete Template
export interface Template {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  sections: Section[];
  
  // Metadata
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  creatorId: string;
  creator?: {
    name: string;
    image?: string;
  };
  
  // Stats
  usageCount?: number;
  rating?: number;
  
  // Customization
  previewImage?: string;
  tags?: string[];
  
  // Theme
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}
