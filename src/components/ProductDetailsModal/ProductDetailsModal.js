"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Chip, Input, Textarea } from "@nextui-org/react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

export default function ProductDetailsModal({ isOpen, onClose, product, onReviewAdded }) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  // Review states
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  const [newReview, setNewReview] = useState({
    customerName: "",
    rating: 5,
    reviewText: "",
  });
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const fetchReviews = async () => {
    if (!product?.id) return;
    setIsLoadingReviews(true);
    try {
      const res = await fetch(`/api/reviews?productId=${product.id}`);
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews || []);
        if (data.averageRating !== null) {
          setAverageRating(data.averageRating);
          setReviewCount(data.reviewCount);
        } else {
          setAverageRating(null);
          setReviewCount(0);
        }
      }
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setIsLoadingReviews(false);
    }
  };

  React.useEffect(() => {
    if (isOpen && product?.id) {
      fetchReviews();
      // Reset form states
      setNewReview({ customerName: "", rating: 5, reviewText: "" });
      setSubmitError(null);
      setSubmitSuccess(false);
    }
  }, [isOpen, product?.id]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handlePostReview = async (e) => {
    e.preventDefault();
    if (!newReview.customerName.trim()) {
      setSubmitError("Please enter your name.");
      return;
    }
    if (!newReview.reviewText.trim()) {
      setSubmitError("Please enter a review message.");
      return;
    }

    setIsSubmittingReview(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          customerName: newReview.customerName,
          rating: newReview.rating,
          reviewText: newReview.reviewText,
        }),
      });

      if (res.ok) {
        setSubmitSuccess(true);
        setNewReview({ customerName: "", rating: 5, reviewText: "" });
        // Reload reviews & averages
        await fetchReviews();
        if (onReviewAdded) {
          onReviewAdded();
        }
        setTimeout(() => setSubmitSuccess(false), 4000);
      } else {
        const errData = await res.json();
        setSubmitError(errData.error || "Failed to post review. Please try again.");
      }
    } catch (err) {
      console.error("Error posting review:", err);
      setSubmitError("Network error. Please check your connection.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 relative bg-neutral-100 dark:bg-neutral-800 p-8 flex items-center justify-center">
              <div className="relative w-full h-64 md:h-full min-h-[300px]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="w-full md:w-1/2 p-6 md:p-8 overflow-y-auto">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <Chip color="primary" variant="flat" size="sm" className="mb-2">{product.category}</Chip>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">{product.title}</h2>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 18 18" /></svg>
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-bold text-primary">₹{product.price}</span>
                {averageRating && averageRating > 0 ? (
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span>★</span>
                      <span className="text-neutral-800 dark:text-neutral-200 font-bold">{averageRating}</span>
                    </div>
                    {reviewCount > 0 && (
                      <span className="text-xs text-neutral-500 dark:text-neutral-400">
                        ({reviewCount} customer {reviewCount === 1 ? "review" : "reviews"})
                      </span>
                    )}
                  </div>
                ) : null}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    {product.longDescription || product.description}
                  </p>
                </div>

                {product.ingredients && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {product.ingredients}
                    </p>
                  </div>
                )}

                {product.benefits && product.benefits.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Benefits</h3>
                    <ul className="list-disc list-inside space-y-1 text-neutral-600 dark:text-neutral-300">
                      {product.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.howToApply && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2">How to Apply</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {product.howToApply}
                    </p>
                  </div>
                )}

                {product.note && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-yellow-600 dark:text-yellow-500">Note</h3>
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/50">
                      <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                        {product.note}
                      </p>
                    </div>
                  </div>
                )}

                {/* Horizontal Separator */}
                <hr className="border-neutral-200 dark:border-neutral-800 my-4" />

                {/* Ratings & Reviews Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center justify-between">
                    <span>Customer Reviews</span>
                    {reviewCount > 0 && (
                      <span className="text-sm font-normal text-neutral-500">
                        {reviewCount} {reviewCount === 1 ? "review" : "reviews"}
                      </span>
                    )}
                  </h3>

                  {/* Reviews List */}
                  <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                    {reviews.length === 0 ? (
                      <p className="text-sm text-neutral-500 dark:text-neutral-400 italic py-2">
                        No reviews yet. Be the first to share your thoughts!
                      </p>
                    ) : (
                      reviews.map((rev) => (
                        <div
                          key={rev.id}
                          className="bg-neutral-50 dark:bg-neutral-900/60 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800/80 shadow-sm"
                        >
                          <div className="flex justify-between items-start gap-2 mb-2">
                            <div>
                              <span className="font-semibold text-gray-900 dark:text-white text-sm">
                                {rev.customer_name}
                              </span>
                              <div className="flex text-yellow-500 text-xs mt-0.5">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span key={i}>{i < rev.rating ? "★" : "☆"}</span>
                                ))}
                              </div>
                            </div>
                            <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">
                              {new Date(rev.created_at).toLocaleDateString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-600 dark:text-neutral-300 whitespace-pre-line leading-relaxed">
                            {rev.review_text}
                          </p>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Write a Review Form */}
                  <div className="bg-neutral-50/50 dark:bg-neutral-900/30 p-5 rounded-xl border border-neutral-100 dark:border-neutral-800/50">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                      Write a Review
                    </h4>

                    <form onSubmit={handlePostReview} className="space-y-4">
                      {/* Star Rating Selector */}
                      <div className="space-y-1">
                        <label className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                          Your Rating
                        </label>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                              className="text-2xl transition-transform hover:scale-110 active:scale-95 focus:outline-none"
                              aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                            >
                              <span className={star <= newReview.rating ? "text-yellow-500" : "text-neutral-300 dark:text-neutral-700"}>
                                ★
                              </span>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Customer Name */}
                      <div className="space-y-1">
                        <label className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                          Your Name
                        </label>
                        <Input
                          placeholder="Enter your name"
                          value={newReview.customerName}
                          onValueChange={(val) => setNewReview(prev => ({ ...prev, customerName: val }))}
                          isDisabled={isSubmittingReview}
                          variant="bordered"
                          classNames={{
                            input: "text-gray-900 dark:text-white text-sm",
                          }}
                        />
                      </div>

                      {/* Review Text */}
                      <div className="space-y-1">
                        <label className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">
                          Your Review
                        </label>
                        <Textarea
                          placeholder="Share your experience with this product..."
                          value={newReview.reviewText}
                          onValueChange={(val) => setNewReview(prev => ({ ...prev, reviewText: val }))}
                          isDisabled={isSubmittingReview}
                          variant="bordered"
                          minRows={3}
                          classNames={{
                            input: "text-gray-900 dark:text-white text-sm",
                          }}
                        />
                      </div>

                      {/* Status Messages */}
                      {submitError && (
                        <p className="text-xs text-red-500 font-medium bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                          ⚠️ {submitError}
                        </p>
                      )}
                      {submitSuccess && (
                        <p className="text-xs text-green-500 font-medium bg-green-500/10 p-2 rounded-lg border border-green-500/20">
                          ✓ Review posted successfully! Thank you.
                        </p>
                      )}

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmittingReview}
                        className="w-full font-semibold bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-xl shadow-md hover:shadow-pink-500/20 disabled:opacity-50 h-10 min-h-10 shrink-0 animate-pulse"
                      >
                        {isSubmittingReview ? "Submitting..." : "Post Review"}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <Button
                  color={isAdded ? "success" : "primary"}
                  size="lg"
                  className="flex-1 font-semibold shadow-lg shadow-primary/30"
                  onPress={handleAddToCart}
                >
                  {isAdded ? "Added to Cart" : "Add to Cart"}
                </Button>
                <Button variant="bordered" size="lg" className="flex-1 font-semibold">
                  Buy Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
