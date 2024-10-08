import Content from "./components/layouts/content/Content";
import Footer from "./components/layouts/footer/Footer";
import Chart from "./components/layouts/graph/Chart";
import Header from "./components/layouts/header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="container mx-auto my-5 bg-gray-800 dark:bg-white text-white">
        <Chart />
      </div>
      <Footer />
    </>
  );
}
