"use client";

import Hero from "@/components/Hero/Hero";
import { Button, Image, Card, CardBody } from "@nextui-org/react";
import NextImage from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />

      {/* Featured Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div
          className="text-center mb-16 animate-fade-in-up opacity-0"
        >
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Featured Collections</h2>
          <p className="text-neutral-400">Curated just for you.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "LipBalm Collection", image: "/hibisbalm2.png" },
            { name: "Oil Collection", image: "/kanakaoil.png" },
            { name: "Crack Heel Collection", image: "/reset2.png" }
          ].map((collection, index) => (
            <div
              key={index}
              className={`animate-fade-in-up opacity-0`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <Card className="h-[400px] w-full bg-neutral-900 border border-white/5 group overflow-hidden">
                <NextImage
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  alt={`${collection.name} background`}
                  className="z-0 object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-110"
                  src={collection.image}
                  priority={index === 0}
                />
                <CardBody className="absolute bottom-0 z-10 p-8 flex-col items-start bg-gradient-to-t from-black/90 to-transparent w-full">
                  <h3 className="text-2xl font-bold text-white mb-2">{collection.name}</h3>
                  <Button as={Link} href="/shop" size="sm" color="primary" variant="flat">Shop Now</Button>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
