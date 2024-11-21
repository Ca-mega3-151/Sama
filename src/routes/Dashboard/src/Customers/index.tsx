import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as EditCustomerWithModal from './src/_dashboard.customer.$id.edit';
import * as DeleteCustomerWithModal from './src/_dashboard.customer.api.$id.delete';
import * as CreateCustomerWithModal from './src/_dashboard.customer.create';
import { CustomerWithModalBaseUrl } from './src/constants/BaseUrl';

const CustomerWithModalRoutes: RouteObject[] = [
  {
    path: CustomerWithModalBaseUrl,
    lazy: () => {
      return import('./src/_dashboard.customer._index').then(module => ({
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
    path: `${CustomerWithModalBaseUrl}/api/:id/edit`,
    action: EditCustomerWithModal.action,
    shouldRevalidate: EditCustomerWithModal.shouldRevalidate,
    errorElement: <EditCustomerWithModal.ErrorBoundary />,
  },
  {
    path: `${CustomerWithModalBaseUrl}/api/create`,
    action: CreateCustomerWithModal.action,
    errorElement: <CreateCustomerWithModal.ErrorBoundary />,
  },
  {
    path: `${CustomerWithModalBaseUrl}/:id/delete`,
    action: DeleteCustomerWithModal.action,
  },
];

export default CustomerWithModalRoutes;
