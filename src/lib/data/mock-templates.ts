export const mockTemplates = [
  {
    id: 'dev-template-1',
    name: 'Full-Stack Developer',
    description: 'A comprehensive template for modern full-stack developers',
    category: 'Professional',
    tags: ['Developer', 'Full-Stack', 'Tech'],
    usageCount: 1240,
    rating: 4.8,
    createdAt: new Date('2024-01-01'),
    creator: {
      name: 'RPGme Team',
      image: null
    },
    sections: [
      {
        id: 'basic-info',
        title: 'Basic Information',
        layout: 'double',
        fields: [
          {
            id: 'role',
            name: 'Current Role',
            type: 'text',
            required: true,
            description: 'Your current job title'
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
            id: 'bio',
            name: 'Professional Bio',
            type: 'text',
            description: 'Brief description of your professional journey'
          }
        ]
      },
      {
        id: 'skills',
        title: 'Technical Skills',
        layout: 'grid',
        fields: [
          {
            id: 'languages',
            name: 'Programming Languages',
            type: 'list',
            allowTags: true,
            availableTags: ['Frontend', 'Backend', 'Mobile', 'Data'],
            placeholder: 'Add a programming language'
          },
          {
            id: 'coding',
            name: 'Coding Level',
            type: 'progress',
            min: 0,
            max: 100,
            showValue: true
          }
        ]
      }
    ],
    theme: {
      primary: '#2563eb',
      secondary: '#4f46e5',
      accent: '#10b981',
      background: '#ffffff'
    }
  },
  // Add more templates here...
];

export function getMockTemplate(id: string) {
  return mockTemplates.find(t => t.id === id) || null;
}
