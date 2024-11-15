import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import NavbarSearch from "./NavbarSearch";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div className="flex ">
        <div className=" flex items-center space-x-10 mx-14">
          <Label className="text-gray-300 text-lg font-semibold">Coin</Label>
          <Label className="text-gray-300 font-semibold">
            <svg
              className="w-[29px] h-[29px] dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
              />
            </svg>
          </Label>
          <NavbarSearch />
        </div>
        <div className="flex items-center gap-4">
          <Link to="login">
            <Button variant="outline" size="default">
              Sign in
            </Button>
          </Link>
          <Link to="register">
            <Button size="default">Sign up</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
