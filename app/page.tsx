import Navbar from "@/components/Navbar";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-screen flex-col justify-center">
      <Navbar />
      <div className="hero w-screen h-[650px] mx-auto relative flex justify-center">
        <p className="text-white absolute z-10 text-6xl text-center mt-16 py-4">
          MADE FOR THOSE <br /> WHO DO
        </p>
        <Image
          src="/hero.png"
          alt="hero image"
          fill={true}
          className="object-contain px-4 rounded-lg"
        />
      </div>

      <div className="events">
        <div>
          Upcoming <span>Events</span>
        </div>
        {/* map event cards */}
      </div>
    </main>
  );
}
