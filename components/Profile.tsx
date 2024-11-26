"use client";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "./ui/hero-highlight";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
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
      <div className="w-screen h-[8rem] mt-7 flex flex-col justify-center items-center">
        <button
          onClick={() => router.push("/register")}
          className="p-[3px] relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
            Register
          </div>
        </button>
      </div>
    </HeroHighlight>
  );
};

export default Profile;
