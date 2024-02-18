import { wrapCreateBrowserRouter } from '@sentry/react';
import React, { Suspense } from 'react';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import AppRouterLayout from './components/layout/AppRouterLayout';
import NotFound from './pages/NotFound';
import { useGlobalState } from './services/state/useGlobalState';

const Home = React.lazy(() => import('./pages/Home'));

const sentryCreateBrowserRouter = wrapCreateBrowserRouter(createBrowserRouter);

function App() {
  const { theme, setTheme } = useGlobalState();

  const router = sentryCreateBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppRouterLayout />} errorElement={<NotFound />}>
        <Route
          index
          element={
            <Suspense
              fallback={<div className="center flex flex-row">Loading</div>}
            >
              <Home />
            </Suspense>
          }
        />
      </Route>,
    ),
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
