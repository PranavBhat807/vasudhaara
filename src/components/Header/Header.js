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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

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
            <div className="w-8 h-8 bg-gradient-to-tr from-pink-500 to-yellow-500 rounded-full animate-pulse"></div>
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
              href={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
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
