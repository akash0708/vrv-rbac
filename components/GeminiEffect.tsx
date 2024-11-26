"use client";
import { useScroll, useTransform } from "framer-motion";
import React from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function GeminiEffect() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  const { data: session } = useSession();

  return (
    <>
      <div
        className="hidden md:block h-[400vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-20 overflow-clip"
        ref={ref}
      >
        <div className="sticky top-14 h-screen">
          <GoogleGeminiEffect
            title="Check out the demo right now!"
            pathLengths={[
              pathLengthFirst,
              pathLengthSecond,
              pathLengthThird,
              pathLengthFourth,
              pathLengthFifth,
            ]}
          />
        </div>
      </div>

      <div className="md:hidden h-[60vh] bg-black w-full flex flex-col justify-center items-center dark:border dark:border-white/[0.1] rounded-md relative pt-20 overflow-clip">
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Checkout the demo right now!
        </h1>
        <h2 className="text-lg font-normal text-center text-neutral-400 mt-4 max-w-md mx-auto">
          Watch roles and permissions come to life—effortless RBAC in action!
        </h2>
        {!session ? (
          <Link
            href="/signup"
            className="font-bold bg-white rounded-full md:px-4 md:py-2 px-2 py-1 md:mt-[132px] mt-8 z-30 md:text-base text-black text-xs  w-fit mx-auto "
          >
            Signup Now!
          </Link>
        ) : (
          <Link
            href="/register"
            className="font-bold bg-white rounded-full md:px-4 md:py-2 px-2 py-1 md:mt-[132px] mt-8 z-30 md:text-base text-black text-xs  w-fit mx-auto "
          >
            Register Now!
          </Link>
        )}
      </div>
    </>
  );
}
