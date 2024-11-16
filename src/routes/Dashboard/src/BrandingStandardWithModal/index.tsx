import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DeleteBrandingStandardWithModal from './src/_dashboard.branding-standard-with-modal.api.$id.delete';
import * as EditBrandingStandardWithModal from './src/_dashboard.branding-standard-with-modal.api.$id.edit';
import * as CreateBrandingStandardWithModal from './src/_dashboard.branding-standard-with-modal.api.create';
import { BrandingStandardWithModalBaseUrl } from './src/constants/BaseUrl';

const BrandingStandardWithModalRoutes: RouteObject[] = [
  {
    path: BrandingStandardWithModalBaseUrl,
    lazy: () => {
      return import('./src/_dashboard.branding-standard-with-modal._index').then(module => ({
        loader: module.loader,
        shouldRevalidate: module.shouldRevalidate,
        errorElement: <module.ErrorBoundary />,
        element: (
          <Suspense fallback={null}>
            <module.Page />
          </Suspense>
        ),
      }));
    },
  },
  {
    path: `${BrandingStandardWithModalBaseUrl}/api/:id/edit`,
    action: EditBrandingStandardWithModal.action,
    shouldRevalidate: EditBrandingStandardWithModal.shouldRevalidate,
    errorElement: <EditBrandingStandardWithModal.ErrorBoundary />,
  },
  {
    path: `${BrandingStandardWithModalBaseUrl}/api/create`,
    action: CreateBrandingStandardWithModal.action,
    errorElement: <CreateBrandingStandardWithModal.ErrorBoundary />,
  },
  {
    path: `${BrandingStandardWithModalBaseUrl}/api/:id/delete`,
    action: DeleteBrandingStandardWithModal.action,
  },
];

export default BrandingStandardWithModalRoutes;
