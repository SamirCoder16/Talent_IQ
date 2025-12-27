
import Features from "../components/Features.jsx";
import Hero from "../components/Hero.jsx";
import Navbar from "../components/Navbar.jsx";

const Home = () => {
  return (
    <div className="bg-linear-to-br from-base-100 via-base-200 to-base-300">
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* Features SECTION */}
      <Features />
    </div>
  );
};

export default Home;
