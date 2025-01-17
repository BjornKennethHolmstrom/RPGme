import { PrismaClient } from '@prisma/client';
import { DEV_USER_ID } from '../src/lib/server/dev-user';

const prisma = new PrismaClient();

async function main() {
  // Create development user
  const devUser = await prisma.user.upsert({
    where: { id: DEV_USER_ID },
    update: {},
    create: {
      id: DEV_USER_ID,
      name: 'Development User',
      email: 'dev@example.com'
    }
  });

  // Create a sample template
  const devTemplate = await prisma.sheetTemplate.create({
    data: {
      name: 'Developer Class Template',
      description: 'A template for software developers',
      isPublic: true,
      creatorId: devUser.id,
      structure: {
        sections: [
          {
            id: 'basic',
            title: 'Basic Info',
            icon: 'user',
            layout: 'double',
            fields: [
              {
                id: 'name',
                name: 'Character Name',
                type: 'text',
                required: true
              },
              {
                id: 'level',
                name: 'Level',
                type: 'number',
                min: 1,
                max: 100
              }
            ]
          },
          {
            id: 'skills',
            title: 'Skills',
            icon: 'code',
            layout: 'single',
            fields: [
              {
                id: 'programming-languages',
                name: 'Programming Languages',
                type: 'list',
                allowTags: true,
                availableTags: ['Frontend', 'Backend', 'Mobile']
              }
            ]
          }
        ]
      }
    }
  });

  console.log('Development data seeded:', { devUser, devTemplate });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
