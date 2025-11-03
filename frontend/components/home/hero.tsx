import { Search } from "lucide-react";
import React from "react";
import { stats } from "./_components/data";

const Hero = () => {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center max-w-4xl mx-auto mb-12">
        <h2 className="text-5xl md:text-6xl font-bold text-slate-800 mb-6 leading-tight">
          Hayalinizdeki Aracı
          <span className="block bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Güvenle Bulun
          </span>
        </h2>
        <p className="text-xl text-slate-600 mb-8">
          Binlerce araç ilanı arasından size en uygun olanı bulun. Gerçek
          kullanıcı değerlendirmeleriyle doğru kararı verin.
        </p>

        {/* Search Bar */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option>Marka Seçin</option>
              <option>BMW</option>
              <option>Mercedes</option>
              <option>Audi</option>
              <option>Volkswagen</option>
            </select>
            <select className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option>Model Seçin</option>
            </select>
            <select className="px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option>Yıl</option>
              <option>2023</option>
              <option>2022</option>
              <option>2021</option>
            </select>
            <button className="px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:scale-105 transition font-medium flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Ara
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 text-center shadow-lg border border-slate-200 hover:shadow-xl transition"
          >
            <stat.icon className="w-8 h-8 mx-auto mb-3 text-blue-600" />
            <div className="text-3xl font-bold text-slate-800 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
