import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';
import { developerTemplate } from '$lib/data/templates/developer';

export const load: PageServerLoad = async ({ params }) => {
    try {
        // Special case for developer template
        if (params.id === 'dev-template-v1') {  // Match the ID from developerTemplate
            return {
                template: developerTemplate
            };
        }

        // For templates from the database
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
            throw error(404, 'Template not found');
        }

        return {
            template
        };
    } catch (e) {
        console.error('Error loading template:', e);
        throw error(500, 'Error loading template');
    }
};
