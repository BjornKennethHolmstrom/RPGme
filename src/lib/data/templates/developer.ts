import type { Template } from '$lib/types/template';

export const developerTemplate: Template = {
  id: 'dev-template-v1',
  name: 'Full-Stack Developer',
  description: 'A comprehensive template for software developers to showcase their skills, projects, and professional journey.',
  category: 'Professional',
  
  sections: [
    {
      id: 'prof-info',
      title: 'Professional Information',
      icon: 'user',
      layout: 'double',
      description: 'Basic information about your professional background',
      fields: [
        {
          id: 'role',
          name: 'Current Role',
          type: 'text',
          required: true,
          description: 'Your current job title or role',
          placeholder: 'e.g., Senior Full-Stack Developer'
        },
        {
          id: 'experience',
          name: 'Years of Experience',
          type: 'number',
          required: true,
          min: 0,
          max: 50,
          unit: 'years'
        },
        {
          id: 'avatar',
          name: 'Profile Picture',
          type: 'image',
          description: 'A professional photo of yourself',
          allowedTypes: ['image/jpeg', 'image/png'],
          maxSize: 5 * 1024 * 1024, // 5MB
          aspectRatio: 1
        },
        {
          id: 'background',
          name: 'Professional Background',
          type: 'multiline',
          description: 'Brief overview of your professional journey'
        }
      ]
    },
    {
      id: 'skills',
      title: 'Technical Skills',
      icon: 'code',
      layout: 'grid',
      fields: [
        {
          id: 'primary-skills',
          name: 'Core Skills',
          type: 'skill',
          level: 0,
          maxLevel: 5,
          category: 'technical',
          description: 'Your main areas of expertise'
        },
        {
          id: 'technologies',
          name: 'Technologies',
          type: 'tags',
          description: 'Technologies you work with',
          options: [
            'JavaScript', 'TypeScript', 'Python', 'React', 'Node.js', 
            'PostgreSQL', 'Docker', 'AWS', 'Git'
          ],
          maxTags: 10
        }
      ]
    },
    {
      id: 'stats',
      title: 'Developer Stats',
      icon: 'chart',
      layout: 'triple',
      fields: [
        {
          id: 'problem-solving',
          name: 'Problem Solving',
          type: 'stat',
          value: 0,
          minValue: 0,
          maxValue: 100,
          category: 'technical'
        },
        {
          id: 'code-quality',
          name: 'Code Quality',
          type: 'stat',
          value: 0,
          minValue: 0,
          maxValue: 100,
          category: 'technical'
        },
        {
          id: 'collaboration',
          name: 'Team Collaboration',
          type: 'stat',
          value: 0,
          minValue: 0,
          maxValue: 100,
          category: 'soft'
        }
      ]
    },
    {
      id: 'projects',
      title: 'Projects & Contributions',
      icon: 'folder',
      layout: 'single',
      fields: [
        {
          id: 'projects-list',
          name: 'Projects',
          type: 'list',
          allowTags: true,
          allowDescriptions: true,
          availableTags: ['Frontend', 'Backend', 'Full-Stack', 'DevOps', 'Mobile'],
          placeholder: 'Add a project'
        }
      ]
    },
    {
      id: 'links',
      title: 'Professional Links',
      icon: 'link',
      layout: 'double',
      fields: [
        {
          id: 'social-links',
          name: 'Social & Professional Links',
          type: 'links',
          allowTypes: ['github', 'linkedin', 'website', 'twitter'],
          description: 'Connect with me professionally'
        }
      ]
    }
  ],

  isPublic: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  creatorId: 'rpgme-team',
  creator: {
    name: 'RPGme Team',
    image: null
  },
  usageCount: 0,
  rating: 5,
  tags: ['developer', 'full-stack', 'software-engineer', 'tech'],
  
  theme: {
    primary: '#2563eb',    // Blue
    secondary: '#4f46e5',  // Indigo
    accent: '#10b981',     // Emerald
    background: '#ffffff'   // White
  }
};
