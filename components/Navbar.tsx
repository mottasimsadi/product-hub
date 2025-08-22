"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link href="/" className="flex items-center space-x-2">
                <ShoppingCart className="h-8 w-8" />
                <span className="text-xl font-bold">ProductStore</span>
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

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8" />
              <span className="text-xl font-bold">ProductStore</span>
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
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Welcome, {session.user?.name}
                </span>
                <Button
                  variant="outline"
                  onClick={() => signOut()}
                  className="flex items-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Sign Out</span>
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
