"use client";

import React from 'react';
import Link from 'next/link';
import { 
  RiTwitterXLine, 
  RiGithubLine, 
  RiLinkedinBoxLine, 
  RiSparklingFill 
} from 'react-icons/ri';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white py-12 border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center justify-center text-center">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 mb-6 group">
            <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center transition-transform group-hover:rotate-12 shadow-md">
              <RiSparklingFill className="text-white text-sm" />
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-900">
              AuditAI
            </span>
          </Link>

          {/* Tagline */}
          <p className="text-slate-400 text-sm max-w-xs mb-8 leading-relaxed">
            Optimizing AI infrastructure for high-growth teams and modern startups.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-8 mb-8">
            <Link href="#" className="text-slate-300 hover:text-slate-900 transition-colors text-xl">
              <RiTwitterXLine />
            </Link>
            <Link href="#" className="text-slate-300 hover:text-slate-900 transition-colors text-xl">
              <RiGithubLine />
            </Link>
            <Link href="#" className="text-slate-300 hover:text-slate-900 transition-colors text-xl">
              <RiLinkedinBoxLine />
            </Link>
          </div>

          {/* Bottom Line */}
          <div className="flex flex-col md:flex-row items-center gap-4 text-[12px] font-medium uppercase tracking-widest text-slate-400">
            <span>© {currentYear} AuditAI Inc.</span>
            <span className="hidden md:block text-slate-200">•</span>
            <Link href="#" className="hover:text-slate-900 transition-colors">Privacy</Link>
            <span className="hidden md:block text-slate-200">•</span>
            <Link href="#" className="hover:text-slate-900 transition-colors">Terms</Link>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;