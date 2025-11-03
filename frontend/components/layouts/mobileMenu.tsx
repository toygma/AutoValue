"use client";
import { menuData } from "./_components/menu-data";
import Link from "next/link";

const MobileMenu = () => {
  return (
    <div className="flex flex-col gap-4">
      {menuData.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-slate-700 hover:text-blue-600 font-medium transition"
        >
          {item.name}
        </Link>
      ))}
      <button className="px-6 py-2.5 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium">
        İlan Ver
      </button>
    </div>
  );
};

export default MobileMenu;
