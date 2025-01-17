import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const sheet = await prisma.characterSheet.findUnique({
      where: {
        id: params.id
      },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        },
        sheetTemplate: true
      }
    });

    if (!sheet) {
      return new Response(JSON.stringify({ error: 'Sheet not found' }), {
        status: 404
      });
    }

    // TODO: Check visibility permissions

    // Increment view count
    if (sheet.isPublished) {
      await prisma.characterSheet.update({
        where: { id: params.id },
        data: { viewCount: { increment: 1 } }
      });
    }

    return json(sheet);
  } catch (error) {
    console.error('Error fetching sheet:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch sheet' }), {
      status: 500
    });
  }
};

export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const body = await request.json();
    const { name, data, level, visibility, isPublished } = body;

    // TODO: Check if user has permission to update this sheet

    const sheet = await prisma.characterSheet.update({
      where: {
        id: params.id
      },
      data: {
        name,
        data,
        level,
        visibility,
        isPublished
      },
      include: {
        sheetTemplate: true
      }
    });

    return json(sheet);
  } catch (error) {
    console.error('Error updating sheet:', error);
    return new Response(JSON.stringify({ error: 'Failed to update sheet' }), {
      status: 500
    });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    // TODO: Check if user has permission to delete this sheet

    await prisma.characterSheet.delete({
      where: {
        id: params.id
      }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting sheet:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete sheet' }), {
      status: 500
    });
  }
};
