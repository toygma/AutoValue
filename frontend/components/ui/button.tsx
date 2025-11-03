"use client";

import { ButtonHTMLAttributes } from "react";

interface ListingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}
const ListingButton: React.FC<ListingButtonProps> = ({ label, ...props }) => {
  return (
    <button
     {...props}
      className={
        "hidden md:inline-flex items-center justify-center px-6 py-2.5 rounded-lg font-medium text-white bg-linear-to-r from-blue-600 to-blue-700 shadow-sm hover:shadow-lg transition-all duration-200"
      }
    >
      {label}
    </button>
  );
};

export default ListingButton;
