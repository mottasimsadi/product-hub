"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Mail, Phone, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Modal component for support links
function SupportModal({
  title,
  content,
  isOpen,
  onClose,
}: {
  title: string;
  content: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function to re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-background rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">{title}</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4">{content}</div>
        <div className="p-4 border-t flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  );
}

export default function Footer() {
  const [modalOpen, setModalOpen] = useState<string | null>(null);

  // Get current year dynamically
  const currentYear = new Date().getFullYear();

  // Support content
  const supportContent = {
    help: (
      <div className="space-y-4">
        <p>
          Our Help Center is available 24/7 to assist you with any questions or
          issues you may have.
        </p>
        <div>
          <h4 className="font-medium mb-2">Common Questions:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>How to track my order?</li>
            <li>What is your return policy?</li>
            <li>How do I contact customer support?</li>
          </ul>
        </div>
        <p>
          For immediate assistance, please email us at support@producthub.com or
          call +8801311223344.
        </p>
      </div>
    ),
    terms: (
      <div className="space-y-4">
        <p>
          By using our services, you agree to the following terms and
          conditions:
        </p>
        <div>
          <h4 className="font-medium mb-2">User Agreement:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>You must be at least 18 years old to use our services</li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account
            </li>
            <li>
              All content uploaded must comply with our community guidelines
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Transactions:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>All sales are final unless otherwise stated</li>
            <li>Prices are subject to change without notice</li>
            <li>We reserve the right to refuse service to anyone</li>
          </ul>
        </div>
      </div>
    ),
    privacy: (
      <div className="space-y-4">
        <p>
          We are committed to protecting your privacy and personal information.
        </p>
        <div>
          <h4 className="font-medium mb-2">Data Collection:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              We collect information you provide during registration and
              checkout
            </li>
            <li>We use cookies to improve your browsing experience</li>
            <li>We may collect usage data to enhance our services</li>
          </ul>
        </div>
        <div>
          <h4 className="font-medium mb-2">Data Usage:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Your information is used to process orders and provide customer
              support
            </li>
            <li>
              We may use your email to send order updates and promotional offers
            </li>
            <li>We never sell your personal information to third parties</li>
          </ul>
        </div>
        <p>
          For more details about how we handle your data, please contact our
          privacy officer at privacy@producthub.com.
        </p>
      </div>
    ),
  };

  const openModal = (modalName: string) => {
    setModalOpen(modalName);
  };

  const closeModal = () => {
    setModalOpen(null);
  };

  return (
    <>
      <footer className="bg-muted/50 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingCart className="h-8 w-8" />
                <span className="text-xl font-bold">ProductHub</span>
              </div>
              <p className="text-muted-foreground mb-4 max-w-md">
                Your one-stop destination for quality products and excellent
                service. We strive to provide the best shopping experience for
                our customers.
              </p>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>support@producthub.com</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+8801311223344</span>
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
                  <button
                    onClick={() => openModal("help")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Help Center
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("terms")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openModal("privacy")}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} ProductHub. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-4 md:mt-0">
              <MapPin className="h-4 w-4" />
              <span>Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Support Modals */}
      <SupportModal
        title="Help Center"
        content={supportContent.help}
        isOpen={modalOpen === "help"}
        onClose={closeModal}
      />

      <SupportModal
        title="Terms of Service"
        content={supportContent.terms}
        isOpen={modalOpen === "terms"}
        onClose={closeModal}
      />

      <SupportModal
        title="Privacy Policy"
        content={supportContent.privacy}
        isOpen={modalOpen === "privacy"}
        onClose={closeModal}
      />
    </>
  );
}