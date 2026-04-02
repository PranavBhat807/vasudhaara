"use client";

import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Button, Image, Card, CardBody, Divider, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Input } from "@nextui-org/react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const total = getCartTotal();
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async (onClose) => {
    // Basic validation
    if (!formData.name || !formData.phone || !formData.address || !formData.city || !formData.zip) {
        alert("Please fill in all the required delivery details.");
        return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formData,
          cartItems,
          total
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create order');
      }
      
      setIsOrderPlaced(true);
      clearCart();
      onClose();
    } catch (error) {
      console.error(error);
      alert("There was an error placing your order. Please try again or check connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">Order Confirmed!</h1>
            <p className="text-neutral-300 text-lg mb-2">Thank you, {formData.name}!</p>
            <p className="text-neutral-400 mb-8">Your order will be shipped to {formData.address}, {formData.city}.</p>
            <Link href="/shop">
            <Button color="primary" size="lg" variant="shadow" className="font-semibold">
                Continue Shopping
            </Button>
            </Link>
        </motion.div>
      </div>
    );
  }

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
                        onPress={onOpen}
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

      {/* Checkout Form Modal */}
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop="blur"
        scrollBehavior="inside"
      >
        <ModalContent className="bg-neutral-900 border border-white/10">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-2xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent">
                Delivery Details
              </ModalHeader>
              <ModalBody>
                <p className="text-sm text-neutral-400 mb-4">
                  Please provide your accurate details so we can deliver your items safely.
                </p>
                <div className="space-y-4">
                  <Input
                    autoFocus
                    autoComplete="name"
                    isRequired
                    label="Full Name"
                    name="name"
                    placeholder="Enter your full name"
                    variant="bordered"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Email"
                    autoComplete="email"
                    name="email"
                    placeholder="Enter your email address"
                    type="email"
                    variant="bordered"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <Input
                    isRequired
                    autoComplete="tel"
                    label="Phone Number"
                    name="phone"
                    placeholder="Enter your contact number"
                    type="tel"
                    variant="bordered"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <Input
                    isRequired
                    autoComplete="street-address"
                    label="Shipping Address"
                    name="address"
                    placeholder="House No, Street, Landmark"
                    variant="bordered"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      isRequired
                      autoComplete="address-level2"
                      label="City"
                      name="city"
                      placeholder="City/Town"
                      variant="bordered"
                      value={formData.city}
                      onChange={handleInputChange}
                    />
                    <Input
                      label="State"
                      autoComplete="address-level1"
                      name="state"
                      placeholder="State/Province"
                      variant="bordered"
                      value={formData.state}
                      onChange={handleInputChange}
                    />
                  </div>
                  <Input
                    isRequired
                    autoComplete="postal-code"
                    label="ZIP / Pincode"
                    name="zip"
                    placeholder="Postal code"
                    variant="bordered"
                    value={formData.zip}
                    onChange={handleInputChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" isLoading={isSubmitting} onPress={() => handlePlaceOrder(onClose)}>
                  Place Order
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  );
}
