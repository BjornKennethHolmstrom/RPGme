import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { prisma } from '$lib/server/prisma';

export const GET: RequestHandler = async ({ params }) => {
  try {
    const template = await prisma.sheetTemplate.findUnique({
      where: {
        id: params.id
      },
      include: {
        creator: {
          select: {
            name: true
          }
        }
      }
    });

    if (!template) {
      return new Response(JSON.stringify({ error: 'Template not found' }), {
        status: 404
      });
    }

    return json(template);
  } catch (error) {
    console.error('Error fetching template:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch template' }), {
      status: 500
    });
  }
};

export const PUT: RequestHandler = async ({ params, request }) => {
  try {
    const body = await request.json();
    const { name, description, structure, isPublic } = body;

    // TODO: Check if user has permission to update this template

    const template = await prisma.sheetTemplate.update({
      where: {
        id: params.id
      },
      data: {
        name,
        description,
        structure,
        isPublic
      }
    });

    return json(template);
  } catch (error) {
    console.error('Error updating template:', error);
    return new Response(JSON.stringify({ error: 'Failed to update template' }), {
      status: 500
    });
  }
};

export const DELETE: RequestHandler = async ({ params }) => {
  try {
    // TODO: Check if user has permission to delete this template

    await prisma.sheetTemplate.delete({
      where: {
        id: params.id
      }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting template:', error);
    return new Response(JSON.stringify({ error: 'Failed to delete template' }), {
      status: 500
    });
  }
};
