"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <Button
      className="w-9 h-9 rounded-full md:rounded-sm md:w-fit md:h-10"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      <LogOut className="w-5 h-5" />
    </Button>
  );
};

export default LogoutButton;
