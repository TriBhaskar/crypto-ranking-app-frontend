import Content from "./components/layouts/content/Content";
import Footer from "./components/layouts/footer/Footer";
import Header from "./components/layouts/header/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="container mx-auto my-5 bg-zinc-900 dark:bg-white text-white">
        <Content />
      </div>
      <Footer />
    </>
  );
}
