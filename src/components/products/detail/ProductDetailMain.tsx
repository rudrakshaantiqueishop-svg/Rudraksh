"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, Eye, Heart, ShieldCheck, Lock, Award, Truck, Mail, ChevronDown, Plus, Minus, Info } from "lucide-react";

const galleryImages = {
  main: "/assets/images/about/about-sacred-2.png",
  left: "/assets/images/products/category-necklace.png",
  topRight: "/assets/images/about/about-p02.png",
  bottomRight: "/assets/images/home/rudraksh.png",
};

const designs = [
  { label: "Loose Bead", price: "$0", image: "/assets/images/home/beads.png" },
  { label: "Silver Capped", price: "+$120", image: "/assets/images/products/category-bracelets.png" },
  { label: "Silver Chain", price: "+$180", image: "/assets/images/products/category-charms.png" },
  { label: "Rudraksha Chain", price: "+$220", image: "/assets/images/products/category-earrings.png" },
];

const energizationOptions = [
  { label: "Free Touch Energization", extra: "" },
  { label: "Rudraksha Prana Pratishtha Pooja", extra: "+$299" },
  { label: "Maha Shivaratri Pooja at Pashupatinath - 2026", extra: "+$301" },
  { label: "Trividha Prana Pratishtha Pooja (3 Brahmans)", extra: "+$599" },
  { label: "Dwadasha Maha Prana Pratishtha Pooja (13 Brahmans)", extra: "+$1,200" },
];

