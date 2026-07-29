"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";

// --- SVG Icons Component Helper ---
const Icon = {
  Phone: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
      />
    </svg>
  ),
  WhatsApp: () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  ),
  Location: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  ),
  ArrowUp: () => (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 10l7-7m0 0l7 7m-7-7v18"
      />
    </svg>
  ),
  Check: () => (
    <svg
      className="w-5 h-5 text-[#D4AF37]"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={3}
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
  Star: () => (
    <svg className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  ),
};

// Data Collections
const SERVICES = [
  {
    id: "wardrobes",
    name: "Wardrobes",
    desc: "Custom wardrobes designed to store your clothes and keep your room tidy.",
    img: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "kitchens",
    name: "Kitchen Cabinets",
    desc: "Clean and practical kitchen cabinets built for daily cooking and easy care.",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "beds",
    name: "Beds",
    desc: "Strong luxury bed frames crafted for deep rest and stylish bedrooms.",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "tv-consoles",
    name: "TV Panels & Consoles",
    desc: "Modern wall units and consoles that make your living area look neat.",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "wall-panels",
    name: "Wall Panels",
    desc: "Decorative wall panels that add instant warmth and class to empty walls.",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "office",
    name: "Office Tables",
    desc: "Executive office desks that keep your work area comfortable and organized.",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "doors",
    name: "Doors",
    desc: "Solid interior and exterior doors made with smooth, durable finishes.",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "custom",
    name: "Custom Furniture",
    desc: "Made-to-order furniture pieces built to fit your exact measurements.",
    img: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80",
  },
];

const REASONS = [
  "Premium Materials",
  "Skilled Craftsmanship",
  "Custom Designs",
  "Affordable Luxury",
  "Modern Finishing",
  "Timely Delivery",
  "Customer Satisfaction",
  "Professional Installation",
];

const PORTFOLIO_ITEMS = [
  {
    category: "Bedrooms",
    title: "Luxury Master Suite",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Wardrobes",
    title: "Walk-In Glass Wardrobe",
    img: "https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Kitchens",
    title: "Modern Marble Island Kitchen",
    img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "TV Units",
    title: "Floating Marble TV Wall",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Wall Panels",
    title: "Acoustic Wood Paneling",
    img: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Doors",
    title: "Solid Oak Security Entrance",
    img: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
  },
  {
    category: "Office Furniture",
    title: "Executive Desk & Shelving",
    img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Consultation",
    desc: "We sit down with you to listen to your ideas and needs.",
  },
  {
    step: "02",
    title: "Design Planning",
    desc: "We draw simple 3D plans so you see how it looks.",
  },
  {
    step: "03",
    title: "Material Selection",
    desc: "We pick top wood, colors, handles, and durable parts.",
  },
  {
    step: "04",
    title: "Production",
    desc: "Our skilled carpenters build each item with care.",
  },
  {
    step: "05",
    title: "Installation",
    desc: "We deliver and set up everything neatly in your home.",
  },
  {
    step: "06",
    title: "Final Inspection",
    desc: "We check all details together to ensure you love it.",
  },
];

const TESTIMONIALS = [
  {
    text: "Our wardrobe exceeded our expectations. Excellent finishing.",
    author: "Emeka O.",
    location: "Maitama, Abuja",
  },
  {
    text: "Their kitchen cabinets transformed our home completely.",
    author: "Aisha M.",
    location: "Gwarinpa, Abuja",
  },
  {
    text: "Professional from start to finish. Good wood and clean work.",
    author: "Dr. David K.",
    location: "Asokoro, Abuja",
  },
];

