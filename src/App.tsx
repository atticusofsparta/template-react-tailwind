import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { useGlobalState } from "./services/state/useGlobalState";
import { wrapCreateBrowserRouter } from "@sentry/react";
import React, { Suspense } from "react";
import AppRouterLayout from "./components/layout/AppRouterLayout";
import NotFound from "./pages/NotFound";
const Home = React.lazy(() => import('./pages/Home'));

const sentryCreateBrowserRouter =
  wrapCreateBrowserRouter(createBrowserRouter);

function App() {

  const {theme, setTheme} = useGlobalState();

  const router = sentryCreateBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppRouterLayout />} errorElement={<NotFound />}>
        <Route
          index
          element={
            <Suspense
              fallback={
                <div className='flex flex-row center'>Loading</div>
              }
            >
              <Home />
            </Suspense>
          }
        />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
