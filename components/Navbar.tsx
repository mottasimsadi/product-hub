"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  Moon,
  Sun,
  ShoppingCart,
  User,
  Menu,
  X,
  Home,
  Package,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile"; // Your custom hook

export default function Navbar() {
  const { data: session, update } = useSession();
  const { theme, setTheme, systemTheme } = useTheme();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  useEffect(() => {
    // Close menu when route changes
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };

    router.events?.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events?.off("routeChangeStart", handleRouteChange);
    };
  }, [router]);

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

      // Close mobile menu if open
      setIsMenuOpen(false);

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

  const toggleTheme = () => {
    if (theme === "system") {
      setTheme(systemTheme === "dark" ? "light" : "dark");
    } else {
      setTheme(theme === "dark" ? "light" : "dark");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  // Navigation items
  const navItems = (
    <>
      <Link
        href="/"
        className="flex items-center px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        <Home className="mr-2 h-4 w-4" />
        Home
      </Link>
      <Link
        href="/products"
        className="flex items-center px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
        onClick={() => setIsMenuOpen(false)}
      >
        <Package className="mr-2 h-4 w-4" />
        Products
      </Link>
      {session && (
        <Link
          href="/dashboard/add-product"
          className="flex items-center px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
          onClick={() => setIsMenuOpen(false)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Link>
      )}
    </>
  );

  return (
    <>
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo and mobile menu button */}
            <div className="flex items-center space-x-4">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMenu}
                  className="md:hidden"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              )}

              <Link href="/" className="flex items-center space-x-2">
                <ShoppingCart className="h-8 w-8" />
                <span className="text-xl font-bold">ProductHub</span>
              </Link>
            </div>

            {/* Desktop navigation */}
            {!isMobile && (
              <div className="flex items-center justify-center flex-1">
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
            )}

            {/* Right side items */}
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
                  {!isMobile && (
                    <span className="text-sm text-muted-foreground">
                      Welcome, {session.user?.name}
                    </span>
                  )}
                  <Button
                    variant="outline"
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="flex items-center space-x-2"
                    size={isMobile ? "icon" : "default"}
                  >
                    <User className="h-4 w-4" />
                    {!isMobile && (
                      <span>
                        {isSigningOut ? "Signing Out..." : "Sign Out"}
                      </span>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button
                      variant="outline"
                      size={isMobile ? "icon" : "default"}
                    >
                      {isMobile ? <User className="h-4 w-4" /> : "Sign In"}
                    </Button>
                  </Link>
                  {!isMobile && (
                    <Link href="/signup">
                      <Button>Sign Up</Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay and sidebar */}
      {isMobile && (
        <>
          {/* Overlay */}
          {isMenuOpen && (
            <div
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
          )}

          {/* Sidebar */}
          <div
            className={`
              fixed top-0 left-0 h-full w-64 bg-background border-r z-50 
              transform transition-transform duration-300 ease-in-out
              md:hidden
              ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
            `}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <Link
                href="/"
                className="flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <ShoppingCart className="h-8 w-8" />
                <span className="text-xl font-bold">ProductHub</span>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="p-4 space-y-2">
              {navItems}

              {session && (
                <div className="pt-4 mt-4 border-t">
                  <div className="px-4 py-2 text-sm text-muted-foreground">
                    Welcome, {session.user?.name}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}