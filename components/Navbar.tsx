"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun, ShoppingCart, User } from "lucide-react";
import { toast } from "sonner";

export default function Navbar() {
  const { data: session, update } = useSession();
  const { theme, setTheme, systemTheme } = useTheme();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (theme === "system") {
      setCurrentTheme(systemTheme || "light");
    } else {
      setCurrentTheme(theme || "light");
    }
  }, [theme, systemTheme]);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    // Show loading toast
    const toastId = toast.loading("Signing out...");

    try {
      // First sign out from NextAuth
      await signOut({ redirect: false });

      // Clear any client-side storage if needed
      localStorage.removeItem("sessionData");
      sessionStorage.clear();

      // Force refresh the session data
      await update();

      // Update toast to success
      toast.success("Signed out successfully", { id: toastId });

      // Redirect to home page
      router.push("/");
      router.refresh(); // Force a refresh of the page
    } catch (error) {
      console.error("Error signing out:", error);
      // Update toast to error
      toast.error("Failed to sign out", { id: toastId });
    } finally {
      setIsSigningOut(false);
    }
  };

  if (!mounted) {
    return (
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <ShoppingCart className="h-8 w-8" />
                <span className="text-xl font-bold">ProductHub</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" disabled>
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    );
  }

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(systemTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8" />
              <span className="text-xl font-bold">ProductHub</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-6">
              <Link
                href="/products"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Products
              </Link>
              {session && (
                <Link
                  href="/dashboard/add-product"
                  className="text-sm font-medium hover:text-primary transition-colors"
                >
                  Add Product
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {currentTheme === "dark" ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {session.user?.name}
                </span>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  disabled={isSigningOut}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}