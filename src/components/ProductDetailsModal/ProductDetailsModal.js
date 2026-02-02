"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Chip } from "@nextui-org/react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsModal({ isOpen, onClose, product }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative bg-neutral-100 dark:bg-neutral-800 p-8 flex items-center justify-center">
              <div className="relative w-full h-64 md:h-full min-h-[300px]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Chip color="primary" variant="flat" size="sm" className="mb-2">{product.category}</Chip>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{product.title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                <div className="flex items-center gap-1 text-yellow-500">
                  <span>★</span>
                  <span className="text-neutral-600 dark:text-neutral-400 font-medium">{product.rating}</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {product.longDescription || product.description}
                  </p>
                </div>

                {product.ingredients && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {product.ingredients}
                    </p>
                  </div>
                )}

                {product.benefits && product.benefits.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                    <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-300">
                      {product.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.howToApply && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">How to Apply</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {product.howToApply}
                    </p>
                  </div>
                )}

                {product.note && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-yellow-600 dark:text-yellow-500">Note</h3>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/50">
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                        {product.note}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-8 flex gap-4">
                <Button
                  color={isAdded ? "success" : "primary"}
                  size="lg"
                  className="flex-1 font-semibold shadow-lg shadow-primary/30"
                  onClick={handleAddToCart}
                >
                  {isAdded ? "Added to Cart" : "Add to Cart"}
                </Button>
                <Button variant="bordered" size="lg" className="flex-1 font-semibold">
                  Buy Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
