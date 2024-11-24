"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function HomePage() {
  const [eventName, setEventName] = useState("Speaker Session"); // Default value
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ eventName }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Something went wrong");
      }

      const { registration } = await response.json();
      setMessage(
        `Registration successful for event: ${registration.eventName}`
      );
    } catch (error: any) {
      setMessage(error.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center">
            Event Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="eventName" className="text-lg">
                Select Event
              </Label>
              <Select value={eventName} onValueChange={setEventName} required>
                <SelectTrigger id="eventName" className="w-full">
                  <SelectValue placeholder="Choose an event" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Speaker Session">
                    Speaker Session
                  </SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Event Night">Event Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            type="submit"
            className="w-full text-lg py-6"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            {isLoading ? "Registering..." : "Register for Event"}
          </Button>
          {message && (
            <p className="text-center text-lg font-medium text-green-600">
              {message}
            </p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
