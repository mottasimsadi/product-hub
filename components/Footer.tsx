import Link from "next/link";
import { ShoppingCart, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <ShoppingCart className="h-8 w-8" />
              <span className="text-xl font-bold">ProductStore</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Your one-stop destination for quality products and excellent
              service. We strive to provide the best shopping experience for our
              customers.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@productstore.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sign Up
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard/add-product"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Add Product
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2025 ProductStore. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-4 md:mt-0">
            <MapPin className="h-4 w-4" />
            <span>Dhaka, Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}