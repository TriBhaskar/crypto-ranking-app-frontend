import { Outlet } from "react-router-dom";
import Footer from "./components/layouts/footer/Footer";
import Header from "./components/layouts/header/Header";
import { IMAGES } from "./constants/images";

export default function Layout() {
  return (
    <>
      <Header />
      <div
        className="min-h-screen w-full bg-center no-repeat bg-cover bg-fixed"
        style={{
          backgroundImage: `url(${IMAGES.bgImg})`,
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
