// src/App.tsx
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRouter from "./router/AppRouter";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <AppRouter />
      </main>
      <Footer />
    </div>
  );
}
