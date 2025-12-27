import { Routes, Route, Navigate } from "react-router";
import { lazy } from "react";
import NotfoundPage from "./pages/NotfoundPage.jsx";
import { useUser } from "@clerk/clerk-react";

const Home = lazy(() => import("./pages/Home.jsx"));
const ProblemPage = lazy(() => import("./pages/ProblemsPage.jsx"));

const App = () => {
  const { isSignedIn } = useUser();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/problems" element={ isSignedIn ? <ProblemPage /> : <Navigate to={"/"} />} />
        <Route path="*" element={<NotfoundPage />} />
      </Routes>
    </>
  );
};

export default App;
