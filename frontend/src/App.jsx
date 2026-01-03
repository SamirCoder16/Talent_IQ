import { Routes, Route, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import NotfoundPage from "./pages/NotfoundPage.jsx";
import { useUser } from "@clerk/clerk-react";
import Loader from "./components/Loader.jsx";
import MobilePage from "./pages/MobilePage.jsx";
import { useIsMobile } from "./hooks/useDevice.js";
import SessionPage from "./pages/SessionPage.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const ProblemPage = lazy(() => import("./pages/ProblemsPage.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));
const IndivisualProblem = lazy(() => import("./pages/Problempage.jsx"));

const App = () => {
  const { isSignedIn, isLoaded } = useUser();
  const isMobile = useIsMobile();

  if (!isLoaded) {
    return <Loader />;
  }
  return isMobile ? (
    <MobilePage />
  ) : (
    <>
      <Routes>
        <Route
          path="/"
          element={
            !isSignedIn ? (
              <Suspense fallback={<Loader />}>
                <Home />
              </Suspense>
            ) : (
              <Navigate to={"/dashboard"} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            isSignedIn ? (
              <Suspense fallback={<Loader />}>
                <Dashboard />
              </Suspense>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/problems"
          element={isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/problem/:id"
          element={
            isSignedIn ? (
              <Suspense fallback={<Loader />}>
                <IndivisualProblem />
              </Suspense>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/session/:id"
          element={
            <Suspense fallback={<Loader />}>
              {isSignedIn ? <SessionPage /> : <Navigate to="/" />}
            </Suspense>
          }
        />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
};

export default App;
