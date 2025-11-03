import { Car } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="w-6 h-6" />
              <span className="text-xl font-bold">AutoValue</span>
            </div>
            <p className="text-slate-400">
              Türkiye&#39;nin en güvenilir araç değerlendirme platformu.
            </p>
          </div>
          <div>
            <h5 className="font-bold mb-4">Hızlı Linkler</h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  İlanlar
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Hakkımızda
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">Destek</h5>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Yardım Merkezi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  İletişim
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  SSS
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4">İletişim</h5>
            <ul className="space-y-2 text-slate-400">
              <li>info@autovalue.com</li>
              <li>+90 (212) 555 0123</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>&copy; 2024 AutoValue. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
