
"use client";

import React, { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProductDetailsModal from "@/components/ProductDetailsModal/ProductDetailsModal";
import { Input, Select, SelectItem } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const PRODUCTS = [
  {
    id: 1,
    title: "Rose Lip Balm",
    price: 199,
    rating: 4.8,
    description: "Gentle Hydration with Natural Glow",
    longDescription: "Our Rose Lip Balm is crafted with the essence of fresh roses and a blend of ultra-nourishing oils. It not only moisturizes but also imparts a subtle, natural pink tint to your lips, keeping them soft and petal-smooth all day long.",
    ingredients: "Rose extract, rose oil, beeswax, organic shea butter, sweet almond oil, jojoba oil, vitamin E, and natural plant waxes.",
    benefits: [
      "Instantly softens rough lips",
      "Adds a natural rosy tint",
      "Hydrates for up to 12 hours",
      "Soothes irritation and dryness",
      "Rich in antioxidants for healthy lips",
      "Free from synthetic fragrances and preservatives"
    ],
    image: "/rosebalm3.png",
    images: ["/rosebalm3.png", "/rosylipbalm.png"],
    category: "Skin Care",
    date: "2024-01-10"
  },
  
  {
    id: 2,
    title: "Hibiscus Lip Balm",
    price: 199,
    rating: 4.5,
    description: "Repair & Restore Naturally",
    longDescription: "Enriched with the goodness of hibiscus, this lip balm is a miracle worker for pigmented and sun-damaged lips. It naturally exfoliates and rejuvenates, revealing softer, brighter, and healthier-looking lips.",
    ingredients: "Hibiscus flower extract, coconut oil, beeswax, cocoa butter, vitamin E, castor oil, and organic honey.",
    benefits: [
      "Helps lighten dark lips",
      "Provides intense moisture",
      "Natural exfoliation for smoother texture",
      "Protects against UV damage",
      "Restores natural lip color",
      "100% natural and safe for daily use"
    ],
    image: "/hibisbalm2.png",
    images: ["/hibisbalm2.png", "/hibislipbalm.png"],
    category: "Skin Care",
    date: "2024-01-12"
  },
  {
    id: 3,
    title: "Strawberry Lip Balm",
    price: 199,
    rating: 4.9,
    description: "Natural Care for Soft & Healthy Lips",
    longDescription: "Our Strawberry Lip Balm is made with a rich blend of organic and natural ingredients that deeply nourish dry and chapped lips. Infused with strawberry extract, it helps restore natural lip softness while giving a mild fruity aroma.",
    ingredients: "Strawberry extract, castor oil, beeswax, shea butter, coconut oil, vitamin E, almond oil, cocoa butter, and natural plant waxes.",
    benefits: [
      "Deeply moisturizes dry and cracked lips",
      "Provides long-lasting hydration",
      "Helps reduce lip pigmentation with regular use",
      "Protects lips from environmental damage",
      "Leaves lips soft, smooth, and naturally glossy",
      "Free from parabens, artificial colors, and chemicals"
    ],
    image: "/berrybalm2.png",
    images: ["/berrybalm2.png", "/berrylipbalm.png"],
    category: "Skin Care",
    date: "2024-01-15"
  },
  {
    id: 4,
    title: "RESET Crack Heel Cream",
    price: 199,
    rating: 4.7,
    description: "Heals your heel in seconds.",
     longDescription: "Say goodbye to cracked heels with our advanced RESET formula. Penetrating deep into the skin layers, it repairs fissures, softens hard skin, and provides a protective barrier against further damage.",
    ingredients: "Urea, salicylic acid, shea butter, peppermint oil, tea tree oil, aloe vera gel, and vitamin E.",
    benefits: [
      "Visible results in just 3 days",
      "Soothes painful cracks immediately",
      "Softens hard calluses",
      "Antimicrobial properties prevent infection",
      "Non-greasy and fast-absorbing",
      "Suitable for diabetic foot care"
    ],
    image: "/reset.png",
    images: ["/reset2.png", "/reset.png"],
    category: "Skin Care",
    date: "2024-01-18"
  },
  {
    id: 5,
    title: "Kanaka Taila",
    price: 499,
    rating: 4.6,
    description: "Advanced Herbal Face Mark Remover",
    longDescription: "Kanaka Taila is a traditional Ayurvedic formulation known for its complexion-enhancing properties. It effectively reduces scars, dark spots, and blemishes, giving you a radiant and even skin tone.",
    ingredients: "Sesame oil, licorice, manjistha, red sandalwood, saffron, and lotus extracts.",
    benefits: [
      "Helps reduce wrinkles and improves skin textures",
      "Soothes burnt areas and reduces burning sensations",
      "Helps stop bleeding from minor cut",
      "Aids in faster wound healing",
      "100% Ayurvedic and chemical-free",
      "Helps reduce open pores and improves skin appearances"
    ],
    image: "/kanakaoil.png",
    images: ["/kanakaoil.png", "/kanakaoil2.png"],
    category: "Hair Care",
    date: "2024-01-20"
  },
  {
    id: 6,
    title: "Bringhraj Hair Oil",
    price: 349,
    rating: 4.3,
    description: "Oil just four your scalp",
    longDescription: "Unlock stronger, healthier hair with the ancient power of Bhringraj 🌿     Infused with nature’s most trusted hair-revitalizing herb, this nourishing oil deeply strengthens roots, boosts natural hair growth, and helps reduce hair fall from the very first use. Regular application works to slow premature graying, restore shine, and revive dull, lifeless hair—leaving it thicker, smoother, and visibly healthier. Perfect for daily care and suitable for all hair types, this is your go-to solution for naturally beautiful, resilient hair.",
    ingredients: "Bringhraj extract, coconut oil, amla, sesame oil, hibiscus, and brahmi.",
    benefits: [
      "Promotes faster hair growth",
      "Reduces hair fall significantly",
      "Prevents premature graying",
      "Cools the scalp and reduces stress",
      "Eliminates dandruff",
      "Makes hair thick, shiny, and strong"
    ],
    image: "/Bringhraj_hair_oil1.png",
    category: "Bath & Body",
    date: "2024-01-22"
  },
  {
    id: 7,
    title: "Rose Lip Balm(10 pcs)",
    price: 1800,
    rating: 4.8,
    description: "Gentle Hydration with Natural Glow",
    longDescription: "Our Rose Lip Balm is crafted with the essence of fresh roses and a blend of ultra-nourishing oils. It not only moisturizes but also imparts a subtle, natural pink tint to your lips, keeping them soft and petal-smooth all day long.",
    ingredients: "Rose extract, rose oil, beeswax, organic shea butter, sweet almond oil, jojoba oil, vitamin E, and natural plant waxes.",
    benefits: [
      "Instantly softens rough lips",
      "Adds a natural rosy tint",
      "Hydrates for up to 12 hours",
      "Soothes irritation and dryness",
      "Rich in antioxidants for healthy lips",
      "Free from synthetic fragrances and preservatives"
    ],
    image: "/set_of_10.png",
    images: ["/rosebalm3.png", "/set_of_10.png"],
    category: "Skin Care",
    date: "2024-01-10"
  },
  {
    id: 8,
    title: "Kids Rose Lip Balm",
    price: 180,
    rating: 4.8,
    description: "Gentle Hydration with Natural Glow",
    longDescription: "Our Rose Lip Balm is crafted with the essence of fresh roses and a blend of ultra-nourishing oils. It not only moisturizes but also imparts a subtle, natural pink tint to your lips, keeping them soft and petal-smooth all day long.",
    ingredients: "Rose extract, rose oil, beeswax, organic shea butter, sweet almond oil, jojoba oil, vitamin E, and natural plant waxes.",
    benefits: [
      "Instantly softens rough lips",
      "Adds a natural rosy tint",
      "Hydrates for up to 12 hours",
      "Soothes irritation and dryness",
      "Rich in antioxidants for healthy lips",
      "Free from synthetic fragrances and preservatives"
    ],
    image: "/kids.png",
    images: ["/kids.png", "/rosebalm3.png"],
    category: "Skin Care",
    date: "2024-01-10"
  }
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);

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
                    className="h-[400px] cursor-pointer"
                    onClick={() => setSelectedProduct(product)}
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

      <ProductDetailsModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </div>
  );
}
