import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DeleteServiceWithModal from './src/_dashboard.service.$id.delete';
import * as EditServiceWithModal from './src/_dashboard.service.api.$id.edit';
import * as CreateServiceWithModal from './src/_dashboard.service.api.create';
import { ServiceWithModalBaseUrl } from './src/constants/BaseUrl';

const ServiceWithModalRoutes: RouteObject[] = [
  {
    path: ServiceWithModalBaseUrl,
    lazy: () => {
      return import('./src/_dashboard.services._index').then(module => ({
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
    path: `${ServiceWithModalBaseUrl}/api/:id/edit`,
    action: EditServiceWithModal.action,
    shouldRevalidate: EditServiceWithModal.shouldRevalidate,
    errorElement: <EditServiceWithModal.ErrorBoundary />,
  },
  {
    path: `${ServiceWithModalBaseUrl}/api/create`,
    action: CreateServiceWithModal.action,
    errorElement: <CreateServiceWithModal.ErrorBoundary />,
  },
  {
    path: `${ServiceWithModalBaseUrl}/:id/delete`,
    action: DeleteServiceWithModal.action,
  },
];

export default ServiceWithModalRoutes;
