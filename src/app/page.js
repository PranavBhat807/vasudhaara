"use client";

import Hero from "@/components/Hero/Hero";
import { Button, Image, Card, CardBody } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      
      {/* Featured Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Featured Collections</h2>
          <p className="text-neutral-400">Curated just for you.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item, index) => (
                <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                    <Card isPressable className="h-[400px] w-full bg-neutral-900 border border-white/5 group">
                      <Image 
                        removeWrapper
                        alt="Collection background"
                        className="z-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-110"
                        src={`https://nextui.org/images/card-example-${index + 1}.jpeg`}
                      />
                      <CardBody className="absolute bottom-0 z-10 p-8 flex-col items-start bg-gradient-to-t from-black/90 to-transparent w-full">
                         <h3 className="text-2xl font-bold text-white mb-2">Collection {item}</h3>
                         <Button size="sm" color="primary" variant="flat">Shop Now</Button>
                      </CardBody>
                    </Card>
                </motion.div>
            ))}
        </div>
      </section>
    </div>
  );
}
