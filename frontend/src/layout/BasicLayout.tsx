import { Outlet } from "react-router-dom";
import { Header } from "~/components/Header.tsx";
import { Footer } from "~/components/Footer.tsx";

export default function BasicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
