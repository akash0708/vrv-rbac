"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface User {
  id: string;
  name: string;
  email: string;
}

interface Registration {
  id: string;
  user: User;
  eventName: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
}

interface EventCount {
  eventName: string;
  _count: {
    eventName: number;
  };
}

const Admin: React.FC = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<
    Registration[]
  >([]);
  const [searchEmail, setSearchEmail] = useState<string>("");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [perEventCounts, setPerEventCounts] = useState<EventCount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch("/api/registrations");
        const data = await res.json();

        if (res.ok) {
          setRegistrations(data.registrations);
          setFilteredRegistrations(data.registrations);
          setTotalCount(data.totalCount);
          setPerEventCounts(data.perEventCounts);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Failed to fetch registration data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);
  // console.log("registrations", registrations);

  const handleStatusChange = async (
    id: string,
    status: "APPROVED" | "REJECTED"
  ) => {
    try {
      const res = await fetch(`/api/registrations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        const updatedRegistration = await res.json();
        // console.log("updatedRegistration", updatedRegistration);
        setRegistrations((prev) =>
          prev.map((reg) =>
            reg.id === updatedRegistration.id ? updatedRegistration : reg
          )
        );
        setFilteredRegistrations((prev) =>
          prev.map((reg) =>
            reg.id === updatedRegistration.id ? updatedRegistration : reg
          )
        );
      } else {
        console.error("Failed to update registration");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchEmail(query);
    if (query.trim() === "") {
      setFilteredRegistrations(registrations);
    } else {
      const filtered = registrations.filter((reg) =>
        reg.user.email.toLowerCase().includes(query)
      );
      setFilteredRegistrations(filtered);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="max-w-3xl mb-4 bg-gradient-to-br from-white to-gray-400 bg-clip-text text-3xl font-medium leading-tight text-transparent sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle>Total Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCount}</div>
          </CardContent>
        </Card>

        {perEventCounts.map((event) => (
          <Card key={event.eventName}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>{event.eventName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{event._count.eventName}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="my-4 py-4">
        <div className="w-full h-fit flex flex-col md:flex-row justify-between md:items-center gap-3 my-4">
          <h2 className="text-xl font-semibold my-4">All Registrations:</h2>
          <Input
            type="text"
            placeholder="Search by email"
            value={searchEmail}
            onChange={handleSearch}
            className="w-full md:w-1/3 mb-2"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Event Name</TableHead>
              <TableHead>Event Status</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRegistrations.length > 0 ? (
              filteredRegistrations.map((reg) => (
                <TableRow key={reg.id}>
                  <TableCell>{reg.user.id}</TableCell>
                  <TableCell>{reg.user.name}</TableCell>
                  <TableCell>{reg.user.email}</TableCell>
                  <TableCell>{reg.eventName}</TableCell>
                  <TableCell>
                    {reg.status === "PENDING" && (
                      <Badge className="bg-yellow-600">Pending</Badge>
                    )}
                    {reg.status === "APPROVED" && (
                      <Badge className="bg-emerald-700 hover:bg-emerald-800">
                        Approved
                      </Badge>
                    )}
                    {reg.status === "REJECTED" && (
                      <Badge variant={"destructive"}>Rejected</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {reg.status === "PENDING" && (
                      <>
                        <Button
                          className="mr-2 bg-green-500 hover:bg-green-600 text-white mb-3 md:mb-0"
                          onClick={() => handleStatusChange(reg.id, "APPROVED")}
                        >
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleStatusChange(reg.id, "REJECTED")}
                          className="bg-red-600 text-white"
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {reg.status !== "PENDING" && <span>Action Completed</span>}
                  </TableCell>
                  <td>{new Date(reg.createdAt).toLocaleString()}</td>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center">
                  No registrations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;
