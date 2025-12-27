import { Routes, Route, Navigate } from "react-router";
import { lazy, Suspense } from "react";
import NotfoundPage from "./pages/NotfoundPage.jsx";
import { useUser } from "@clerk/clerk-react";
import Loader from "./components/Loader.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const ProblemPage = lazy(() => import("./pages/ProblemsPage.jsx"));
const Dashboard = lazy(() => import("./pages/Dashboard.jsx"));

const App = () => {
  const { isSignedIn, isLoaded } = useUser();
  if (!isLoaded) {
    return <Loader />;
  }
  return (
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
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
};

export default App;
