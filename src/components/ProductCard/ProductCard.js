"use client";

import React, { useState } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductCard({ title, price, description, image, images, rating }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const imageList = images && images.length > 0 ? images : [image]; // fallback
  const hasMultipleImages = imageList.length > 1;

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentImageIndex((prev) => {
        let nextIndex = prev + newDirection;
        if (nextIndex < 0) nextIndex = imageList.length - 1;
        if (nextIndex >= imageList.length) nextIndex = 0;
        return nextIndex;
    });
  };

  const nextImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    paginate(1);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    e.preventDefault();
    paginate(-1);
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    })
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card shadow="sm" className="w-full h-full bg-neutral-900 border border-white/5 hover:border-pink-500/50 transition-colors">
        <CardBody className="overflow-visible p-0 relative group">
            {/* Image Slider Container */}
            <div className="relative w-full h-[250px] overflow-hidden rounded-t-lg bg-neutral-800">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentImageIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0 w-full h-full"
                    >
                        <Image
                            shadow="none"
                            radius="none"
                            width="100%"
                            alt={title}
                            className="w-full h-full object-cover"
                            src={imageList[currentImageIndex] || "https://nextui.org/images/fruit-1.jpeg"}
                            removeWrapper
                        />
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                {hasMultipleImages && (
                    <>
                        {/* Gradient overlays for better visibility */}
                        <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />
                        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none" />

                        <button 
                            onClick={prevImage} 
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
                            aria-label="Previous image"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                        </button>
                        <button 
                            onClick={nextImage} 
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/50"
                            aria-label="Next image"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 p-1 rounded-full bg-black/20 backdrop-blur-sm">
                            {imageList.map((_, idx) => (
                                <div 
                                    key={idx} 
                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/50'}`} 
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
            
            <div className="absolute top-2 right-2 z-30 bg-black/50 backdrop-blur-md px-2 py-1 rounded-full text-warning text-sm font-bold flex items-center gap-1 shadow-sm">
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
