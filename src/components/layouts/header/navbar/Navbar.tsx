import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import NavbarSearch from "./NavbarSearch";

export default function Navbar() {
  return (
    <>
      <div className="flex ">
        <div className=" flex items-center space-x-10 mx-14">
          <Label className="text-gray-300 text-lg font-semibold mr-4">
            Coin
          </Label>
          <Label className="text-gray-300 text-lg font-semibold mr-4">
            About
          </Label>
          <NavbarSearch />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="default">
            Sign in
          </Button>
          <Button size="default">Sign up</Button>
        </div>
      </div>
    </>
  );
}
