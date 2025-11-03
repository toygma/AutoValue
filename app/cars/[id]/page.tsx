"use client";

import Image from "next/image";
import { MapPin, Gauge, Fuel, Cog, Calendar, ArrowLeft, Phone, Mail, User } from "lucide-react";
import Link from "next/link";
import Reviews from "./_components/reviews";

interface CarDetailsProps {
  params: { id: string };
}

// Simülasyon verisi (API veya server component’ten alınabilir)
const car = {
  id: "bmw-320i",
  brand: "BMW",
  model: "320i M Sport",
  year: 2022,
  fuel: "Benzin",
  transmission: "Otomatik",
  km: 45000,
  color: "Beyaz",
  engineSize: 1998,
  horsePower: 184,
  price: 1850000,
  city: "İstanbul",
  district: "Kadıköy",
  title: "BMW 320i M Sport Paket, Hatasız Boyasız",
  description:
    "Aracım tamamen orijinaldir. Yetkili servis bakımlı, değişen boya yoktur. İç ve dış kondisyonu çok iyi durumdadır. Takas ve krediye uygundur.",
  images: [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop",
  ],
  contact: {
    name: "Ahmet Yılmaz",
    phone: "0555 555 55 55",
    email: "ahmet@example.com",
  },
};

export default function CarDetailPage({ params }: CarDetailsProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-10">
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Geri Dön
        </Link>

        {/* Başlık ve Fiyat */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {car.brand} {car.model}
            </h1>
            <p className="text-slate-600">{car.year} • {car.city}, {car.district}</p>
          </div>
          <div className="mt-3 md:mt-0 text-3xl font-semibold text-blue-700">
            {car.price.toLocaleString("tr-TR")} ₺
          </div>
        </div>

        {/* Görseller */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {car.images.map((img, idx) => (
            <div key={idx} className="relative overflow-hidden rounded-xl shadow-sm group">
              <Image
                src={img}
                alt={`${car.brand} ${car.model} image ${idx + 1}`}
                width={800}
                height={600}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Özellikler */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol: Özellik kutusu */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">
              Araç Özellikleri
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-slate-700">
              <Feature icon={<Calendar className="w-5 h-5 text-blue-600" />} label="Yıl" value={car.year} />
              <Feature icon={<Gauge className="w-5 h-5 text-blue-600" />} label="Kilometre" value={`${car.km.toLocaleString()} km`} />
              <Feature icon={<Fuel className="w-5 h-5 text-blue-600" />} label="Yakıt" value={car.fuel} />
              <Feature icon={<Cog className="w-5 h-5 text-blue-600" />} label="Vites" value={car.transmission} />
              <Feature icon={<MapPin className="w-5 h-5 text-blue-600" />} label="Konum" value={`${car.city}, ${car.district}`} />
              <Feature icon={<User className="w-5 h-5 text-blue-600" />} label="Renk" value={car.color} />
              <Feature icon={<Cog className="w-5 h-5 text-blue-600" />} label="Motor" value={`${car.engineSize} cc`} />
              <Feature icon={<Gauge className="w-5 h-5 text-blue-600" />} label="Beygir" value={`${car.horsePower} HP`} />
            </div>

            {/* Açıklama */}
            <div className="mt-10">
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Açıklama</h3>
              <p className="text-slate-700 leading-relaxed">{car.description}</p>
            </div>
          </div>

          {/* Sağ: İletişim Kartı */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 h-fit">
            <h3 className="text-xl font-bold text-slate-800 mb-4">İletişim</h3>
            <div className="space-y-3">
              <ContactItem icon={<User className="w-4 h-4 text-blue-600" />} text={car.contact.name} />
              <ContactItem icon={<Phone className="w-4 h-4 text-blue-600" />} text={car.contact.phone} />
              <ContactItem icon={<Mail className="w-4 h-4 text-blue-600" />} text={car.contact.email} />
            </div>

            <button className="w-full mt-6 px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg hover:scale-[1.02] transition font-medium">
              Satıcıyla İletişime Geç
            </button>
          </div>
        </div>
      </div>
      <Reviews />
    </div>
  );
}

/* 🔹 Küçük yardımcı bileşenler */
interface FeatureProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const Feature = ({ icon, label, value }: FeatureProps) => (
  <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
    <div>{icon}</div>
    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="font-medium text-slate-800">{value}</p>
    </div>
  </div>
);

interface ContactItemProps {
  icon: React.ReactNode;
  text: string;
}

const ContactItem = ({ icon, text }: ContactItemProps) => (
  <div className="flex items-center gap-3">
    {icon}
    <span className="text-slate-700">{text}</span>
  </div>
);
