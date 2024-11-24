// /components/Profile.tsx
import React from "react";

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
    <div className="p-6 border rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">User Profile</h2>
      <ul className="space-y-2">
        <li>
          <strong>Name:</strong> {user.name}
        </li>
        <li>
          <strong>Email:</strong> {user.email}
        </li>
        <li>
          <strong>Role:</strong> {user.role}
        </li>
        <li>
          <strong>Joined At:</strong>{" "}
          {new Date(user.createdAt).toLocaleDateString()}
        </li>
        <li>
          <strong>Last Updated:</strong>{" "}
          {new Date(user.updatedAt).toLocaleDateString()}
        </li>
      </ul>
    </div>
  );
};

export default Profile;
