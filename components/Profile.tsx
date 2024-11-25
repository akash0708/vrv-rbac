"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";

interface ProfileProps {
  user: {
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    // <div className="p-6 border rounded-lg shadow-md w-full max-w-md">
    //   <h2 className="text-xl font-semibold mb-4">User Profile</h2>
    //   <ul className="space-y-2">
    //     <li>
    //       <strong>Name:</strong> {user.name}
    //     </li>
    //     <li>
    //       <strong>Email:</strong> {user.email}
    //     </li>
    //     <li>
    //       <strong>Role:</strong> {user.role}
    //     </li>
    //     <li>
    //       <strong>Joined At:</strong>{" "}
    //       {new Date(user.createdAt).toLocaleDateString()}
    //     </li>
    //     <li>
    //       <strong>Last Updated:</strong>{" "}
    //       {new Date(user.updatedAt).toLocaleDateString()}
    //     </li>
    //   </ul>
    // </div>
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
    </HeroHighlight>
  );
};

export default Profile;
