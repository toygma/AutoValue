import { Car, Star, TrendingUp, Users } from "lucide-react";

export const featuredCars = [
    {
      id: 1,
      brand: 'BMW',
      model: '320i',
      year: 2022,
      price: '1,850,000',
      rating: 4.8,
      reviews: 124,
      image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop',
      fuel: 'Benzin',
      km: '45,000',
      transmission: 'Otomatik'
    },
    {
      id: 2,
      brand: 'Mercedes',
      model: 'C200',
      year: 2023,
      price: '2,150,000',
      rating: 4.9,
      reviews: 89,
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop',
      fuel: 'Dizel',
      km: '28,000',
      transmission: 'Otomatik'
    },
    {
      id: 3,
      brand: 'Audi',
      model: 'A4',
      year: 2021,
      price: '1,650,000',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop',
      fuel: 'Benzin',
      km: '62,000',
      transmission: 'Otomatik'
    }
  ];

  export const categories = [
    { id: 'all', name: 'Tümü', icon: Car },
    { id: 'sedan', name: 'Sedan', icon: Car },
    { id: 'suv', name: 'SUV', icon: Car },
    { id: 'hatchback', name: 'Hatchback', icon: Car }
  ];

  export const stats = [
    { label: 'Aktif İlan', value: '15,234', icon: Car },
    { label: 'Değerlendirme', value: '48,567', icon: Star },
    { label: 'Mutlu Kullanıcı', value: '12,456', icon: Users },
    { label: 'Günlük Ziyaret', value: '25,789', icon: TrendingUp }
  ];
