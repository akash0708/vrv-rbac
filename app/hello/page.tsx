import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import { Link } from "next-view-transitions";
import React from "react";

const Page = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-black relative">
      <StarsBackground />
      <ShootingStars />

      <div className="bg-opacity-70 bg-black p-8 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-5xl text-white font-bold mb-4 max-w-4xl text-center">
          Oops! You’ve stumbled upon an uncharted page.
        </h1>
        <h2 className="text-lg md:text-2xl text-gray-300 leading-relaxed max-w-5xl text-center">
          To access Admin and Superadmin Pages, please follow the instructions
          provided in the submission form or contact the owner directly. Links
          are available in the footer.
        </h2>
        <div className="h-[8rem] mt-7 flex flex-col justify-center items-center">
          <Link href="/" className="p-[3px] relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
            <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
              Return to Home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
