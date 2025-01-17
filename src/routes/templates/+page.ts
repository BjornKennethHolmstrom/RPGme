import type { PageLoad } from './$types';
import { mockTemplates } from '$lib/data/mock-templates';

export const load: PageLoad = async () => {
  // This will eventually fetch from your API
  return {
    templates: mockTemplates
  };
};
