"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "next-view-transitions";

interface ProfileProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

interface Registration {
  eventName: string;
  id: number;
  status: string;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      const res = await fetch(`/api/users/${user.id}`);
      const registrations = await res.json();
      setRegistrations(registrations);
    };

    fetchRegistrations();
  }, [user.id]);

  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
      >
        Welcome,{" "}
        <Highlight className="text-black dark:text-white">
          {user.name}
        </Highlight>
      </motion.h1>
      <div className="max-w-sm md:max-w-lg mx-auto mt-12">
        {registrations.length != 0 && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Name</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell>{registration.eventName}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full ${
                        registration.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : registration.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {registration.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="w-screen h-[8rem] mt-7 flex flex-col justify-center items-center">
        <Link href="/register" className="p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Register
          </div>
        </Link>
      </div>
    </HeroHighlight>
  );
};

export default Profile;
