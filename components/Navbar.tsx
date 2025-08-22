"use client";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-border bg-background">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link
          href="/"
          className="text-2xl font-bold text-primary transition-colors hover:text-primary/90"
        >
          MyShop
        </Link>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/products">Products</Link>
          </Button>

          {session ? (
            <>
              <Button asChild variant="ghost">
                <Link href="/dashboard/add-product">Add Product</Link>
              </Button>
              <Button onClick={() => signOut()} variant="secondary">
                Logout
              </Button>
            </>
          ) : (
            <Button asChild variant="secondary">
              <Link href="/login">Login</Link>
            </Button>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
