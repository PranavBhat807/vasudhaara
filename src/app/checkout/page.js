"use client";

import React from "react";
import { useCart } from "@/context/CartContext";
import { Button, Image, Card, CardBody, Divider } from "@nextui-org/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const total = getCartTotal();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-6xl mb-4">🛒</div>
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Your Cart is Empty</h1>
            <p className="text-neutral-400 mb-8">Looks like you haven't added anything yet.</p>
            <Link href="/shop">
            <Button color="primary" size="lg" variant="shadow" className="font-semibold">
                Start Shopping
            </Button>
            </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 px-6 max-w-7xl mx-auto pb-20">
      <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items List */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item) => (
            <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
            >
                <Card className="bg-neutral-900 border border-white/5">
                <CardBody className="flex flex-row gap-4 items-center">
                    <div className="w-24 h-24 relative bg-neutral-800 rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                        removeWrapper
                    />
                    </div>
                    
                    <div className="flex-1 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div>
                            <h3 className="text-lg font-bold text-white">{item.title}</h3>
                            <p className="text-primary font-semibold">₹{item.price}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-neutral-800 rounded-lg p-1">
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-neutral-700 text-white transition-colors"
                                >
                                    -
                                </button>
                                <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                                <button 
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-neutral-700 text-white transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            
                            <Button 
                                isIconOnly 
                                color="danger" 
                                variant="light" 
                                aria-label="Remove item"
                                onClick={() => removeFromCart(item.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                            </Button>
                        </div>
                    </div>
                </CardBody>
                </Card>
            </motion.div>
          ))}
          
            <div className="flex justify-end mt-4">
                <Button 
                    color="danger" 
                    variant="flat" 
                    onClick={clearCart}
                    className="font-semibold"
                >
                    Clear Cart
                </Button>
            </div>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
            <Card className="bg-neutral-900 border border-white/5 sticky top-24">
                <CardBody className="p-6">
                    <h2 className="text-2xl font-bold mb-6 text-white">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-neutral-400">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>
                        <div className="flex justify-between text-neutral-400">
                            <span>Shipping</span>
                            <span className="text-green-500">Free</span>
                        </div>
                        <Divider className="bg-white/10" />
                        <div className="flex justify-between text-xl font-bold text-white">
                            <span>Total</span>
                            <span>₹{total}</span>
                        </div>
                    </div>

                    <Button 
                        color="primary" 
                        size="lg" 
                        className="w-full font-bold shadow-lg shadow-primary/20"
                    >
                        Proceed to Checkout
                    </Button>
                    <p className="text-center text-xs text-neutral-500 mt-4">
                        Secure Checkout &bullet; Free Shipping
                    </p>
                </CardBody>
            </Card>
        </div>
      </div>
    </div>
  );
}
