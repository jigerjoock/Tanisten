import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ClientsPage from "./pages/ClientsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProductPage from "./pages/ProductPage";
import PrivacyPage from "./pages/PrivacyPage";
import ServicesPage from "./pages/ServicesPage";
import WeddingPage from "./pages/WeddingPage";
import WeddingAdminPage from "./pages/WeddingAdminPage";
import CookieNotice from "./components/common/CookieNotice";

export default function App() {
  const { pathname } = useLocation();
  const hostname = window.location.hostname;
  const isWeddingHost = hostname === "wedding.tanisten.com" || hostname === "tanisten-wedding.pages.dev" || hostname.endsWith(".tanisten-wedding.pages.dev");
  const isWeddingPage = isWeddingHost || pathname === "/wedding" || pathname.startsWith("/wedding/") || pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <div className="min-h-screen">
      {!isWeddingPage && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={isWeddingHost ? <WeddingPage /> : <HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:productId" element={<ProductPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/industries" element={<ClientsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/wedding" element={<WeddingPage />} />
          <Route path="/admin" element={<WeddingAdminPage />} />
          <Route path="/admin/aidai" element={<WeddingAdminPage inviterId={3} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {!isWeddingPage && <Footer />}
      {!isWeddingPage && <CookieNotice />}
    </div>
  );
}
