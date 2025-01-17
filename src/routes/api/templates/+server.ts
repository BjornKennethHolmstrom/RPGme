import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const templates = await prisma.sheetTemplate.findMany({
      where: {
        isPublic: true
      },
      include: {
        creator: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch templates' }), {
      status: 500
    });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, description, structure } = body;

    // TODO: Get actual user ID from session
    const creatorId = 'placeholder-user-id';

    const template = await prisma.sheetTemplate.create({
      data: {
        name,
        description,
        structure,
        creatorId
      }
    });

    return json(template);
  } catch (error) {
    console.error('Error creating template:', error);
    return new Response(JSON.stringify({ error: 'Failed to create template' }), {
      status: 500
    });
  }
};
