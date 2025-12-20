"use client";

import React from "react";
import { Button } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-neutral-900 via-stone-900 to-neutral-900">
      {/* Background Shapes */}
      <div className="absolute inset-0 overflow-hidden">
         <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] bg-pink-500/10 rounded-full blur-3xl opacity-50"
         />
         <motion.div 
            animate={{ 
              scale: [1, 1.5, 1],
              rotate: [0, -90, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-yellow-500/10 rounded-full blur-3xl opacity-50"
         />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center gap-6">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white tracking-tight"
        >
          Shop for <span className="bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Beauty</span>,
          <br />
          Shop for <span className="bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">Cause</span>,
          <br />
          Shop <span className="bg-gradient-to-r from-amber-200 to-amber-500 bg-clip-text text-transparent">Herbal</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-neutral-300 max-w-2xl"
        >
          Experience the finest herbal products crafted with care. Enhance your natural beauty while contributing to a sustainable future.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 mt-4"
        >
          <Button 
            size="lg" 
            color="primary" 
            variant="shadow" 
            className="font-semibold text-lg px-8 py-6 bg-gradient-to-r from-pink-500 to-yellow-500 border-none"
            as="a"
            href="/shop"
          >
            Explore Collection
          </Button>
          <Button 
            size="lg" 
            variant="bordered" 
            className="font-semibold text-lg px-8 py-6 text-white border-white/30 hover:bg-white/10"
            as="a"
            href="/about"
          >
            Our Story
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
