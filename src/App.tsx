// src/App.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./router/AppRouter";
import LoadingScreen from "./components/LoadingScreen";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top on route change
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div className={loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"}>
        <div className="min-h-screen">
          <ScrollToTop />
          <Navbar />
          <main>
            <AppRouter />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}
