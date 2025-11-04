export interface CarBasicInfo {
  brand: string;
  model: string;
  year: string;
  fuel: string;
  transmission: string;
  km: string;
  color?: string;
  engineSize?: string;
  horsePower?: string;
}

export interface CarImages {
  images: File[];
}

export interface CarPriceLocation {
  price: string;
  city: string;
  district: string;
  title: string;
  description?: string;
}

export interface CarContact {
  name: string;
  phone: string;
  email?: string;
}

export type CarListingFormData = CarBasicInfo & 
  CarImages & 
  CarPriceLocation & 
  CarContact;

export interface StepProps {
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}
export interface FilterData {
  brands: string[];
  modelsByBrand: Record<string, string[]>;
  years: number[];
}
