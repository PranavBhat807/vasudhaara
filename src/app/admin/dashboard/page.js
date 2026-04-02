'use client';

import React, { useEffect, useState } from 'react';
import { 
  Chip, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,
  Spinner, Card, CardBody, User
} from '@nextui-org/react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const deleteOrder = async (id) => {
    if (!confirm('Are you sure you want to delete this order?')) return;
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setOrders(orders.filter(o => o.id !== id));
      }
    } catch (error) {
      console.error('Failed to delete order:', error);
    }
  };

  const statusColorMap = {
    Pending: "warning",
    Processing: "primary",
    Delivered: "success",
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <Spinner size="lg" color="primary" label="Loading Orders..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] p-6 lg:p-12 pb-32">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
            Order Dashboard
          </h1>
          <p className="text-neutral-400">Track and manage customer deliveries seamlessly.</p>
        </motion.div>

        {orders.length === 0 ? (
          <Card className="bg-neutral-900 border border-white/5">
            <CardBody className="py-16 items-center text-center">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-white mb-2">No fresh orders</h2>
              <p className="text-neutral-400">When customers place an order, it will appear here dynamically.</p>
            </CardBody>
          </Card>
        ) : (
          <div className="grid gap-6">
            <AnimatePresence>
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="bg-neutral-900/50 backdrop-blur-xl border border-white/10 shadow-xl overflow-visible">
                    <CardBody className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-6 md:items-center">
                        
                        {/* Customer Info */}
                        <div className="flex-1 min-w-[250px] space-y-4">
                          <div>
                            <p className="text-xs text-neutral-500 uppercase tracking-wider font-bold mb-1">Customer</p>
                            <User 
                              name={order.customer_name}
                              description={order.customer_phone}
                              avatarProps={{
                                size: "md",
                                name: order.customer_name.charAt(0),
                                className: "bg-blue-500/20 text-blue-400"
                              }}
                            />
                            <div className="mt-4 text-sm text-neutral-400">
                              <p className="flex items-start gap-2">
                                <svg className="w-5 h-5 text-neutral-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span>{order.shipping_address}, {order.city}, {order.zip_code}</span>
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Order Details */}
                        <div className="flex-1 min-w-[300px] space-y-4 border-y md:border-y-0 md:border-x border-white/10 py-4 md:py-0 md:px-6">
                          <div>
                            <p className="text-xs text-neutral-500 uppercase tracking-wider font-bold mb-2">Order Items</p>
                            <div className="space-y-2 max-h-32 overflow-y-auto pr-2 custom-scrollbar">
                              {order.cart_items?.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center text-sm bg-neutral-800/50 p-2 rounded-lg border border-white/5">
                                  <span className="text-neutral-200 line-clamp-1 flex-1 pr-4">{item.title}</span>
                                  <span className="text-cyan-400 font-semibold whitespace-nowrap bg-cyan-500/10 px-2 py-0.5 rounded-md">Qty: {item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center bg-neutral-800/30 p-3 rounded-xl border border-white/5">
                            <span className="text-sm text-neutral-400">Total Amount</span>
                            <span className="text-lg font-bold text-white">₹{order.total_amount}</span>
                          </div>
                          
                          <div className="flex justify-between items-center text-xs">
                            <span className="text-neutral-500 uppercase tracking-wider font-bold">Payment Mode</span>
                            <span className="text-neutral-300 font-medium px-2 py-1 bg-white/5 rounded-md">{order.payment_mode || 'Cash on Delivery'}</span>
                          </div>
                        </div>

                        {/* Actions & Status */}
                        <div className="flex flex-col justify-between items-end gap-6 min-w-[150px]">
                          <Chip 
                            color={statusColorMap[order.status] || "default"}
                            variant="flat"
                            size="lg"
                            className="font-bold border-1 border-current ml-auto"
                          >
                            {order.status || 'Pending'}
                          </Chip>

                          <div className="flex flex-col gap-2 w-full">
                            <Dropdown className="bg-neutral-900 border border-white/10" placement="bottom-end">
                              <DropdownTrigger>
                                <Button variant="flat" color="default" className="w-full font-medium">
                                  Update Status
                                </Button>
                              </DropdownTrigger>
                              <DropdownMenu 
                                aria-label="Order status actions"
                                onAction={(key) => updateOrderStatus(order.id, key)}
                              >
                                <DropdownItem key="Pending" className="text-warning-500">Pending</DropdownItem>
                                <DropdownItem key="Processing" className="text-primary-500">Processing</DropdownItem>
                                <DropdownItem key="Delivered" className="text-success-500">Delivered</DropdownItem>
                              </DropdownMenu>
                            </Dropdown>

                            <Button 
                              color="danger" 
                              variant="light"
                              className="w-full font-medium"
                              onPress={() => deleteOrder(order.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                        
                      </div>
                    </CardBody>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
