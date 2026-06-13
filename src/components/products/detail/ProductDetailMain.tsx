"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Eye, Heart, ShieldCheck, Lock, Award, Truck, Mail, ChevronDown, Plus, Minus } from "lucide-react";
import { useCurrency } from "@/components/CurrencyProvider";
import { useCart } from "@/components/CartProvider";
import { getMainImage } from "@/lib/product-utils";
import type { getProductBySlug } from "@/lib/products";

type Product = NonNullable<Awaited<ReturnType<typeof getProductBySlug>>>;

export default function ProductDetailMain({ product }: { product: Product }) {
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedAddOn, setSelectedAddOn] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState(0);

  const images = product.images;
  const mainImage = getMainImage(images);
  const leftImage = images.find((i) => i.role === "GALLERY_LEFT") ?? mainImage;
  const topRightImage = images.find((i) => i.role === "GALLERY_TOP_RIGHT") ?? mainImage;
  const bottomRightImage = images.find((i) => i.role === "GALLERY_BOTTOM_RIGHT") ?? mainImage;

  const variantDelta = product.variants[selectedVariant]?.priceDeltaCents ?? 0;
  const displayPriceCents = product.priceCents + variantDelta;
  const displayCompareAtCents = product.compareAtPriceCents != null ? product.compareAtPriceCents + variantDelta : null;

  const stockBarWidth = Math.min(100, (product.stockCount / 10) * 100);

  const handleAddToCart = () => {
    const variant = product.variants[selectedVariant];
    const addOn = product.addOns[selectedAddOn];
    const size = product.sizes[selectedSize];
    const addOnDelta = addOn?.priceDeltaCents ?? 0;

    addItem(
      {
        id: [product.id, variant?.id, addOn?.id, size?.id].filter(Boolean).join("::"),
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: variant?.image ?? mainImage?.url ?? "",
        unitPriceCents: displayPriceCents + addOnDelta,
        variantId: variant?.id,
        variantLabel: variant?.label,
        sizeId: size?.id,
        sizeLabel: size?.label,
        addOnId: addOn?.id,
        addOnLabel: addOn?.label,
      },
      quantity
    );
  };

  const accordionSections = [
    { title: "DESCRIPTION", content: product.description },
    { title: "SHIPPING", content: product.shippingInfo },
    { title: "PACKAGING", content: product.packagingInfo },
    { title: "RETURNS & CANCELLATIONS", content: product.returnsInfo },
  ];

  return (
    <section className="h-px-section py-8 lg:py-10" style={{ background: "#FEF9F2" }}>
      {/* Breadcrumb */}
      <div className="font-lato text-xs tracking-[0.5px] uppercase text-gray-text mb-6 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-brown transition-colors">Home</Link>
        <span>›</span>
        <Link href={`/products/category/${product.category.slug}`} className="hover:text-brown transition-colors">
          {product.category.name}
        </Link>
        <span>›</span>
        <span className="text-dark font-semibold">{product.breadcrumbLabel}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square overflow-hidden">
            {mainImage && (
              <Image src={mainImage.url} alt={mainImage.alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-[330px_1fr] lg:grid-rows-2 lg:h-[576px]">
            <div className="order-1 relative overflow-hidden aspect-square lg:aspect-auto lg:row-span-2">
              {leftImage && <Image src={leftImage.url} alt={leftImage.alt} fill sizes="(max-width: 1024px) 50vw, 330px" className="object-cover" />}
            </div>
            <div className="order-3 col-span-2 relative overflow-hidden aspect-[16/9] lg:order-2 lg:col-span-1 lg:aspect-auto">
              {topRightImage && <Image src={topRightImage.url} alt={topRightImage.alt} fill sizes="(max-width: 1024px) 100vw, 25vw" className="object-cover" />}
            </div>
            <div className="order-2 relative overflow-hidden aspect-square lg:order-3 lg:aspect-auto">
              {bottomRightImage && <Image src={bottomRightImage.url} alt={bottomRightImage.alt} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-cover" />}
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
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.round(product.ratingAvg) ? "currentColor" : "none"} stroke="currentColor" />
              ))}
            </div>
            <span className="font-lato text-sm text-gray-text">
              {product.ratingAvg.toFixed(1)} ({product.ratingCount >= 1000 ? `${(product.ratingCount / 1000).toFixed(1)}k` : product.ratingCount} Reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <span className="font-lato text-2xl font-bold text-dark">{formatPrice(displayPriceCents)}</span>
            {displayCompareAtCents != null && (
              <span className="font-lato text-base text-gray-text line-through">{formatPrice(displayCompareAtCents)}</span>
            )}
          </div>

          <div className="border-t border-[#E7DFD6]" />

          {/* Viewing count */}
          <div className="flex items-center gap-2 font-lato text-sm text-gray-text">
            <Eye size={16} /> 24 People are viewing this right now
          </div>

          {/* Stock */}
          {product.stockCount <= 10 && (
            <div className="flex flex-col gap-2">
              <p className="font-lato text-sm text-dark m-0">
                Only <span className="text-brown font-semibold">{product.stockCount} items</span> left in stock
              </p>
              <div className="h-1 w-full bg-[#F0E4D8] rounded-full overflow-hidden">
                <div className="h-full bg-brown rounded-full" style={{ width: `${stockBarWidth}%` }} />
              </div>
            </div>
          )}

          {/* Design */}
          {product.variants.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="font-lato text-sm text-dark m-0">
                Select Your Design:{" "}
                <span className="font-semibold">
                  {product.variants[selectedVariant].label} ({product.variants[selectedVariant].priceDeltaCents === 0 ? formatPrice(0) : `+${formatPrice(product.variants[selectedVariant].priceDeltaCents)}`})
                </span>
              </p>
              <div className="flex items-center gap-3">
                {product.variants.map((v, i) => (
                  <button
                    key={v.id}
                    onClick={() => setSelectedVariant(i)}
                    aria-label={v.label}
                    className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-colors ${
                      selectedVariant === i ? "border-brown" : "border-transparent"
                    }`}
                  >
                    <Image src={v.image} alt={v.label} fill sizes="48px" className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {product.sizes.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="font-lato text-sm text-dark m-0">Select Size</p>
              <div className="relative">
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(Number(e.target.value))}
                  className="appearance-none w-full flex items-center justify-between border border-[#E7DFD6] px-4 py-3 font-lato text-sm text-dark bg-transparent"
                >
                  {product.sizes.map((s, i) => (
                    <option key={s.id} value={i}>{s.label}</option>
                  ))}
                </select>
                <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Energization */}
          {product.addOns.length > 0 && (
            <div className="flex flex-col gap-3">
              <p className="font-lato text-sm text-dark m-0">Select Energization</p>
              <div className="flex flex-col gap-2.5">
                {product.addOns.map((opt, i) => (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between gap-3 border px-4 py-3 cursor-pointer transition-colors ${
                      selectedAddOn === i ? "border-brown" : "border-[#E7DFD6]"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          selectedAddOn === i ? "border-brown" : "border-[#D6CFC4]"
                        }`}
                      >
                        {selectedAddOn === i && <span className="w-2 h-2 rounded-full bg-brown" />}
                      </span>
                      <span className="font-lato text-sm text-dark">
                        {opt.label}
                        {opt.priceDeltaCents > 0 && <span className="text-gray-text"> (+{formatPrice(opt.priceDeltaCents)})</span>}
                      </span>
                    </span>
                    <button type="button" onClick={() => setSelectedAddOn(i)} className="sr-only" aria-hidden="true" />
                  </label>
                ))}
              </div>
            </div>
          )}

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
            <button onClick={handleAddToCart} className="flex-1 bg-brown text-white font-lato text-sm font-bold tracking-[0.5px] py-3.5">
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
                <div key={sec.title} className="border-b border-[#E7DFD6] py-4">
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
