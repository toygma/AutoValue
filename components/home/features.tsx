"use client"
import { Shield, Star, TrendingUp } from "lucide-react";

const Features = () => {
  return (
    <div>
      {/* Features */}
      <section className="bg-linear-to-br from-blue-600 to-blue-800 py-16">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Neden AutoValue?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/20">
              <Shield className="w-12 h-12 mb-4" />
              <h4 className="text-xl font-bold mb-3">Güvenli Alışveriş</h4>
              <p className="text-blue-100">
                Tüm ilanlar doğrulanır ve güvenlik kontrolünden geçer.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/20">
              <Star className="w-12 h-12 mb-4" />
              <h4 className="text-xl font-bold mb-3">
                Gerçek Değerlendirmeler
              </h4>
              <p className="text-blue-100">
                Kullanıcı deneyimlerine dayalı dürüst değerlendirmeler.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-white border border-white/20">
              <TrendingUp className="w-12 h-12 mb-4" />
              <h4 className="text-xl font-bold mb-3">Piyasa Analizi</h4>
              <p className="text-blue-100">
                Güncel piyasa fiyatları ve trend analizleri.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
