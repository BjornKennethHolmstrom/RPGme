// Base types for all fields
export interface BaseField {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  description?: string;
}

// Core Professional Info
export interface ProfessionalInfoField extends BaseField {
  type: 'text' | 'number' | 'date' | 'multiline';
}

// Skills and Technologies
export interface SkillField extends BaseField {
  type: 'skill';
  level: number;
  maxLevel: number;
  category: string;
  dependencies?: string[];  // IDs of prerequisite skills
  yearsOfExperience?: number;
}

export interface SkillTreeNode {
  skill: SkillField;
  children: SkillTreeNode[];
}

// Projects
export interface Project {
  name: string;
  description: string;
  role: string;
  technologies: string[];
  startDate: Date;
  endDate?: Date;
  achievements: string[];
  metrics?: {
    type: string;
    value: number;
    unit: string;
  }[];
}

export interface ProjectField extends BaseField {
  type: 'project';
  status: 'completed' | 'in-progress' | 'planned';
  visibility: 'public' | 'private';
}

// Stats & Attributes
export interface StatField extends BaseField {
  type: 'stat';
  value: number;
  minValue: number;
  maxValue: number;
  category: 'technical' | 'soft' | 'leadership';
}

// Professional Journey
export interface Achievement {
  title: string;
  date: Date;
  description: string;
  type: 'certification' | 'award' | 'publication' | 'talk' | 'contribution';
  url?: string;
  organization?: string;
}

export interface AchievementField extends BaseField {
  type: 'achievement';
  achievements: Achievement[];
}

// Specialty Areas
export interface SpecialtyField extends BaseField {
  type: 'specialty';
  proficiency: 'expert' | 'advanced' | 'intermediate' | 'beginner' | 'learning';
  category: string;
  relatedSkills: string[];  // IDs of related skills
}

// Template Sections
export interface TemplateSection {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  layout: 'single' | 'double' | 'triple' | 'grid';
  fields: (
    | ProfessionalInfoField 
    | SkillField 
    | ProjectField 
    | StatField 
    | AchievementField 
    | SpecialtyField
  )[];
}

// Complete Developer Template Type
export interface DeveloperTemplate {
  id: string;
  name: string;
  description: string;
  version: string;
  category: 'developer';
  sections: {
    professionalInfo: TemplateSection;
    skills: TemplateSection;
    projects: TemplateSection;
    stats: TemplateSection;
    journey: TemplateSection;
    specialties: TemplateSection;
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    author: string;
    isPublic: boolean;
    tags: string[];
  };
  theme: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
}
