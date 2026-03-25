"use client";

import { useEffect, useState } from "react";
import PropertySearchForm from "./PropertySearchForm";

const Hero = () => {
  const subtitle =
    "Discover verified homes, flats, and land in Gaya district and neighboring areas.";
  const [typedSubtitle, setTypedSubtitle] = useState("");

  useEffect(() => {
    let index = 0;

    const typeInterval = setInterval(() => {
      index += 1;
      setTypedSubtitle(subtitle.slice(0, index));

      if (index >= subtitle.length) {
        clearInterval(typeInterval);
      }
    }, 30);

    return () => clearInterval(typeInterval);
  }, [subtitle]);

  return (
    <section className="bg-blue-700 py-20 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="hero-zoom-word hero-zoom-word-rent">Rent</span>,{" "}
            <span className="hero-zoom-word hero-zoom-word-buy">Buy</span>, or{" "}
            <span className="hero-zoom-word hero-zoom-word-sell">Sell</span>{" "}
            Property in Gaya and Beyond.
          </h1>
          <p className="my-4 text-xl text-white">
            {typedSubtitle}
          </p>
        </div>
      </div>
      <PropertySearchForm />
    </section>
  );
};

export default Hero;
