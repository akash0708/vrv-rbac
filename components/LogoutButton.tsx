"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <Button
      className="rounded-full w-1 h-1 bg-transparent p-[8px] hover:p-0"
      onClick={() => signOut({ callbackUrl: "/login" })}
    >
      <LogOut />
    </Button>
  );
};

export default LogoutButton;