const accordionSections = [
  {
    title: "DESCRIPTION",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  { title: "SHIPPING", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { title: "PACKAGING", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { title: "RETURNS & CANCELLATIONS", content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
];

export default function ProductDetailMain() {
  const [selectedDesign, setSelectedDesign] = useState(0);
  const [selectedEnergization, setSelectedEnergization] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState(0);

  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      {/* Breadcrumb */}
      <div className="font-lato text-xs tracking-[0.5px] uppercase text-gray-text mb-6 flex items-center gap-2 flex-wrap">
        <a href="/" className="hover:text-brown transition-colors">Home</a>
        <span>›</span>
        <a href="/products" className="hover:text-brown transition-colors">Rudraksha Beads</a>
        <span>›</span>
        <span className="text-dark font-semibold">4 Mukhi (Regular) Rudraksha</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square overflow-hidden">
            <Image src={galleryImages.main} alt="4 Mukhi Rudraksha" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-[330px_1fr] lg:grid-rows-2 lg:h-[576px]">
            <div className="order-1 relative overflow-hidden aspect-square lg:aspect-auto lg:row-span-2">
              <Image src={galleryImages.left} alt="4 Mukhi Rudraksha laid out" fill sizes="(max-width: 1024px) 50vw, 330px" className="object-cover" />
            </div>
            <div className="order-3 col-span-2 relative overflow-hidden aspect-[16/9] lg:order-2 lg:col-span-1 lg:aspect-auto">
              <Image src={galleryImages.topRight} alt="4 Mukhi Rudraksha worn" fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover" />
            </div>
            <div className="order-2 relative overflow-hidden aspect-square lg:order-3 lg:aspect-auto">
              <Image src={galleryImages.bottomRight} alt="4 Mukhi Rudraksha detail" fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-between flex-wrap gap-4 mt-3 pt-1">
            <div className="flex items-center gap-6 flex-wrap">
              <span className="flex items-center gap-2 font-lato text-sm text-gray-text">
                <ShieldCheck size={16} /> Authenticity Guaranteed
              </span>
              <span className="flex items-center gap-2 font-lato text-sm text-gray-text">
                <Lock size={16} /> 100% Secure Payment
              </span>
              <span className="flex items-center gap-2 font-lato text-sm text-gray-text">
                <Truck size={16} /> Delivers in 2-4 working days
              </span>
            </div>
            <a href="#" className="flex items-center gap-2 font-lato text-sm font-bold tracking-[0.5px] text-brown border-b border-brown pb-0.5">
              <Mail size={16} /> ASK MORE ABOUT PRODUCT
            </a>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <h1 className="font-prata text-3xl lg:text-[36px] leading-tight text-dark m-0">
            4 Mukhi (Regular) Rudraksha
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" stroke="none" />
              ))}
            </div>
            <span className="font-lato text-sm text-gray-text">5.0 (1.2k Reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="font-lato text-2xl font-bold text-dark">$160.00</span>
            <span className="font-lato text-base text-gray-text line-through">$170.00</span>
          </div>

          <div className="border-t border-[#E7DFD6]" />

          {/* Viewing count */}
          <div className="flex items-center gap-2 font-lato text-sm text-gray-text">
            <Eye size={16} /> 24 People are viewing this right now
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-2">
            <p className="font-lato text-sm text-dark m-0">
              Only <span className="text-brown font-semibold">3 items</span> left in stock
            </p>
            <div className="h-1 w-full bg-[#F0E4D8] rounded-full overflow-hidden">
              <div className="h-full bg-brown rounded-full" style={{ width: "85%" }} />
            </div>
          </div>

          {/* Design */}
          <div className="flex flex-col gap-3">
            <p className="font-lato text-sm text-dark m-0">
              Select Your Design:{" "}
              <span className="font-semibold">
                {designs[selectedDesign].label} ({designs[selectedDesign].price})
              </span>
            </p>
            <div className="flex items-center gap-3">
              {designs.map((d, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedDesign(i)}
                  aria-label={d.label}
                  className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-colors ${
                    selectedDesign === i ? "border-brown" : "border-transparent"
                  }`}
                >
                  <Image src={d.image} alt={d.label} fill sizes="48px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="flex flex-col gap-3">
            <p className="font-lato text-sm text-dark m-0">Select Size</p>
            <button className="flex items-center justify-between border border-[#E7DFD6] px-4 py-3 font-lato text-sm text-dark">
              &lt;18mm
              <ChevronDown size={16} />
            </button>
          </div>

          {/* Energization */}
          <div className="flex flex-col gap-3">
            <p className="font-lato text-sm text-dark m-0">Select Energization</p>
            <div className="flex flex-col gap-2.5">
              {energizationOptions.map((opt, i) => (
                <label
                  key={i}
                  className={`flex items-center justify-between gap-3 border px-4 py-3 cursor-pointer transition-colors ${
                    selectedEnergization === i ? "border-brown" : "border-[#E7DFD6]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                        selectedEnergization === i ? "border-brown" : "border-[#D6CFC4]"
                      }`}
                    >
                      {selectedEnergization === i && <span className="w-2 h-2 rounded-full bg-brown" />}
                    </span>
                    <span className="font-lato text-sm text-dark">
                      {opt.label}
                      {opt.extra && <span className="text-gray-text"> ({opt.extra})</span>}
                    </span>
                  </span>
                  <button type="button" onClick={() => setSelectedEnergization(i)} className="sr-only" aria-hidden="true" />
                  <Info
                    size={14}
                    className="text-gray-text shrink-0 cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedEnergization(i);
                    }}
                  />
                </label>
              ))}
            </div>
          </div>

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-[#E7DFD6]">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="p-3 text-dark" aria-label="Decrease quantity">
                <Minus size={14} />
              </button>
              <span className="font-lato text-sm text-dark w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="p-3 text-dark" aria-label="Increase quantity">
                <Plus size={14} />
              </button>
            </div>
            <button className="flex-1 bg-brown text-white font-lato text-sm font-bold tracking-[0.5px] py-3.5">
              ADD TO CART
            </button>
            <button className="border border-[#E7DFD6] p-3.5 shrink-0" aria-label="Add to wishlist">
              <Heart size={18} className="text-dark" />
            </button>
          </div>

          {/* Buy Now */}
          <button className="border border-brown text-brown font-lato text-sm font-bold tracking-[0.5px] py-3.5">
            BUY NOW
          </button>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="flex flex-col items-center text-center gap-2">
              <ShieldCheck size={20} className="text-dark" />
              <p className="font-lato text-xs text-gray-text m-0">
                Risk Free Shopping
                <br />
                30 Day Returns
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Award size={20} className="text-dark" />
              <p className="font-lato text-xs text-gray-text m-0">
                Lifetime Warranty
                <br />
                Complimentary Repairs
              </p>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <Truck size={20} className="text-dark" />
              <p className="font-lato text-xs text-gray-text m-0">
                Free Shipping
                <br />
                On Orders Over $200
              </p>
            </div>
          </div>

          <div className="border-t border-[#E7DFD6]" />

          {/* Accordions */}
          <div className="flex flex-col">
            {accordionSections.map((sec, i) => {
              const isOpen = openSection === i;
              return (
                <div key={i} className="border-b border-[#E7DFD6] py-4">
                  <button
                    onClick={() => setOpenSection(isOpen ? -1 : i)}
                    className="flex items-center justify-between w-full font-lato text-sm font-semibold text-dark tracking-[0.5px]"
                  >
                    {sec.title}
                    {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                  </button>
                  {isOpen && <p className="font-lato text-sm text-gray-text mt-3 mb-0 leading-relaxed">{sec.content}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
