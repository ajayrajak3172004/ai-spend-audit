"use client";

import Link from "next/link";
import { RiSparklingFill, RiShieldCheckLine, RiBarChartBoxLine, RiMoneyDollarCircleLine,
   RiLineChartLine, RiFlashlightLine, 
  RiStackLine, RiArrowRightLine 
} from "react-icons/ri";

import Footer from "./Footer";

// Floating Icon Component for reuse
const FloatingIcon = ({ src, className, delay = "0s" }) => (
  <div className={`absolute hidden xl:block z-0 animate-float pointer-events-none ${className}`} style={{ animationDelay: delay }}>
    <div className="p-3 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-2xl shadow-xl">
      <img src={src} alt="AI Tool" className="w-12 h-12 object-contain rounded-lg" />
    </div>
  </div>
);

export default function Hero() {
  return (
    <div className="bg-white selection:bg-purple-100">
      {/* --- HERO SECTION --- */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 overflow-hidden">
        
        {/* --- FLOATING AI ICONS --- */}
        {/* Left Side Icons */}
        <FloatingIcon src="/images/ChatGPT.jpg" className="top-[15%] left-[5%]" delay="0s" />
        <FloatingIcon src="/images/claude.png" className="top-[45%] left-[8%]" delay="1s" />
        <FloatingIcon src="/images/gemini.webp" className="bottom-[20%] left-[6%]" delay="2s" />
        
        {/* Right Side Icons */}
        <FloatingIcon src="/images/githubCopilot.jpeg" className="top-[18%] right-[5%]" delay="0.5s" />
        <FloatingIcon src="/images/cursor.png" className="top-[48%] right-[8%]" delay="1.5s" />
        <FloatingIcon src="/images/windsurf.png" className="bottom-[25%] right-[7%]" delay="2.5s" />
        <FloatingIcon src="/images/anthropic.png" className="top-[70%] right-[3%]" delay="0.8s" />

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-indigo-200/30 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-600"></span>
              </span>
              New: Automated Stack Detection 2.0
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.9]">
              AI Spending <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600">
                Under Control.
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 leading-relaxed mb-10">
              Stop paying for 5 different LLMs. We audit your AI subscriptions and 
              save your team an average of 30% monthly.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/audit" className="group px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-2">
                Start Free Audit
                <RiArrowRightLine className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <a href="#features" className="px-8 py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                See How It Works
              </a>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative max-w-5xl mx-auto mt-20 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-[32px] blur opacity-20 group-hover:opacity-30 transition"></div>
            <div className="relative bg-white border border-slate-200 rounded-[28px] shadow-2xl overflow-hidden grid md:grid-cols-3">
              <div className="p-8 md:col-span-2 border-r border-slate-50">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="font-bold text-xl text-slate-900">Savings Overview</h3>
                  <RiSparklingFill className="text-purple-500 text-2xl" />
                </div>
                <div className="h-64 bg-slate-50 rounded-2xl flex items-end justify-between p-6 gap-2">
                  {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="w-full bg-gradient-to-t from-purple-500 to-indigo-400 rounded-t-lg transition-all hover:scale-105" />
                  ))}
                </div>
              </div>
              <div className="bg-slate-50/50 p-8 flex flex-col justify-center">
                <p className="text-slate-500 font-medium">Monthly Waste Detected</p>
                <h4 className="text-5xl font-black text-red-500 mt-2">$2,450</h4>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">AI</div>
                    <p className="text-sm font-semibold">Duplicate Copilot Seats</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- LOGO CLOUD --- */}
      <section className="py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-8">Trusted by teams at</p>
          <div className="flex flex-wrap justify-center gap-12 grayscale opacity-50">
            <span className="text-2xl font-bold italic">STRIPE</span>
            <span className="text-2xl font-bold">Vercel</span>
            <span className="text-2xl font-bold tracking-tighter">LINEAR</span>
            <span className="text-2xl font-bold">Raycast</span>
          </div>
        </div>
      </section>

      {/* --- FEATURES --- */}
      <section id="features" className="py-32 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">Everything you need to optimize</h2>
          <p className="text-slate-500 text-lg mb-16">Data-driven insights to manage your AI stack professionally.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <RiLineChartLine />, title: "Usage Tracking", desc: "See who's actually using the AI tools you're paying for." },
              { icon: <RiStackLine />, title: "Overlap Detection", desc: "Identify tools that do the same thing and cut the noise." },
              { icon: <RiShieldCheckLine />, title: "Enterprise Security", desc: "Bank-grade encryption for all your financial data." }
            ].map((feature, idx) => (
              <div key={idx} className="p-10 bg-white border border-slate-200 rounded-[32px] text-left hover:shadow-xl transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      

     

      <Footer />
    </div>
  );
}