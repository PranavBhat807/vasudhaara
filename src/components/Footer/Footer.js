"use client";

import React from "react";
import { Link, Button, Input, Divider } from "@nextui-org/react";

export default function Footer() {
  return (
    <footer className="w-full bg-neutral-900 text-neutral-200 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">VASUDHARA</h2>
          <p className="text-sm text-neutral-400">
            Empowering beauty with herbs. Shop for a cause, embrace nature.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" color="foreground" className="text-sm hover:text-primary">Home</Link></li>
            <li><Link href="/about" color="foreground" className="text-sm hover:text-primary">About Us</Link></li>
            <li><Link href="/shop" color="foreground" className="text-sm hover:text-primary">Shop</Link></li>
            <li><Link href="/contact" color="foreground" className="text-sm hover:text-primary">Contact Us</Link></li>
          </ul>
        </div>

        {/* Socials & Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <ul className="space-y-2 text-sm text-neutral-400">
            <li>Email: support@vasudhara.com</li>
            <li>Phone: +1 234 567 890</li>
            <li>Address: 123 Herbal Lane, Green City</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Newsletter</h3>
          <p className="text-sm text-neutral-400">Subscribe for latest products and offers.</p>
          <div className="flex gap-2">
            <Input placeholder="Enter email" size="sm" classNames={{input: "text-white"}} />
            <Button color="primary" size="sm">Subscribe</Button>
          </div>
        </div>
      </div>
      <Divider className="my-8 bg-neutral-800" />
      <div className="text-center text-xs text-neutral-500">
        © {new Date().getFullYear()} Vasudhara. All rights reserved.
      </div>
    </footer>
  );
}
