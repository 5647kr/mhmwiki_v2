import { Outlet, ScrollRestoration } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Toaster } from "react-hot-toast";

export default function Default() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollRestoration />

      <Toaster position="top-center" reverseOrder={false} />

      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
