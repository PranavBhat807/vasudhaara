
"use client";

import { motion } from "framer-motion";
import { Input, Textarea, Button } from "@nextui-org/react";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        <div className="space-y-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Contact Us</h1>
            <p className="text-neutral-300 text-lg">
                 We'd love to hear from you.
            </p>
            <div className="space-y-4 text-neutral-400">
                <p>📍 Prabhatnagar, Honnavar, Karnataka-581334</p>
                <p>📞 +91 78920 86973</p>
                <p>✉️ vandana.bhat0131@gmail.com</p>
            </div>
        </div>

        <div className="bg-neutral-900 p-8 rounded-3xl border border-white/5 shadow-2xl">
            <form className="space-y-4">
                <Input label="Name" placeholder="Enter your name" variant="bordered" />
                <Input label="Email" placeholder="Enter your email" type="email" variant="bordered" />
                <Textarea label="Message" placeholder="Enter your message" variant="bordered" />
                <Button color="primary" className="w-full font-semibold text-lg" size="lg">
                    Send Message
                </Button>
            </form>
        </div>
      </motion.div>
    </div>
  );
}
