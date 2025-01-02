import { Outlet } from "react-router-dom";
import Footer from "./components/layouts/footer/Footer";
import Header from "./components/layouts/header/Header";
import { IMAGES } from "./constants/images";
import { AuthProvider } from "./context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
      <Header />
      <div
        className="min-h-screen w-full bg-center no-repeat bg-cover bg-fixed"
        // style={{
        //   backgroundImage: `url(${IMAGES.bgImg})`,
        // }}
      >
        <div className="pt-32">
          <Outlet />
        </div>
      </div>
      {/* <Footer /> */}
    </AuthProvider>
  );
}
