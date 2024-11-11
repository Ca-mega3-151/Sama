import { auth } from '../../Auth/locales/auth';
import { CommonLocales } from './locales/common';
import { ComponentsLocales } from './locales/components';
import { DashboardLocales } from './locales/dashboard';
import { DashboardLayoutLocales } from './locales/dashboard_layout';
import { ErrorMessageLocales } from './locales/error_message';
import { Page403Locales } from './locales/page403';
import { Page404Locales } from './locales/page404';
import { Page500Locales } from './locales/page500';
import { BrandingLocales } from '~/packages/Branding/locales/branding';
import { BrandingStandardLocales } from '~/packages/BrandingStandard/locales/brandingStandard';
import { getPublicEnv } from '~/utils/functions/getPublicEnv';

// This is the list of languages your application supports
const supportedLngs = ['en', 'fr'];

// This is the language you want to use in case
// if the user language is not in the supportedLngs
const fallbackLng = getPublicEnv('VITE_DEFAULT_LANGUAGE');

// The default namespace of i18next is "translation", but you can customize it here
const defaultNS = 'translation';

const resources = {
  en: {
    translation: {},
    components: ComponentsLocales.en,
    common: CommonLocales.en,
    auth: auth.en,
    error_message: ErrorMessageLocales.en,
    page403: Page403Locales.en,
    page404: Page404Locales.en,
    page500: Page500Locales.en,
    branding: BrandingLocales.en,
    branding_standard: BrandingStandardLocales.en,
    dashboard_layout: DashboardLayoutLocales.en,
    dashboard: DashboardLocales.en,
  },
  fr: {
    translation: {},
    common: CommonLocales.fr,
  },
};

export const i18nConfig = {
  supportedLngs,
  fallbackLng,
  defaultNS,
  resources,
};

declare module 'i18next' {
  interface CustomTypeOptions {
    resources: (typeof resources)['en'];
  }
}
