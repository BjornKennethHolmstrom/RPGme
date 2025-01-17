import { setupI18n } from '$lib/i18n';
import type { LayoutLoad } from './$types';
import { browser } from '$app/environment';

export const load: LayoutLoad = async () => {
    console.log('Layout load running, browser:', browser);
    await setupI18n();
    return {};
};
