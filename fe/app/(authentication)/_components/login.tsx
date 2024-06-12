"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ApiService from "@/services/api-service";

interface LoginProps {
  toggleShowSignUp: () => void;
}

interface UserData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export function Login({ toggleShowSignUp }: LoginProps) {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  const handleLogIn = async () => {
    try {
      localStorage.removeItem("token");
      const response = await ApiService.post("/auth/login", userData);
      localStorage.setItem("token", response.data.token);

      const userId = response.data.userId.toString();

      const responseSession = await fetch("/api/sessionHandler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      router.push(`/dashboard`);
    } catch (error) {
      alert("Email or Password Incorrect");
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
            </div>
            <Input
              id="password"
              onChange={handleInputChange}
              type="password"
              required
            />
          </div>
          <Button type="submit" onClick={handleLogIn} className="w-full">
            Login
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" onClick={toggleShowSignUp} className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default Login;
