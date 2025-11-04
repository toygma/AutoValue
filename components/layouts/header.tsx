"use client";
import { useState } from "react";
import { Car, Menu, X } from "lucide-react";
import Link from "next/link";
import { menuData } from "./_components/menu-data";
import MobileMenu from "./mobileMenu";
import ListingButton from "../ui/button";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className="">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-br from-blue-600 to-blue-700 p-2 rounded-xl">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  AutoValue
                </h1>
                <p className="text-xs text-slate-600">Araç Değerlendirme</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {menuData.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-slate-700 hover:text-blue-600 font-medium transition"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              {session?.user ? (
                <>
                  {" "}
                  <Link href={"/create"}>
                    <ListingButton variant="success" label="İlan Ver" />
                  </Link>
                  <ListingButton variant="red" label="Çıkış Yap" onClick={() => signOut()} />
                </>
              ) : (
                <Link href={"/login"}>
                  <ListingButton variant="success" label="Giriş Yap" />
                </Link>
              )}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pt-4 border-t border-slate-200 flex flex-col gap-3">
              <MobileMenu />
            </nav>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;
