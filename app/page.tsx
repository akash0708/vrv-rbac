"use client";
import React from "react";
import { AuroraHero } from "@/components/AuroraHero";
import Showcase from "@/components/Showcase";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import GeminiEffect from "@/components/GeminiEffect";
export default function Page() {
  return (
    <>
      <AuroraHero />
      <Showcase />
      <Features />
      <GeminiEffect />
      <Footer />
    </>
  );
}
