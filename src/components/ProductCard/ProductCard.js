"use client";

import React from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { motion } from "framer-motion";

export default function ProductCard({ title, price, description, image, rating }) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card shadow="sm" className="w-full h-full bg-neutral-900 border border-white/5 hover:border-pink-500/50 transition-colors">
        <CardBody className="overflow-visible p-0 relative group">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              alt={title}
              className="w-full object-cover h-[250px] group-hover:scale-105 transition-transform duration-500"
              src={image || "https://nextui.org/images/fruit-1.jpeg"}
            />
            <div className="absolute top-2 right-2 z-10 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-warning text-sm font-bold flex items-center gap-1">
                <span>★</span> {rating}
            </div>
        </CardBody>
        <CardFooter className="text-small justify-between flex-col items-start gap-2 p-4">
          <div className="w-full flex justify-between items-start">
             <b className="text-lg text-white">{title}</b>
             <p className="text-default-500 text-lg font-semibold">₹{price}</p>
          </div>
          <p className="text-default-400 text-sm line-clamp-2">{description}</p>
          <Button 
            className="w-full mt-2 bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-semibold shadow-lg"
            radius="full"
            size="sm"
          >
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
