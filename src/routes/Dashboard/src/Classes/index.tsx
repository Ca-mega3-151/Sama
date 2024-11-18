import { Suspense } from 'react';
import { RouteObject } from 'react-router-dom';
import * as DeleteClassesWithModal from './src/_dashboard.classes.$id.delete';
import * as EditClassesWithModal from './src/_dashboard.classes.api.$id.edit';
import * as CreateClassesWithModal from './src/_dashboard.classes.api.create';
import { ClassesWithModalBaseUrl } from './src/constants/BaseUrl';

const ClassesWithModalRoutes: RouteObject[] = [
  {
    path: ClassesWithModalBaseUrl,
    lazy: () => {
      return import('./src/_dashboard.classes._index').then(module => ({
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
    path: `${ClassesWithModalBaseUrl}/api/:id/edit`,
    action: EditClassesWithModal.action,
    shouldRevalidate: EditClassesWithModal.shouldRevalidate,
    errorElement: <EditClassesWithModal.ErrorBoundary />,
  },
  {
    path: `${ClassesWithModalBaseUrl}/api/create`,
    action: CreateClassesWithModal.action,
    errorElement: <CreateClassesWithModal.ErrorBoundary />,
  },
  {
    path: `${ClassesWithModalBaseUrl}/:id/delete`,
    action: DeleteClassesWithModal.action,
  },
];

export default ClassesWithModalRoutes;
