import PropertySearchForm from "./PropertySearchForm";
const Hero = () => {
  return (
    <section className="bg-blue-700 py-20 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Rent, Buy, or Sell Property in Gaya & Bihar
          </h1>
          <p className="my-4 text-xl text-white">
            Discover verified homes, flats, and land in Gaya district,
            neighboring cities, across Bihar, and India.
          </p>
        </div>
      </div>
      <PropertySearchForm />
    </section>
  );
};

export default Hero;
