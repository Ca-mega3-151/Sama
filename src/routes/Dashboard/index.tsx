import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DashboardLayout from './src/_dashboard';
import * as Dashboard from './src/_dashboard.dashboard';
import BrandingFullFeaturesRoutes from './src/BrandingFullFeaturesRoutes';
import BrandingStandardWithModalRoutes from './src/BrandingStandardWithModal';
import BrandingStandardWithPageRoutes from './src/BrandingStandardWithPage';
import BrandingWithDeferRoutes from './src/BrandingWithDeferRoutes';
import ClassesWithModalRoutes from './src/Classes';
import CustomerWithModalRoutes from './src/Customers';
import ServiceWithModalRoutes from './src/Service';
import VehiclesdWithPageRoutes from './src/Vehicles';

export const DashboardRoutes: RouteObject[] = [
  {
    element: <DashboardLayout.Page />,
    loader: DashboardLayout.loader,
    errorElement: <DashboardLayout.ErrorBoundary />,
    children: [
      {
        path: '/dashboard',
        errorElement: <Dashboard.ErrorBoundary />,
        element: (
          <Suspense fallback={null}>
            <Dashboard.Page />
          </Suspense>
        ),
      },
      ...BrandingFullFeaturesRoutes,
      ...BrandingWithDeferRoutes,
      ...BrandingStandardWithModalRoutes,
      ...BrandingStandardWithPageRoutes,
      ...ClassesWithModalRoutes,
      ...CustomerWithModalRoutes,
      ...ServiceWithModalRoutes,
      ...VehiclesdWithPageRoutes,
    ],
  },
];
