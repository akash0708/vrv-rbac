"use client";

import { FloatingDock } from "@/components/ui/floating-dock";
import {
  HomeIcon,
  NotebookPen,
  SettingsIcon,
  ShieldIcon,
  UserRound,
} from "lucide-react";
import LogoutButton from "./LogoutButton";
import { useSession } from "next-auth/react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function FloatingDockDemo() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous! && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const { data: session } = useSession();
  console.log(session?.user.role);
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

  if (session?.user.role === "SUPERADMIN") {
    const logoutIndex = links.findIndex((link) => link.title === "Logout");
    links.splice(
      logoutIndex,
      0,
      {
        title: "Admin",
        icon: (
          <ShieldIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/admin",
      },
      {
        title: "Superadmin",
        icon: (
          <SettingsIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
        ),
        href: "/superadmin",
      }
    );
  }

  return (
    <motion.div
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: 100 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="fixed bottom-12 z-50 mx-auto flex items-center justify-center h-fit w-screen"
    >
      <FloatingDock mobileClassName="" items={links} />
    </motion.div>
  );
}
