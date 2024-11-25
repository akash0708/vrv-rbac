"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import { HomeIcon, NotebookPen, UserRound } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";

export default function FloatingDockDemo() {
  const { data: session } = useSession();
  if (!session) return null;
  const links = [
    {
      title: "Home",
      icon: (
        <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },
    {
      title: "Register",
      icon: (
        <NotebookPen className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/register",
    },
    {
      title: "Profile",
      icon: (
        <UserRound className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/dashboard",
    },
    {
      title: "Logout",
      icon: <LogoutButton />,
      href: "#",
    },
  ];
  return (
    <div className="fixed bottom-20 z-50 mx-auto flex items-center justify-center h-fit w-screen">
      <FloatingDock mobileClassName="" items={links} />
    </div>
  );
}
