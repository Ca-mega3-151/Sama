import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DeleteVehiclesWithPage from './src/_dashboard.vehicle.$id.delete';
import * as EditVehiclesWithPage from './src/_dashboard.vehicle.api.$id.edit';
import * as CreateVehiclesWithPage from './src/_dashboard.vehicle.api.create';
import { VehiclesWithPageBaseUrl } from './src/constants/BaseUrl';

const VehiclesdWithPageRoutes: RouteObject[] = [
  {
    path: VehiclesWithPageBaseUrl,
    lazy: async () => {
      const module = await import('./src/_dashboard.vehicle._index');
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
    path: `${VehiclesWithPageBaseUrl}/:id/edit`,
    action: EditVehiclesWithPage.action,
    loader: EditVehiclesWithPage.loader,
    element: <EditVehiclesWithPage.Page />,
    shouldRevalidate: EditVehiclesWithPage.shouldRevalidate,
    errorElement: <EditVehiclesWithPage.ErrorBoundary />,
  },
  {
    path: `${VehiclesWithPageBaseUrl}/create`,
    action: CreateVehiclesWithPage.action,
    element: <CreateVehiclesWithPage.Page />,
    errorElement: <CreateVehiclesWithPage.ErrorBoundary />,
  },
  {
    path: `${VehiclesWithPageBaseUrl}/$id/delete`,
    action: DeleteVehiclesWithPage.action,
  },
];

export default VehiclesdWithPageRoutes;
