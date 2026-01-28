
"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-8 text-center md:text-left"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent mb-8">About Vasudhara</h1>
        
        <div className="prose prose-invert prose-lg max-w-none text-neutral-300 space-y-6">
          <p>
            Vasudhaara was created from the need for care that families can truly trust. We believe what touches your skin should be as safe and comforting as care made at home.
          </p>
          <p>
            Gently crafted with natural ingredients, our products are designed for every age from little hands to elderly days. We avoid harsh chemicals and shortcuts, focusing instead on honest, thoughtful formulations inspired by traditional care and everyday family rituals.
          </p>
          <p>
            Made with patience, love, and responsibility, Vasudhaara brings comfort, safety, and nature back into daily life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="h-64 bg-neutral-800 rounded-2xl flex items-center justify-center border border-white/5">
                <span className="text-neutral-500">Image Placeholder</span>
            </div>
            <div className="h-64 bg-neutral-800 rounded-2xl flex items-center justify-center border border-white/5">
                <span className="text-neutral-500">Image Placeholder</span>
            </div>
        </div>
      </motion.div>
    </div>
  );
}
