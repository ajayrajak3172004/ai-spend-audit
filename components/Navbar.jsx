"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RiSparklingFill, RiArrowRightLine } from "react-icons/ri";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center px-6 pointer-events-none">
      <nav className={`
        pointer-events-auto
        flex items-center justify-between
        w-full max-w-4xl 
        px-6 py-3 
        rounded-full 
        transition-all duration-500 ease-in-out
        ${isScrolled 
          ? "bg-white/70 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] py-2" 
          : "bg-gray-100 border border-transparent"
        }
      `}>
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center transition-transform group-hover:rotate-12">
            <RiSparklingFill className="text-white text-sm" />
          </div>
          <span className="text-lg font-black tracking-tighter text-slate-900">
            AuditAI
          </span>
        </Link>

        {/* Get started link button */}
        <Link 
          href="/audit" 
          className="group flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold hover:bg-purple-600 transition-all shadow-lg shadow-slate-200"
        >
          Get Started
          <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
        </Link>

      </nav>
    </div>
  );
}