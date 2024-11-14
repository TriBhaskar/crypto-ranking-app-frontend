import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";
import { useState, useRef } from "react";

export default function NavbarSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement your search logic here
    console.log("Searching for:", searchQuery);
  };

  const clearSearch = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-sm">
      <Input
        ref={inputRef}
        type="text"
        placeholder="Search..."
        className="pr-20"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-8 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-transparent"
          onClick={clearSearch}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Clear search</span>
        </Button>
      )}
      <Button
        type="submit"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-10 bg-blue-300 text-white hover:bg-slate-400"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}
