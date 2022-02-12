import { lazy, ReactNode, Suspense } from "react"
import { Route, Routes } from "react-router-dom"
import { useLinks } from "../core/hooks/useLinks"

const Home = lazy(() => import("../core/pages/Home").then((m) => ({ default: m.Home })))
const SignUp = lazy(() => import("../auth/pages/SignUp").then((m) => ({ default: m.SignUp })))
const SignIn = lazy(() => import("../auth/pages/SignIn").then((m) => ({ default: m.SignIn })))

const LazyComponent = (props: { children: ReactNode }) => (
  <Suspense fallback={<div>Loading...</div>}>{props.children}</Suspense>
)

export const AppRoutes = () => {
  const links = useLinks()

  return (
    <Routes>
      <Route
        path={links.core.home()}
        element={
          <LazyComponent>
            <Home />
          </LazyComponent>
        }
      />
      <Route
        path={links.auth.signUp()}
        element={
          <LazyComponent>
            <SignUp />
          </LazyComponent>
        }
      />
      <Route
        path={links.auth.signIn()}
        element={
          <LazyComponent>
            <SignIn />
          </LazyComponent>
        }
      />
    </Routes>
  )
}
