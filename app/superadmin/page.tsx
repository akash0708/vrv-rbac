"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  isBlocked: boolean;
}

const SuperAdminPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data);
      setFilteredUsers(data);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setDialogOpen(true);
  };

  const handleRoleChange = async () => {
    if (selectedUser) {
      // console.log("newRole", newRole);
      const response = await fetch(`/api/users/${selectedUser.id}/role`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newRole: newRole }),
      });

      const updatedUser = await response.json();
      setUsers((prev) =>
        prev.map((user) =>
          user.id === updatedUser.id
            ? { ...user, role: updatedUser.role }
            : user
        )
      );
    }
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const toggleBlockUser = async (id: string, isBlocked: boolean) => {
    await fetch(`/api/users/${id}/block`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isBlocked }),
    });

    setUsers(
      users.map((user) => (user.id === id ? { ...user, isBlocked } : user))
    );
  };

  const handleDelete = (user: User) => {
    if (user.role === "SUPERADMIN") {
      toast({
        description: "Cannot delete superadmin",
        variant: "destructive",
      });
    } else {
      setSelectedUser(user);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = async () => {
    if (selectedUser) {
      await fetch(`/api/users/${selectedUser.id}`, { method: "DELETE" });
      setUsers(users.filter((user) => user.id !== selectedUser.id));
    }
    setDeleteDialogOpen(false);
    setSelectedUser(null);
    toast({
      description: "User deleted",
      variant: "destructive",
    });
  };

  const totalUsers = users.length;
  const totalAdmins = users.filter((user) => user.role === "ADMIN").length;
  const totalSuperadmins = users.filter(
    (user) => user.role === "SUPERADMIN"
  ).length;

  return (
    <div className="p-6">
      <h1 className="max-w-3xl mb-4 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-3xl font-medium leading-tight text-transparent sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
        Superadmin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admins</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{totalAdmins}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Superadmins</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{totalSuperadmins}</p>
          </CardContent>
        </Card>
      </div>

      <div className="w-full h-fit flex flex-col md:flex-row justify-between md:items-center gap-3 my-4">
        <h2 className="text-xl font-semibold my-4">All Users:</h2>
        <Input
          type="text"
          placeholder="Search by email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-1/3 mb-2"
        />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Access</TableHead>
            <TableHead>Actions</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <button
                  onClick={() => toggleBlockUser(user.id, !user.isBlocked)}
                  className={`px-2 py-1 rounded ${
                    user.isBlocked ? "bg-green-600" : "bg-red-600"
                  } text-white`}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </TableCell>
              <TableCell>
                <Button variant="default" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleDelete(user)}
                  className="bg-transparent"
                >
                  <Trash2 size={24} className="text-black dark:text-white" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
            <DialogDescription className="mt-2">
              Change the role of{" "}
              <span className="font-bold text-white mx-1">
                {selectedUser?.name}
              </span>
              from{" "}
              <span className="lowercase font-bold text-white">
                {selectedUser?.role}
              </span>
            </DialogDescription>
          </DialogHeader>
          <Select value={newRole} onValueChange={(value) => setNewRole(value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SUPERADMIN">Superadmin</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="USER">User</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button variant="default" onClick={handleRoleChange}>
              Save
            </Button>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogDescription className="mt-2">
              Are you sure you want to delete{" "}
              <span className="font-bold text-red-500">
                {selectedUser?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminPage;
