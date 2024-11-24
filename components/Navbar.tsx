import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";

const Navbar = () => {
  return (
    <nav className="w-full h-fit flex justify-between items-center py-2 px-4">
      <div className="flex gap-1 text-3xl font-bold">
        <span>Event </span>
        <span className="text-[#7848F4]"> Hive</span>
      </div>
      <div className="flex gap-4 items-center">
        <Link href="/login">Login</Link>
        <Link
          href="/signup"
          className="text-white bg-[#7848F4] px-4 py-2 rounded-lg"
        >
          Signup
        </Link>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
