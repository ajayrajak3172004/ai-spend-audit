"use client";

import { NumericValueFormate } from "@/lib/NumericValueFormate";
import Image from "next/image";

export default function SavingsBreakdownCard({auditData, totalSavings,}) {

   const data = Array.isArray(auditData) ? auditData : [];

  //  console.log(data)

  return (

    <div className="bg-white border border-slate-100 max-w-7xl mx-auto mt-8 rounded-[30px] shadow-lg p-4 md:p-8 overflow-hidden">

      {/* HEADER */}

      <div className="flex items-center gap-3 mb-8">

        <div className="w-12 h-12 rounded-2xl bg-purple-100 flex justify-center items-center">

          <span className="text-purple-600 font-bold text-lg">
            $
          </span>

        </div>

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Savings Breakdown
          </h2>

          <p className="text-slate-500 text-sm">
            Optimized recommendations for your AI stack
          </p>

        </div>

      </div>

      {/* DESKTOP HEADER */}

      <div className="hidden lg:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 rounded-2xl text-sm font-semibold text-slate-500 mb-3">

        <div className="col-span-3">
          AI Tool
        </div>

        <div className="col-span-2">
          Current Plan
        </div>

        <div className="col-span-2">
          Your Spend
        </div>

        <div className="col-span-2">
          Recommended
        </div>

        <div className="col-span-2">
          Optimized
        </div>

        <div className="col-span-1 text-right">
          Savings
        </div>

      </div>

      {/* ROWS */}

      <div className="space-y-4">

        {data.map((item, index) => (

          <div key={index} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-5 items-center 
               border border-slate-100 rounded-3xl px-4 md:px-6 py-5 hover:border-purple-200 hover:shadow-md transition-all">

            {/* TOOL */}

            <div className="lg:col-span-3 flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex justify-center items-center overflow-hidden">

                <Image
                  src={item.icon}
                  alt={item.tool}
                  width={34}
                  height={34}
                />

              </div>

              <div>

                <h3 className="font-semibold text-slate-900">
                  {item.tool}
                </h3>

                <p className="text-sm text-slate-500">
                  AI Subscription
                </p>

              </div>

            </div>

            {/* CURRENT PLAN */}

            <div className="lg:col-span-2">

              <p className="font-semibold text-slate-800">
                {item.currentPlan}
               
                <span className=" ml-2 text-sm text-slate-400">
                {'('} {item.seats} seats {')'}
              </span>
              
              </p>

              

            </div>

            {/* YOUR SPEND */}

            <div className="lg:col-span-2">

              <h3 className="font-bold text-slate-900 text-lg">
                { NumericValueFormate(Number(item.currentSpend).toFixed(0)) }
              </h3>

              <p className="text-sm text-slate-400">
                Current monthly spend
              </p>

            </div>

            {/* RECOMMENDED */}

            <div className="lg:col-span-2">

              <div className="inline-flex items-center bg-purple-50 text-purple-700 px-4 py-2 rounded-xl text-sm font-semibold">

                {item.recommendedPlan}

              </div>

              

            </div>

            {/* OPTIMIZED */}

            <div className="lg:col-span-2">

              <h3 className="font-bold text-slate-900 text-lg">
                {NumericValueFormate(item.optimizedCost) }
              </h3>

              <p className="text-sm text-slate-400">
                Optimized spend
              </p>

            </div>

            {/* SAVINGS */}

            <div className="lg:col-span-1 flex lg:justify-end">

              <div className="bg-green-50 text-green-600 px-4 py-2 rounded-xl font-bold text-sm">

                +{NumericValueFormate(item.savings) }

              </div>

            </div>

            {/* REASON */}

            <div className="lg:col-span-12 hidden lg:block bg-slate-50 rounded-2xl px-4 py-3">

              <p className="text-sm text-slate-600 leading-relaxed">

                {item.reason}

              </p>

            </div>

          </div>

        ))}

      </div>

      {/* TOTAL */}

      <div className="mt-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-3xl px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-5">

        <div>

          <h2 className="text-2xl font-bold text-green-700">
            Total Monthly Savings
          </h2>

          <p className="text-green-600 text-sm mt-1">
            Estimated optimized savings from all recommendations
          </p>

        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-green-600">

          ${totalSavings}

        </h1>

      </div>

    </div>
  );
}