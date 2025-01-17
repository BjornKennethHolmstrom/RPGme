import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ url }) => {
  try {
    const visibility = url.searchParams.get('visibility') || 'public';
    
    const sheets = await prisma.characterSheet.findMany({
      where: {
        isPublished: true,
        visibility: visibility
      },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        },
        sheetTemplate: {
          select: {
            name: true,
            structure: true
          }
        }
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return json(sheets);
  } catch (error) {
    console.error('Error fetching sheets:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch sheets' }), {
      status: 500
    });
  }
};

export const POST: RequestHandler = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, templateId, data, visibility = 'private' } = body;

    // TODO: Get actual user ID from session
    const userId = 'placeholder-user-id';

    const sheet = await prisma.characterSheet.create({
      data: {
        name,
        templateId,
        data,
        visibility,
        userId,
        level: 1
      },
      include: {
        sheetTemplate: {
          select: {
            name: true,
            structure: true
          }
        }
      }
    });

    return json(sheet);
  } catch (error) {
    console.error('Error creating sheet:', error);
    return new Response(JSON.stringify({ error: 'Failed to create sheet' }), {
      status: 500
    });
  }
};
