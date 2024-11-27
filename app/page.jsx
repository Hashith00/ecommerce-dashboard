"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";
import { Toaster, toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Show success toast
      toast.success("Successfully logged in!", {
        description: "Welcome back to your dashboard",
        duration: 3000,
      });

      // Wait for toast to be visible before redirecting
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    } catch (error) {
      toast.error("Login failed", {
        description: "Please check your credentials and try again",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Toaster position="top-center" expand={true} richColors />
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 flex flex-col items-center">
          <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
            <Store className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Sign in to your account to continue
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Button
                  variant="link"
                  className="text-xs text-indigo-600 dark:text-indigo-400 p-0 h-auto font-normal"
                >
                  Forgot password?
                </Button>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center gap-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent" />
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Button
              variant="link"
              className="text-indigo-600 dark:text-indigo-400 p-0 h-auto font-normal"
            >
              Sign up
            </Button>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
