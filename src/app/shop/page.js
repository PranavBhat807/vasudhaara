
"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";

// Mock Data
const PRODUCTS = [
  {
    id: 1,
    title: "Herbal Face Wash",
    price: 15.99,
    rating: 4.8,
    description: "Gentle cleansing with neem and turmeric.",
    image: "https://images.unsplash.com/photo-1556228578-8d893e36eec2?q=80&w=800&auto=format&fit=crop",
    category: "Skin Care",
    date: "2024-01-10"
  },
  {
    id: 2,
    title: "Organic Shampoo",
    price: 12.50,
    rating: 4.5,
    description: "Sulfate-free formula for healthy hair.",
    image: "https://images.unsplash.com/photo-1585232975329-e0f1e298e8d9?q=80&w=800&auto=format&fit=crop",
    category: "Hair Care",
    date: "2024-01-12"
  },
  {
    id: 3,
    title: "Aloe Vera Gel",
    price: 8.99,
    rating: 4.9,
    description: "Pure soothing gel for skin and hair.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop",
    category: "Skin Care",
    date: "2024-01-15"
  },
  {
    id: 4,
    title: "Rose Water Toner",
    price: 18.00,
    rating: 4.7,
    description: "Refreshing mist for instant hydration.",
    image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=800&auto=format&fit=crop",
    category: "Skin Care",
    date: "2024-01-18"
  },
  {
    id: 5,
    title: "Hair Oil",
    price: 22.50,
    rating: 4.6,
    description: "Nourishing oil with bhringraj and amla.",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=800&auto=format&fit=crop",
    category: "Hair Care",
    date: "2024-01-20"
  },
  {
    id: 6,
    title: "Herbal Soap",
    price: 5.99,
    rating: 4.3,
    description: "Handmade soap with essential oils.",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=800&auto=format&fit=crop",
    category: "Bath & Body",
    date: "2024-01-22"
  },
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, categoryFilter]);

  return (
    <div className="min-h-screen pt-12 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Shop Our Collection</h1>
            <p className="text-neutral-400">Discover nature's best secrets.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
            <Input 
                placeholder="Search products..." 
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="w-full md:w-64"
                variant="bordered"
            />
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
                <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="h-[400px]"
                >
                    <ProductCard {...product} />
                </motion.div>
            ))}
        </div>
      ) : (
        <div className="text-center py-20 text-neutral-500">
            <p className="text-xl">No products found matching your search.</p>
        </div>
      )}
    </div>
  );
}
