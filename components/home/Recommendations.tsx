"use client";

import { useState } from "react";
import { useRecommendations } from "@/hooks/useRecommendations";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import Image from "next/image";

const PREVIEW_ITEMS = [
  {
    name: "DeskPro Workstations",
    category: "Workstations",
    image: "/images/hero/workstations.webp",
    href: "/products/workstations",
  },
  {
    name: "Fluid X Chairs",
    category: "Seating Solution",
    image: "/images/hero/chairs.webp",
    href: "/products/seating",
  },
  {
    name: "Convene Tables",
    category: "Tables",
    image: "/images/hero/tables.webp",
    href: "/products/tables",
  },
];

export function Recommendations() {
  const [enabled, setEnabled] = useState(false);
  const { data, isLoading, error } = useRecommendations(enabled);

  if (!enabled) {
    return (
      <section className="py-12 md:py-14 bg-neutral-50 border-y border-neutral-100">
        <div className="container-wide px-6 2xl:px-0">
          <div className="max-w-2xl mb-10">
            <h2 className="typ-h2 text-neutral-900 mb-4">
              Recommended for You
            </h2>
            <p className="text-lg text-neutral-700 leading-relaxed font-light mb-6">
              Get curated product suggestions based on your browsing behavior.
            </p>
            <button
              onClick={() => setEnabled(true)}
              className="inline-flex items-center border border-neutral-900 text-neutral-900 px-5 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-neutral-900 hover:text-white transition-colors"
            >
              Load Recommendations
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PREVIEW_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group block border border-neutral-200 bg-white hover:border-neutral-900 transition-all"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-100">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={1200}
                    height={900}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">
                    {item.category}
                  </p>
                  <h3 className="font-serif text-2xl leading-[1] text-neutral-900">
                    {item.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <div className="py-14 flex justify-center items-center h-48 bg-neutral-50 border-y border-neutral-100">
        <Loader2 className="w-8 h-8 text-neutral-300 animate-spin" />
      </div>
    );
  }

  if (error || !data || !data.recommendations?.length) {
    return null;
  }

  return (
    <section className="py-14 md:py-16 bg-neutral-50 border-y border-neutral-100">
      <div className="container-wide px-6 2xl:px-0">
        <div className="max-w-xl mb-12">
          <h2 className="typ-h2 text-neutral-900 mb-4">
            Recommended for You
          </h2>
          <p className="text-lg text-neutral-700 leading-relaxed font-light">
            Based on your browsing history and our workspace engineering
            insights.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.recommendations.map(
            (
              rec: {
                productId: string;
                category?: string;
                productName: string;
                why: string;
                budgetEstimate?: string;
              },
              idx: number,
            ) => {
              const [cat, id] = rec.productId.split("--");
              // Assuming fallback path if parsing slug fails
              const productHref =
                cat && id ? `/products/${cat}/${id}` : `/products`;

              return (
                <Link
                  key={idx}
                  href={productHref}
                  className="group flex flex-col bg-white p-6 border border-neutral-200 hover:border-neutral-900 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full"
                >
                  <div className="mb-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                      {rec.category || "General"}
                    </span>
                    <h3 className="text-lg font-medium text-neutral-900 mt-2 mb-3">
                      {rec.productName}
                    </h3>
                    <p className="text-xs text-neutral-500 leading-relaxed truncate">
                      {rec.why}
                    </p>
                  </div>
                  <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="font-medium text-neutral-900">
                      {rec.budgetEstimate || "Consult for pricing"}
                    </span>
                    <span className="text-neutral-400 group-hover:text-neutral-900 transition-colors font-medium">
                      Explore &rarr;
                    </span>
                  </div>
                </Link>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
