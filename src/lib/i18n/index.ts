import { init, register, locale, waitLocale } from 'svelte-i18n';
import { browser } from '$app/environment';

// Register translations
register('en', () => import('./locales/en.json'));
register('sv', () => import('./locales/sv.json'));

// Initialize i18n
export async function setupI18n() {
  const defaultLocale = 'en';
  let initialLocale = defaultLocale;

  // Only check localStorage in the browser
  if (browser) {
    const storedLocale = localStorage.getItem('lang');
    console.log('Stored locale:', storedLocale);
    if (storedLocale) {
      initialLocale = storedLocale;
    }
  }

  console.log('Setting initial locale to:', initialLocale);

  init({
    fallbackLocale: defaultLocale,
    initialLocale
  });

  // Subscribe to locale changes
  if (browser) {
    locale.subscribe(value => {
      console.log('Locale changed to:', value);
      if (value && value !== initialLocale) {
        localStorage.setItem('lang', value);
      }
    });
  }

  await waitLocale();
}
