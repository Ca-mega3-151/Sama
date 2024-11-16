import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as EditBrandingStandardWithPage from './src/_dashboard.branding-standard-with-page.$id.edit';
import * as DeleteBrandingStandardWithPage from './src/_dashboard.branding-standard-with-page.api.$id.delete';
import * as CreateBrandingStandardWithPage from './src/_dashboard.branding-standard-with-page.create';
import { BrandingStandardWithPageBaseUrl } from './src/constants/BaseUrl';

const BrandingStandardWithPageRoutes: RouteObject[] = [
  {
    path: BrandingStandardWithPageBaseUrl,
    lazy: async () => {
      const module = await import('./src/_dashboard.branding-standard-with-page._index');
      return {
        loader: module.loader,
        shouldRevalidate: module.shouldRevalidate,
        errorElement: <module.ErrorBoundary />,
        element: (
          <Suspense fallback={null}>
            <module.Page />
          </Suspense>
        ),
      };
    },
  },
  {
    path: `${BrandingStandardWithPageBaseUrl}/:id/edit`,
    action: EditBrandingStandardWithPage.action,
    loader: EditBrandingStandardWithPage.loader,
    element: <EditBrandingStandardWithPage.Page />,
    shouldRevalidate: EditBrandingStandardWithPage.shouldRevalidate,
    errorElement: <EditBrandingStandardWithPage.ErrorBoundary />,
  },
  {
    path: `${BrandingStandardWithPageBaseUrl}/create`,
    action: CreateBrandingStandardWithPage.action,
    element: <CreateBrandingStandardWithPage.Page />,
    errorElement: <CreateBrandingStandardWithPage.ErrorBoundary />,
  },
  {
    path: `${BrandingStandardWithPageBaseUrl}/:id/delete`,
    action: DeleteBrandingStandardWithPage.action,
  },
];

export default BrandingStandardWithPageRoutes;
