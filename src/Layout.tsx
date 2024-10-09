import { Outlet } from "react-router-dom";
import Footer from "./components/layouts/footer/Footer";
import Header from "./components/layouts/header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="container mx-auto my-5 bg-gray-800 dark:bg-white text-white">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
