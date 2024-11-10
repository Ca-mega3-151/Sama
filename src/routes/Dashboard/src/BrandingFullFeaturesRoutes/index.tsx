import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DeleteBrandingFullFeatures from './src/_dashboard.branding-full-features.$id.delete';
import * as EditBrandingFullFeatures from './src/_dashboard.branding-full-features.api.$id.edit';
import * as ApiCreateBrandingFullFeatures from './src/_dashboard.branding-full-features.api.create';
import * as CreateBrandingFullFeatures from './src/_dashboard.branding-full-features.create';
import { BrandingFullFeaturesBaseUrl } from './src/constants/BaseUrl';

const BrandingFullFeaturesRoutes: RouteObject[] = [
  {
    path: BrandingFullFeaturesBaseUrl,
    lazy: async () => {
      const module = await import('./src/_dashboard.branding-full-features._index');
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
    path: `${BrandingFullFeaturesBaseUrl}/api/:id/edit`,
    action: EditBrandingFullFeatures.action,
    shouldRevalidate: EditBrandingFullFeatures.shouldRevalidate,
    errorElement: <EditBrandingFullFeatures.ErrorBoundary />,
  },
  {
    path: `${BrandingFullFeaturesBaseUrl}/create`,
    action: CreateBrandingFullFeatures.action,
    errorElement: <CreateBrandingFullFeatures.ErrorBoundary />,
    element: <CreateBrandingFullFeatures.Page />,
  },
  {
    path: `${BrandingFullFeaturesBaseUrl}/api/create`,
    action: ApiCreateBrandingFullFeatures.action,
    errorElement: <ApiCreateBrandingFullFeatures.ErrorBoundary />,
  },
  {
    path: `${BrandingFullFeaturesBaseUrl}/:id/delete`,
    action: DeleteBrandingFullFeatures.action,
  },
];

export default BrandingFullFeaturesRoutes;
