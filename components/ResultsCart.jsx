"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiLightbulbFlashLine, RiShieldCheckLine, RiSparklingFill, RiStackLine, RiUser3Line } from "react-icons/ri";
import { FaRegCopy, FaShareAlt } from "react-icons/fa";
import { MdCalendarMonth, MdOutlineEnergySavingsLeaf, MdOutlineAutoGraph} from "react-icons/md";

import { GiProgression } from "react-icons/gi";
import { BsStars } from "react-icons/bs";
import { IoCheckmarkDoneSharp } from "react-icons/io5";


import SavingsBreakdownCard from "./SavingsBreakdownCart";
import { supabase } from "@/lib/supabase";
import { NumericValueFormate } from "@/lib/NumericValueFormate";

import { useRef } from "react";
import html2canvas from "html2canvas-pro";

import jsPDF from "jspdf";
import Footer from "./Footer";
import { toast } from "react-toastify";
import { SpendComparisonChart } from "./SpendComparisonChart";
import { formatDateTime } from "@/lib/formateTime";


export default function ResultsCard({ auditId }) {

  const pdfRef = useRef();


  // 1. State for handlelin toogle for expand recommendation
  const [isExpanded, setIsExpanded] = useState(false);

  const [auditData, setAuditData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAudit = async () => {
      if (!auditId) return;
      setLoading(true);

      try {
        const { data, error } = await supabase
          .from("audits")
          .select("*")
          .eq("audit_id", auditId)
          .maybeSingle(); 

        if (error) {
          console.error("Supabase error:", error);
          setAuditData(null);
        } else if (!data) {
          console.warn("No audit found with this ID");
          setAuditData(null);
        } else {
          
          //sotring all the data in the single state
          setAuditData({
            current_spend: data.current_spend || 0,
            optimized_spend: data.optimized_spend || 0,
            total_savings: data.total_savings || 0,
            annual_savings: data.annual_savings || 0,
            credex_savings: data.credex_savings || 0,
            audit_results: data.audit_results || [],
            ai_summary: data.ai_summary || "No summary provided.",
            audit_id: data.audit_id,
            team_size: data.team_size,
            use_case: data.use_case,
            created_at: data.created_at,
          });
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setAuditData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAudit();
  }, [auditId]);




  //Copy shareable link
  const [shareUrl, setShareUrl] =
    useState("");

  useEffect(() => {

    if (typeof window !== "undefined") {

      setShareUrl(
        `${window.location.origin}/results/${auditId}`
      );
    }

  }, [auditId]);

  const [iscopied, setIscopied] = useState(false)
  const copyLink = async () => {

    setIscopied(false)
    await navigator.clipboard.writeText(
      shareUrl
    );
    setIscopied(true)
    setTimeout(() => {
      setIscopied(false)
    }, 1000);

    toast.success("Link copied!");
    // alert("Link copied!");
  };


  // 1. Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#F6F7FB]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-slate-500 font-medium">Fetching your audit results...</p>
      </div>
    );
  }

  // 2. Error Handling (Data not found)
  if (!auditData) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#F6F7FB] px-4 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Audit Not Found</h1>
        <p className="text-slate-500 mb-6">
          We couldn't find any data associated with the Audit ID: <span className="font-semibold">{auditId}</span>
        </p>
        <Link href="/audit" className="bg-purple-600 text-white px-8 py-3 rounded-2xl font-bold">
          Try Another Audit
        </Link>
      </div>
    );
  }

  // 3. SAFE DESTRUCTURING
 
  const {
    current_spend,
    optimized_spend,
    total_savings,
    annual_savings,
    credex_savings,
    audit_results,
    ai_summary,
    audit_id,
    team_size,
    use_case,
    created_at
  } = auditData;


  // console.log(team_size)


  // 2. this is  for how many recommendations user want on click 'viw all recommendation' button 
  // Agar expanded hai to pura array, warna sirf pehle 3
  const visibleItems = isExpanded ? audit_results : audit_results.slice(0, 3);
  
  
  //donwload pdf function
  const downloadPDF = async () => {

    const element = pdfRef.current;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210; // A4 width
    const pdfHeight = 297; // A4 height

    const imgWidth = pdfWidth;

    const imgHeight =
      (canvas.height * imgWidth) /
      canvas.width;

    let heightLeft = imgHeight;

    let position = 0;

    // FIRST PAGE
    pdf.addImage(
      imgData,
      "PNG",
      0,
      position,
      imgWidth,
      imgHeight
    );

    heightLeft -= pdfHeight;

    // ADD EXTRA PAGES
    while (heightLeft > 0) {

      position = heightLeft - imgHeight;

      pdf.addPage();

      pdf.addImage(
        imgData,
        "PNG",
        0,
        position,
        imgWidth,
        imgHeight
      );

      heightLeft -= pdfHeight;
    }

    pdf.save(`audit-${auditId}.pdf`);
  };






  // Render logic continues below...

  return (
    // bg-[#F6F7FB]
    <div ref={pdfRef} className="min-h-screen mt-20  overflow-x-hidden">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-10 pb-8 flex flex-col lg:flex-row justify-between gap-6">
        <div>
          <Link href={"/audit"}>
            <h1 className="mb-4 text-purple-600 flex items-center gap-2 text-sm font-medium">
              <IoMdArrowRoundBack />
              Back to audit
            </h1>
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">
            Your Audit Results 🎉
          </h1>
          <p className="mt-3 text-slate-500 text-sm">
            Here's how much you can save by optimizing your AI tool spending.
          </p>
        </div>

        {/* AUDIT ID */}
        <div className="bg-white border w-72 border-slate-200 rounded-2xl px-5 py-4 h-fit shadow-sm">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-semibold">Audit ID:</h2>
            <p className="font-bold">{audit_id}</p>
            <FaRegCopy size={22} className="ml-10 text-gray-500 cursor-pointer" />
          </div>
          <div className="flex font-semibold gap-3 mt-2 text-xs text-gray-500">
            <p >{formatDateTime(created_at)}</p>
           
          </div>
        </div>
      </div>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-white border border-slate-100 shadow-lg rounded-[30px] grid grid-cols-1 lg:grid-cols-3 overflow-hidden">

          {/* LEFT: TOTAL SAVINGSs */}
          <div className="p-8">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-lg font-bold text-slate-900">Total Potential Savings</p>
                <h1 className="font-bold text-5xl text-green-500 mt-2">
                  {NumericValueFormate(total_savings)}
                  <span className="text-sm text-gray-400"> /month</span>
                </h1>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 border border-green-100 text-green-600 text-xs font-medium w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Reduced AI Spend
              </div>
            </div>

            <div className="h-[1px] bg-slate-200 my-6"></div>

            <div className="grid grid-cols-2 gap-4">
              {/* YEARLY */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex justify-center items-center">
                    <MdOutlineEnergySavingsLeaf className="text-purple-600" size={24} />
                  </div>
                  <div className="w-full">
                    <div className="flex items-center gap-2">
                      <h2 className="font-bold text-xl">{NumericValueFormate(annual_savings)}</h2>
                    </div>
                    <p className="text-xs text-gray-500 font-semibold mt-1">Yearly Savings</p>
                  </div>
                </div>
              </div>

              {/* CREDITS */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex justify-center items-center">
                    <MdCalendarMonth className="text-purple-600" size={24} />
                  </div>
                  <div className="w-full">
                    <h2 className="font-bold text-xl">{NumericValueFormate(credex_savings)}</h2>
                    <p className="text-xs text-gray-500 mt-1">Extra Credit Savings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER: INFRASTRUCTURE SUMMARY */}
          <div className="border-y xl:border-y-0 xl:border-x border-slate-100 p-8 flex flex-col justify-between h-full">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Infrastructure Summary</h2>
              <div className="mt-8 flex flex-col gap-6">

                {/* Total Tools Used */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center">
                      <RiStackLine className="text-blue-600" size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Total Tools</p>
                      <p className="text-sm font-semibold text-slate-700">AI Subscriptions</p>
                    </div>
                  </div>
                  <h1 className="text-xl font-black text-slate-900">{audit_results?.length || 0}</h1>
                </div>

                {/* Active Team Size */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                      <RiUser3Line className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Team Size</p>
                      <p className="text-sm font-semibold text-slate-700">Active Members</p>
                    </div>
                  </div>
                  <h1 className="text-xl font-black text-slate-900">{team_size || '0'}</h1>
                </div>


                {/* Primary Use Case */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center">
                      <RiLightbulbFlashLine className="text-purple-600" size={18} />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-tight">Primary Use Case</p>
                      <p className="text-sm font-semibold text-slate-700">coding/writing/etc.</p>
                    </div>
                  </div>
                  <h1 className="text-xl font-black text-slate-900">{use_case}</h1>
                </div>

                

              </div>
            </div>

            {/* Bottom Status Badge */}
            <div className="bg-slate-900 rounded-2xl p-5 mt-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/20 blur-2xl rounded-full" />
              <div className="flex justify-between items-center relative z-10">
                <div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Stack Health</p>
                  <h1 className="text-xl font-black text-white">Optimized</h1>
                </div>
                <RiShieldCheckLine className="text-green-400 text-3xl" />
              </div>
            </div>
          </div>

          {/* RIGHT: CALL TO ACTION */}
          <div className="px-3 flex flex-col h-full justify-center ">
            <SpendComparisonChart
              current_spend={current_spend}
              optimized_spend={optimized_spend}
              NumericValueFormate={NumericValueFormate}
            />
          </div>
        </div>
      </div>

      {/* BREAKDOWN SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-10">
        <SavingsBreakdownCard
          auditData={audit_results}
          totalSavings={total_savings}
        />
      </div>

      {/* LOWER GRID */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* RECOMMENDATIONS */}
        <div className="bg-white border border-slate-100 rounded-[30px] shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <GiProgression className="text-purple-600" size={24} />
            <h2 className="text-2xl font-bold">Top Recommendations</h2>
          </div>

          <div className="space-y-4">
            {/* 3. visibleItems par map chalayein */}
            {visibleItems.map((item, index) => (
              <div key={index} className="border border-slate-100 rounded-2xl p-4 hover:shadow-md transition animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.icon || "/placeholder-icon.png"}
                      alt={item.tool}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        Switch from {item.currentPlan} → {item.recommendedPlan}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">{item.reason}</p>
                    </div>
                  </div>
                  <div className="bg-green-100 text-green-600 text-xs min-w-32 font-bold px-3 py-3 rounded-xl w-fit text-center">
                    Save {NumericValueFormate(item.savings)}/month
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Button jo state ko toggle karega */}
          {audit_results.length > 3 && (
            <div className="w-full flex justify-center items-center my-5">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="bg-purple-100 w-full cursor-pointer flex justify-center items-center gap-2 hover:bg-purple-200 transition text-purple-600 px-8 py-3 rounded-2xl font-bold text-md shadow-lg shadow-purple-50"
              >
                <RiSparklingFill className="text-purple-600" size={20} />
                {isExpanded ? "View Less ↑" : "View All Recommendations →"}
              </button>
            </div>
          )}
        </div>

        {/* AI SUMMARY */}
        <div className="bg-purple-50 border border-purple-100 rounded-[30px] shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <BsStars className="text-purple-600" size={24} />
            <h2 className="text-2xl font-bold">AI Summary</h2>
          </div>
          <div className="bg-white rounded-2xl min-h-52 p-5 border border-purple-100">
            <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">
              {ai_summary}
            </p>
          </div>
          <div className="mt-6 bg-purple-100 border border-purple-200 rounded-2xl p-5 flex justify-between items-center">
            <div>
              <h2 className="font-bold text-purple-800">High Impact Opportunity</h2>
              <p className="text-xs text-gray-600 mt-1">
                You can save {NumericValueFormate(total_savings)}/month with minimal effort.
              </p>
            </div>
            <MdOutlineAutoGraph className="text-purple-600" size={34} />
          </div>
        </div>
      </div>

      {/* SHARE SECTION */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 mt-10 pb-20">
        <div className="bg-purple-50 border border-purple-100 rounded-[30px] shadow-lg p-6">
          <div className="flex items-center gap-3">
            <FaShareAlt className="text-purple-600" size={22} />
            <h2 className="text-2xl font-bold">Share Your Report</h2>
          </div>
          <p className="text-sm text-gray-500 mt-2">Share this link with your team or stakeholders</p>
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-purple-200 rounded-2xl bg-white p-4">
            <p className="text-sm font-semibold text-purple-700 break-all">
              {shareUrl}
            </p>
            <button className={`${!iscopied ? 'bg-purple-100 text-purple-600 hover:bg-purple-200 ' : 'bg-green-100 text-green-600'}  cursor-pointer  transition p-3 rounded-xl  w-fit`}>
              {!iscopied && <FaRegCopy onClick={copyLink} size={20} />

              }
              {
                iscopied && <IoCheckmarkDoneSharp size={20} />
              }
            </button>
          </div>
          <button
            onClick={downloadPDF}
            className="bg-purple-600 my-5 cursor-pointer text-white px-5 py-3 rounded-xl"
          >
            Download PDF
          </button>
        </div>

        {/* FOOTER */}
        <div className="flex justify-center items-center py-10">
          <p className="text-sm text-gray-500 text-center">
            Your data is secure and never shared. Read our
            <span className="text-purple-600 font-medium"> Privacy Policy</span>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}