"use client";

import React from "react";
import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  Link, 
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  const menuItems = [
    "Home",
    "About Us",
    "Contact Us",
    "Shop",
  ];

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="bg-background/70 backdrop-blur-lg border-b border-divider">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3"
          >
            {/* Placeholder for Logo Image */}
            <div className="w-8 h-8  rounded-full">
              <Image alt="Logp" src="/logo.png" width={100} height={100}></Image>
            </div>
            <p className="font-bold text-inherit text-xl tracking-wide bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">VASUDHARA</p>
          </motion.div>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive>
          <Link color="primary" href="/" className="font-medium">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/about" className="font-medium hover:text-primary transition-colors">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact" className="font-medium hover:text-primary transition-colors">
            Contact Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/shop" className="font-medium hover:text-primary transition-colors">
            Shop
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
            <Link href="/checkout" className="mr-4">
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    {cartCount > 0 && (
                        <div className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                            {cartCount}
                        </div>
                    )}
                </div>
            </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="/shop" variant="flat" className="font-semibold">
            Shop Now
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={
                index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
              }
              className="w-full"
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
