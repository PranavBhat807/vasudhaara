
"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20 px-6 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-12 text-center md:text-left"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-yellow-500 bg-clip-text text-transparent mb-8">About Vasudhaara</h1>
        
        {/* Who We Are */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Who We Are</h2>
          <div className="prose prose-invert prose-lg max-w-none text-neutral-300 space-y-6">
            <p>
              Vasudhaara was created from the need for care that families can truly trust. Our roots trace back to our ancestors, where wellness began at home. What started as simple yet powerful home remedies prepared by our grandmother has grown into a brand built on generations of belief, patience, and natural healing.
            </p>
            <p>
              We believe that what touches your skin should be as safe and comforting as care made at home. Inspired by traditional knowledge and everyday family rituals, Vasudhaara brings together ancestral wisdom and mindful formulation to create products that feel gentle, familiar, and dependable.
            </p>
            <p>
              Gently crafted with natural ingredients, our products are designed for every age—from little hands to elderly days. Each formulation reflects our commitment to purity, safety, and thoughtful care, staying true to the values that guided our family long before Vasudhaara became a brand.
            </p>
          </div>
        </section>

        {/* Our Mission */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Our Mission</h2>
          <div className="prose prose-invert prose-lg max-w-none text-neutral-300 space-y-6">
            <p>
              Our mission is to preserve and revive traditional home-based care by offering natural, reliable solutions that families can use with confidence. We strive to create products that support everyday well-being while honoring time-tested practices passed down through generations.
            </p>
            <p>
              By avoiding harsh chemicals and shortcuts, we focus instead on honest, responsible formulations that prioritize long-term health and comfort over quick results.
            </p>
          </div>
        </section>

        {/* Our Philosophy */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Our Philosophy</h2>
           <div className="prose prose-invert prose-lg max-w-none text-neutral-300 space-y-6">
            <p>
              At Vasudhaara, care is intentional. We believe wellness is built through consistency, simplicity, and respect for nature.
            </p>
            <p>Our philosophy is rooted in:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Traditional family remedies</li>
              <li>Natural, skin-friendly ingredients</li>
              <li>Gentle formulations suitable for all ages</li>
              <li>Mindful production with responsibility toward people and nature</li>
            </ul>
            <p>
              Every product is made with patience, love, and responsibility, reflecting the same care once given within our own home.
            </p>
          </div>
        </section>

        {/* Quality Assurance */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Quality Assurance</h2>
          <div className="prose prose-invert prose-lg max-w-none text-neutral-300 space-y-6">
            <p>
              Quality at Vasudhaara is non-negotiable. Each product undergoes careful evaluation to ensure safety, purity, and effectiveness while remaining gentle enough for daily use.
            </p>
            <p>Our quality commitments include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Thoughtfully selected natural ingredients</li>
              <li>No chemicals or unnecessary additives</li>
              <li>Safe, skin-friendly formulations</li>
              <li>Careful attention at every stage of creation</li>
            </ul>
            <p>
              We create with the belief that true care should never compromise safety.
            </p>
          </div>
        </section>

        {/* Why Vasudhaara? */}
        <section className="space-y-6">
          <h2 className="text-3xl font-semibold text-white">Why Vasudhaara?</h2>
          <div className="prose prose-invert prose-lg max-w-none text-neutral-300 space-y-6">
            <p>
              Vasudhaara stands apart because it is not just formulated—it is rooted in family, tradition, and trust.
            </p>
            <p>Reasons to Choose Vasudhaara:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Ancestral home-remedy foundation</li>
              <li>Safe and comforting care for all ages</li>
              <li>Natural, thoughtfully crafted products</li>
              <li>Inspired by everyday family rituals</li>
              <li>Commitment to responsibility and sustainability</li>
            </ul>
            <p className="font-semibold text-white pt-4">
              Vasudhaara brings comfort, safety, and nature back into daily life—just the way care was always meant to be.
            </p>
            <p className="italic text-pink-400">
              Vasudhaara brings the warmth of home into everyday family care
            </p>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
