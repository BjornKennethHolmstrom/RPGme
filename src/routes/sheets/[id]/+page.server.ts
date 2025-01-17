import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { developerTemplate } from '$lib/data/templates/developer';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
    try {
        // For new sheets
        if (params.id === 'new') {
            return {
                template: developerTemplate,
                sheetData: {}
            };
        }

        // For existing sheets
        const sheet = await prisma.characterSheet.findUnique({
            where: {
                id: params.id
            },
            include: {
                sheetTemplate: true
            }
        });

        if (!sheet) {
            throw error(404, 'Sheet not found');
        }

        return {
            template: sheet.sheetTemplate,
            sheetData: sheet.data
        };
    } catch (e) {
        console.error('Error loading sheet:', e);
        throw error(500, 'Error loading sheet');
    }
};
