import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as BrandingWithDeferListing from './src/_dashboard.branding-with-defer';
import { BrandingWithDeferBaseUrl } from './src/constants/BaseUrl';

const BrandingWithDeferRoutes: RouteObject[] = [
  {
    path: BrandingWithDeferBaseUrl,
    loader: BrandingWithDeferListing.loader,
    shouldRevalidate: BrandingWithDeferListing.shouldRevalidate,
    errorElement: <BrandingWithDeferListing.ErrorBoundary />,
    element: (
      <Suspense fallback={null}>
        <BrandingWithDeferListing.Page />
      </Suspense>
    ),
  },
];

export default BrandingWithDeferRoutes;
