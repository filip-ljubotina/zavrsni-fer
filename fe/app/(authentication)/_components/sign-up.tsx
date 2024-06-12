"use client";
import Link from "next/link";
import { useState } from "react";
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
import ApiService from "@/services/api-service";
import { useRouter } from "next/navigation";

interface SignUpProps {
  toggleShowSignUp: () => void;
}

interface UserData {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export function SignUp({ toggleShowSignUp }: SignUpProps) {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [id]: value,
    }));
  };

  const handleSignUp = async () => {
    try {
      const response = await ApiService.post("/auth/register", userData);
    } catch (error) {
      alert("Something went wrong");
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="first-name">First name</Label>
              <Input
                id="firstName"
                placeholder="Max"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="last-name">Last name</Label>
              <Input
                id="lastName"
                placeholder="Robinson"
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
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
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" onChange={handleInputChange} />
          </div>
          <Button type="submit" onClick={handleSignUp} className="w-full">
            Create an account
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" onClick={toggleShowSignUp} className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default SignUp;