export default function Home() {
  const [navBackground, setNavBackground] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavBackground(true);
        setShowScrollTop(true);
      } else {
        setNavBackground(false);
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredPortfolio =
    activeTab === "All"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.category === activeTab);

  const categories = [
    "All",
    "Bedrooms",
    "Wardrobes",
    "Kitchens",
    "TV Units",
    "Wall Panels",
    "Doors",
    "Office Furniture",
  ];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="relative bg-[#0D0D0D] text-gray-100 min-h-screen selection:bg-[#D4AF37] selection:text-black">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#D4AF37] z-50 origin-left"
        style={{ scaleX }}
      />

      {/* STICKY NAVIGATION */}
      <nav
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          navBackground
            ? "bg-[#0D0D0D]/90 backdrop-blur-md py-4 border-b border-neutral-800"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <a href="#" className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold tracking-tight text-white">
              ALBERT <span className="text-[#D4AF37]">FURNITURES</span>
            </span>
            <span className="text-[10px] tracking-widest text-neutral-400 uppercase">
              Quality • Style • Comfort
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <a href="#about" className="hover:text-[#D4AF37] transition">
              About
            </a>
            <a href="#services" className="hover:text-[#D4AF37] transition">
              Services
            </a>
            <a href="#why-us" className="hover:text-[#D4AF37] transition">
              Why Us
            </a>
            <a href="#portfolio" className="hover:text-[#D4AF37] transition">
              Portfolio
            </a>
            <a href="#process" className="hover:text-[#D4AF37] transition">
              Process
            </a>
            <a href="#testimonials" className="hover:text-[#D4AF37] transition">
              Reviews
            </a>
            <a href="#contact" className="hover:text-[#D4AF37] transition">
              Contact
            </a>
          </div>

          {/* Nav CTAs */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://wa.me/2348142261463?text=Hello%20Albert%20Furnitures,%20I%20would%20like%20to%20get%20a%20free%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-[#D4AF37] text-black font-semibold px-5 py-2.5 rounded-full hover:bg-yellow-500 transition text-sm shadow-lg shadow-[#D4AF37]/20"
            >
              <Icon.WhatsApp />
              <span>Free Quote</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-[#141414] border-b border-neutral-800 px-6 py-6"
            >
              <div className="flex flex-col space-y-4 text-base">
                <a href="#about" onClick={() => setMobileMenuOpen(false)}>
                  About
                </a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)}>
                  Services
                </a>
                <a href="#why-us" onClick={() => setMobileMenuOpen(false)}>
                  Why Us
                </a>
                <a href="#portfolio" onClick={() => setMobileMenuOpen(false)}>
                  Portfolio
                </a>
                <a href="#process" onClick={() => setMobileMenuOpen(false)}>
                  Process
                </a>
                <a
                  href="#testimonials"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Reviews
                </a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </a>
                <a
                  href="https://wa.me/2348142261463?text=Hello%20Albert%20Furnitures,%20I%20would%20like%20to%20get%20a%20free%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 bg-[#D4AF37] text-black font-semibold py-3 rounded-lg mt-2"
                >
                  <Icon.WhatsApp />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
        {/* Dark Luxury Overlay Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=80"
            alt="Luxury Interior Background"
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-[#2C1A0E] border border-[#D4AF37]/30 px-3 py-1.5 rounded-full text-xs text-[#D4AF37]">
              <span>Handcrafted in Abuja, Nigeria</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-tight">
              Luxury Furniture <br />
              <span className="text-[#D4AF37]">
                Crafted For Beautiful Living
              </span>
            </h1>

            <p className="text-gray-300 text-lg max-w-2xl font-normal leading-relaxed">
              From elegant bedrooms to modern kitchens, TV consoles, office
              furniture, wardrobes, doors, and complete interior solutions, we
              transform empty spaces into luxurious homes and workspaces.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <a
                href="#contact"
                className="bg-[#D4AF37] hover:bg-yellow-500 text-black font-semibold text-center px-8 py-4 rounded-xl transition shadow-xl shadow-[#D4AF37]/20"
              >
                Get Free Quote
              </a>
              <a
                href="https://wa.me/2348142261463?text=Hello%20Albert%20Furnitures,%20I%20want%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="border border-neutral-700 hover:border-[#D4AF37] text-white flex items-center justify-center space-x-2 px-8 py-4 rounded-xl transition bg-neutral-900/50 backdrop-blur-sm"
              >
                <Icon.WhatsApp />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Quick Floating Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-neutral-800">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-[#D4AF37]">
                  100%
                </p>
                <p className="text-xs text-neutral-400">
                  Quality Craftsmanship
                </p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  Custom
                </p>
                <p className="text-xs text-neutral-400">Premium Designs</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-[#D4AF37]">
                  Modern
                </p>
                <p className="text-xs text-neutral-400">Smooth Finishing</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  5 Stars
                </p>
                <p className="text-xs text-neutral-400">
                  Customer Satisfaction
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80"
                alt="Luxury Furniture Showroom"
                className="w-full h-[480px] object-cover hover:scale-105 transition duration-700"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-[#0D0D0D]/90 backdrop-blur-md p-4 rounded-xl border border-neutral-800">
                <p className="text-xs text-[#D4AF37] font-semibold tracking-wider uppercase">
                  Showroom Location
                </p>
                <p className="text-sm text-white font-medium">
                  Shop 8, Kugbo Furniture Market, Abuja
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24 bg-[#141414] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden border border-neutral-800 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80"
                  alt="Carpenter Crafting Wood Furniture"
                  className="w-full h-[450px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#2C1A0E] text-[#D4AF37] p-6 rounded-2xl border border-[#D4AF37]/30 hidden md:block max-w-xs shadow-2xl">
                <p className="font-bold text-lg">Solid Wood Quality</p>
                <p className="text-xs text-neutral-300 mt-1">
                  Built strong to last long in your home or office.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
                About Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Crafting Spaces You will Love
              </h2>
              <p className="text-gray-300 leading-relaxed text-base">
                Albert Furnitures and Interiors specializes in designing and
                manufacturing premium-quality furniture that combines elegance,
                durability, functionality, and comfort.
              </p>
              <p className="text-gray-300 leading-relaxed text-base">
                Whether you are furnishing a home, office, apartment, hotel, or
                commercial space, our experienced craftsmen deliver exceptional
                furniture tailored to your style and needs.
              </p>

              <blockquote className="border-l-2 border-[#D4AF37] pl-4 py-2 my-4 bg-neutral-900/60 rounded-r-lg">
                <p className="text-sm font-medium text-white">Our Mission:</p>
                <p className="text-xs text-neutral-400 italic">
                  To provide furniture that brings beauty, comfort, and lasting
                  value.
                </p>
              </blockquote>

              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-block bg-[#2C1A0E] hover:bg-[#3D271D] text-[#D4AF37] font-semibold px-6 py-3 rounded-xl border border-[#D4AF37]/30 transition text-sm"
                >
                  Visit Our Abuja Showroom
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
              What We Make
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Our Core Services
            </h2>
            <p className="text-gray-400 text-sm mt-3">
              Every item is built with care, good wood, and modern designs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[#161616] border border-neutral-800 rounded-2xl overflow-hidden hover:border-[#D4AF37]/50 transition group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161616] to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white group-hover:text-[#D4AF37] transition">
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section
        id="why-us"
        className="py-24 bg-[#141414] border-y border-neutral-800"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Built To Superior Standards
            </h2>
            <p className="text-gray-400 text-sm mt-3">
              Why homes and offices in Abuja trust Albert Furnitures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {REASONS.map((reason, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="bg-[#1C1C1C] p-6 rounded-2xl border border-neutral-800 hover:border-[#D4AF37]/40 transition flex items-center space-x-4"
              >
                <div className="p-2.5 rounded-xl bg-[#2C1A0E] text-[#D4AF37] shrink-0">
                  <Icon.Check />
                </div>
                <span className="text-white font-medium text-sm">{reason}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION */}
      <section id="portfolio" className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
              Recent Projects
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Our Portfolio
            </h2>
            <p className="text-gray-400 text-sm mt-3">
              Explore custom furniture items built for our clients.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition ${
                  activeTab === cat
                    ? "bg-[#D4AF37] text-black font-semibold shadow-md"
                    : "bg-[#1A1A1A] text-neutral-400 hover:text-white hover:bg-neutral-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredPortfolio.map((item, idx) => (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#161616] border border-neutral-800 rounded-2xl overflow-hidden group relative"
                >
                  <div className="h-64 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[#D4AF37] uppercase font-semibold">
                        {item.category}
                      </span>
                      <h3 className="text-base font-bold text-white mt-0.5">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section id="process" className="py-24 bg-[#141414] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
              How We Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              Simple 6-Step Process
            </h2>
            <p className="text-gray-400 text-sm mt-3">
              We make ordering your custom furniture easy and stress-free.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((p, idx) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="bg-[#1A1A1A] p-8 rounded-2xl border border-neutral-800 relative hover:border-[#D4AF37]/50 transition"
              >
                <span className="text-4xl font-black text-[#D4AF37]/30 absolute top-6 right-6">
                  {p.step}
                </span>
                <h3 className="text-xl font-bold text-white mb-2">{p.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
              Testimonials
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">
              What Our Clients Say
            </h2>
            <p className="text-gray-400 text-sm mt-3">
              Real feedback from happy homeowners in Abuja.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-[#161616] p-8 rounded-2xl border border-neutral-800 flex flex-col justify-between"
              >
                <div>
                  <div className="flex space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Icon.Star key={i} />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-300 italic mb-6">
                    {`"${t.text}"`}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{t.author}</p>
                  <p className="text-xs text-neutral-500">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-gradient-to-r from-[#2C1A0E] via-[#1A1009] to-[#0D0D0D] border-y border-[#D4AF37]/30 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Ready To Transform Your Space?
          </h2>
          <p className="text-gray-300 text-base max-w-2xl mx-auto mb-8">
            Let us build furniture that reflects your style and personality.
            Strong wood, custom sizes, perfect finishes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#contact"
              className="bg-[#D4AF37] hover:bg-yellow-500 text-black font-semibold px-8 py-4 rounded-xl transition text-sm shadow-xl"
            >
              Get Free Quote
            </a>
            <a
              href="https://wa.me/2348142261463?text=Hello%20Albert%20Furnitures,%20I%20am%20ready%20to%20start."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 px-8 py-4 rounded-xl transition text-sm flex items-center space-x-2"
            >
              <Icon.WhatsApp />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-xs font-semibold tracking-widest text-[#D4AF37] uppercase">
                  Contact Us
                </span>
                <h2 className="text-3xl font-bold text-white mt-2">
                  Visit Our Showroom
                </h2>
                <p className="text-gray-400 text-sm mt-2">
                  Come see our wood samples and finished furniture items in
                  Abuja.
                </p>
              </div>

              <div className="space-y-6 text-sm">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#1A1A1A] rounded-xl border border-neutral-800 text-[#D4AF37]">
                    <Icon.Location />
                  </div>
                  <div>
                    <p className="font-bold text-white">Showroom Address</p>
                    <p className="text-neutral-400 mt-1">
                      Shop 8, Kugbo Furniture Market, Abuja, Nigeria
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#1A1A1A] rounded-xl border border-neutral-800 text-[#D4AF37]">
                    <Icon.Phone />
                  </div>
                  <div>
                    <p className="font-bold text-white">Phone Numbers</p>
                    <a
                      href="tel:08142261463"
                      className="block text-neutral-400 hover:text-[#D4AF37] mt-1"
                    >
                      08142261463
                    </a>
                    <a
                      href="tel:09166954736"
                      className="block text-neutral-400 hover:text-[#D4AF37]"
                    >
                      09166954736
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-[#1A1A1A] rounded-xl border border-neutral-800 text-[#D4AF37]">
                    <Icon.WhatsApp />
                  </div>
                  <div>
                    <p className="font-bold text-white">WhatsApp Chat</p>
                    <a
                      href="https://wa.me/2348142261463"
                      target="_blank"
                      rel="noreferrer"
                      className="block text-neutral-400 hover:text-[#D4AF37] mt-1"
                    >
                      08142261463
                    </a>
                  </div>
                </div>
              </div>

              {/* Simple Map Placeholder */}
              <div className="rounded-2xl overflow-hidden border border-neutral-800 h-48 bg-[#181818] relative flex items-center justify-center p-4 text-center">
                <div className="space-y-2">
                  <Icon.Location />
                  <p className="text-xs text-neutral-400 font-medium">
                    Located in Kugbo Furniture Market, Abuja
                  </p>
                  <a
                    href="https://maps.google.com/?q=Kugbo+Furniture+Market+Abuja"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-xs text-[#D4AF37] underline"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7 bg-[#141414] p-8 md:p-10 rounded-2xl border border-neutral-800">
              <h3 className="text-xl font-bold text-white mb-2">
                Request A Free Quote
              </h3>
              <p className="text-xs text-neutral-400 mb-6">
                Fill out this short form and we will call you back fast.
              </p>

              {formSubmitted ? (
                <div className="bg-[#2C1A0E] border border-[#D4AF37] text-[#D4AF37] p-6 rounded-xl text-center">
                  <p className="font-bold text-base">Thank you!</p>
                  <p className="text-xs text-neutral-300 mt-1">
                    We received your request and will call you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4 text-sm">
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Bello"
                      className="w-full bg-[#1F1F1F] border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="08012345678"
                        className="w-full bg-[#1F1F1F] border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">
                        Service Needed
                      </label>
                      <select className="w-full bg-[#1F1F1F] border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]">
                        <option value="Wardrobes">Wardrobe</option>
                        <option value="Kitchen Cabinets">
                          Kitchen Cabinets
                        </option>
                        <option value="Bed Frame">Bed Frame</option>
                        <option value="TV Console">TV Console / Panel</option>
                        <option value="Wall Panels">Wall Panels</option>
                        <option value="Office Tables">Office Tables</option>
                        <option value="Doors">Doors</option>
                        <option value="Full Interior">
                          Full Interior Design
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Project Details
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Tell us what you want to build or your room dimensions..."
                      className="w-full bg-[#1F1F1F] border border-neutral-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#D4AF37]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:bg-yellow-500 text-black font-semibold py-4 rounded-xl transition"
                  >
                    Send Quote Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#080808] border-t border-neutral-900 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          {/* Brand */}
          <div className="space-y-3">
            <span className="text-xl font-bold text-white">
              ALBERT <span className="text-[#D4AF37]">FURNITURES</span>
            </span>
            <p className="text-xs text-[#D4AF37]">Quality • Style • Comfort</p>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Premium furniture and custom interior design tailored for luxury
              homes and workspaces in Abuja, Nigeria.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-white font-bold mb-4 text-xs tracking-wider uppercase">
              Quick Links
            </p>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#about" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition">
                  Our Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-white transition">
                  Project Gallery
                </a>
              </li>
              <li>
                <a href="#process" className="hover:text-white transition">
                  Our Process
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Location & Hours */}
          <div>
            <p className="text-white font-bold mb-4 text-xs tracking-wider uppercase">
              Business Hours
            </p>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>Mon - Sat: 8:00 AM - 6:00 PM</li>
              <li>Sunday: By Appointment</li>
              <li className="pt-2 text-neutral-300 font-medium">
                Shop 8, Kugbo Furniture Market, Abuja
              </li>
            </ul>
          </div>

          {/* Phone */}
          <div>
            <p className="text-white font-bold mb-4 text-xs tracking-wider uppercase">
              Direct Contact
            </p>
            <p className="text-xs text-neutral-400">
              Call or WhatsApp anytime:
            </p>
            <p className="text-sm font-bold text-[#D4AF37] mt-1">08142261463</p>
            <p className="text-sm font-bold text-white">09166954736</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-neutral-900 text-center text-xs text-neutral-500">
          © 2026 Albert Furnitures and Interiors. All Rights Reserved.
        </div>
      </footer>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/2348142261463?text=Hello%20Albert%20Furnitures,%20I%20have%20an%20inquiry."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp Support"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition duration-300 flex items-center justify-center"
      >
        <Icon.WhatsApp />
      </a>

      {/* BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className="fixed bottom-6 left-6 z-50 bg-[#1A1A1A] border border-neutral-700 text-[#D4AF37] p-3 rounded-full shadow-xl hover:bg-[#2C1A0E] transition"
          >
            <Icon.ArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
