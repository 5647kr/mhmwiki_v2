import { Outlet } from "react-router";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export default function Default() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="w-full max-w-7xl mx-auto p-5 flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
