"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  return (
    <Button className="" onClick={() => signOut({ callbackUrl: "/login" })}>
      <LogOut className="w-6 h-6 rounded-full" />
    </Button>
  );
};

export default LogoutButton;
