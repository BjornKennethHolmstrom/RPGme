export interface BaseFieldProps {
  id: string;
  name: string;
  description?: string;
  required?: boolean;
  disabled?: boolean;
  value: any;
  editable?: boolean;
}

export interface TextField extends BaseFieldProps {
  type: 'text';
  maxLength?: number;
  minLength?: number;
  placeholder?: string;
}

export interface NumberField extends BaseFieldProps {
  type: 'number';
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
}

export interface ProgressField extends BaseFieldProps {
  type: 'progress';
  min: number;
  max: number;
  showValue?: boolean;
}

export interface SkillTreeField extends BaseFieldProps {
  type: 'skillTree';
  skills: {
    id: string;
    name: string;
    level: number;
    maxLevel: number;
    dependencies?: string[];
  }[];
}

export interface ListField extends BaseFieldProps {
  type: 'list';
  allowTags?: boolean;
  allowDescriptions?: boolean;
  availableTags?: string[];
  placeholder?: string;
}

export type FieldType = 
  | TextField 
  | NumberField 
  | ProgressField 
  | SkillTreeField 
  | ListField;
