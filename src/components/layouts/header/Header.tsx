import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";

export default function Header() {
  return (
    <div className="h-14 w-full bg-transparent backdrop-blur-xl z-10 absolute">
      <div className="container mx-auto h-full flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center">
            <div className="text-yellow-500 text-4xl font-bold">C</div>
            <div className="text-gray-600 text-4xl font-bold">oin</div>
            <div className="text-red-600 text-4xl font-bold">R</div>
            <div className="text-gray-600 text-4xl font-bold">ank</div>
          </div>
        </Link>

        <Navbar />
      </div>
    </div>
  );
}
