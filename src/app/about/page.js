
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
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
