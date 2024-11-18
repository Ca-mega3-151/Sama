import { Suspense } from 'react';
import { Outlet } from '~/overrides/remix';

export const AuthLayout = () => {
  return (
    <div>
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </div>
  );
};
