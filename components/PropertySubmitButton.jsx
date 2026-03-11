"use client";

import { useFormStatus } from "react-dom";

const PropertySubmitButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className="flex w-full items-center justify-center gap-2 rounded-full bg-blue-500 px-4 py-2 font-bold text-white focus:outline-none focus:shadow-outline hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
      type="submit"
      disabled={pending}
      aria-disabled={pending}
    >
      {pending && (
        <span className="inline-block text-lg leading-none animate-pulse">+</span>
      )}
      <span>{pending ? "Adding Property..." : "Add Property"}</span>
    </button>
  );
};

export default PropertySubmitButton;
