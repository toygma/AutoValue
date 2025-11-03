"use client";
import { useState } from "react";
import { categories } from "./_components/data";
const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <section className="container mx-auto px-4 mb-16">
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition whitespace-nowrap ${
              selectedCategory === cat.id
                ? "bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-lg"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            <cat.icon className="w-5 h-5" />
            {cat.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
