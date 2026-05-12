"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { TOOLS_DATA } from "@/lib/toolsData";
import { runAuditEngine } from "@/lib/auditEngine";
import { supabase } from "@/lib/supabase";

import {
  RiDeleteBin6Line,
  RiSparklingFill,
  RiSecurePaymentLine,
  RiCloseLine,
} from "react-icons/ri";

import Turnstile from "react-turnstile";
import Footer from "./Footer";
import { toast } from "react-toastify";

export default function AuditForm() {

  const router = useRouter();

  // ============================================
  // GLOBAL STATES
  // ============================================

  const [teamSize, setTeamSize] = useState("");

  const [useCase, setUseCase] =
    useState("coding");

  const [loading, setLoading] =
    useState(false);

  // ============================================
  // POPUP STATES
  // ============================================

  const [showLeadPopup, setShowLeadPopup] =
    useState(false);

  const [leadData, setLeadData] =
    useState({
      company_name: "",
      full_name: "",
      email: "",
    });

  const [captchaToken, setCaptchaToken] =
    useState("");

  // ============================================
  // TOOL ROWS
  // ============================================

  const [rows, setRows] = useState([
    {
      id: Date.now(),
      tool: "",
      icon: "",
      plans: [],
      selectedPlan: "",
      cost: "",
      seats: 1,
    },
  ]);

  // ============================================
  // LOAD LOCAL STORAGE
  // ============================================

  useEffect(() => {

    const saved =
      localStorage.getItem("audit_form");

    if (saved) {

      const parsed =
        JSON.parse(saved);

      setRows(
        parsed.rows?.length
          ? parsed.rows
          : [
            {
              id: Date.now(),
              tool: "",
              icon: "",
              plans: [],
              selectedPlan: "",
              cost: "",
              seats: 1,
            },
          ]
      );

      setTeamSize(
        parsed.teamSize || ""
      );

      setUseCase(
        parsed.useCase || "coding"
      );
    }

  }, []);

  // ============================================
  // SAVE LOCAL STORAGE
  // ============================================

  useEffect(() => {

    localStorage.setItem(
      "audit_form",
      JSON.stringify({
        rows,
        teamSize,
        useCase,
      })
    );

  }, [rows, teamSize, useCase]);

  // ============================================
  // ADD TOOL
  // ============================================

  const addRow = () => {

    setRows([
      ...rows,
      {
        id: Date.now(),
        tool: "",
        icon: "",
        plans: [],
        selectedPlan: "",
        cost: "",
        seats: 1,
      },
    ]);
  };

  // ============================================
  // DELETE TOOL
  // ============================================

  const deleteRow = (id) => {

    if (rows.length === 1) {

      toast.error("At least one tool row is required.")
      // alert(
      //   "At least one tool row is required."
      // );

      return;
    }

    setRows(
      rows.filter(
        (row) => row.id !== id
      )
    );
  };

  // ============================================
  // TOOL CHANGE
  // ============================================

  const handleToolChange = (
    id,
    toolName
  ) => {

    const selectedTool =
      TOOLS_DATA.find(
        (tool) =>
          tool.name === toolName
      );

    if (!selectedTool) return;

    setRows(

      rows.map((row) =>

        row.id === id
          ? {
            ...row,
            tool:
              selectedTool.name,
            icon:
              selectedTool.icon,
            plans:
              selectedTool.plans,
            selectedPlan:
              selectedTool.plans[0],
          }
          : row
      )
    );
  };

  // ============================================
  // UPDATE FIELD
  // ============================================

  const updateField = (
    id,
    field,
    value
  ) => {

    setRows(

      rows.map((row) =>

        row.id === id
          ? {
            ...row,
            [field]: value,
          }
          : row
      )
    );
  };

  // ============================================
  // TOTAL SPEND
  // ============================================

  const totalSpend =
    rows.reduce(
      (acc, item) =>
        acc +
        Number(item.cost || 0),
      0
    );

  // ============================================
  // EMAIL VALIDATION
  // ============================================

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // ============================================
  // VALIDATE AUDIT BEFORE POPUP
  // ============================================

  const validateAudit = () => {

    if (rows.length === 0) {

      toast.warning("Please add at least one tool.")
      // alert(
      //   "Please add at least one tool."
      // );

      return false;
    }

    const emptyRowIndex =
      rows.findIndex((row) => {
        return (
          !row.tool ||
          !row.selectedPlan ||
          row.cost === "" ||
          row.seats < 1
        );
      });

    if (emptyRowIndex !== -1) {

      toast.warning(`Please fill all details in Row #${emptyRowIndex + 1}`);
      // alert(
      //   `Please fill all details in Row #${emptyRowIndex + 1}`
      // );

      return false;
    }

    if (!teamSize) {

      toast.warning("Please enter team size");
      // alert(
      //   "Please enter team size"
      // );

      return false;
    }

    return true;
  };

  // ============================================
  // OPEN POPUP
  // ============================================

  const handleOpenPopup = () => {

    const valid =
      validateAudit();

    if (!valid) return;

    setShowLeadPopup(true);
  };

  // ============================================
  // FINAL AUDIT
  // ============================================

  const handleRunAudit = async () => {

    // LEAD VALIDATION

    if (
      !leadData.company_name ||
      !leadData.full_name ||
      !leadData.email
    ) {

      toast.warning("Please fill all company details");
      // alert(
      //   "Please fill all company details"
      // );

      return;
    }

    if (
      !isValidEmail(
        leadData.email
      )
    ) {

      toast.error("Please enter a valid email");
      // alert(
      //   "Please enter a valid email"
      // );

      return;
    }

    if (!captchaToken) {

      toast.warning("Please verify captcha")
      // alert(
      //   "Please verify captcha"
      // );

      return;
    }

    setLoading(true);

    try {

      // ============================================
      // CAPTCHA VERIFY
      // ============================================

      const captchaResponse =
        await fetch(
          "/api/verify-captcha",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              token:
                captchaToken,
            }),
          }
        );

      const captchaData =
        await captchaResponse.json();

      if (!captchaData.success) {

        toast.error("Captcha verification failed");
        // alert(
        //   "Captcha verification failed"
        // );

        return;
      }

      // ============================================
      // RUN AUDIT ENGINE
      // ============================================

      const auditData =
        runAuditEngine({
          rows,
          teamSize,
          useCase,
        });

      // ============================================
      // GENERATE REPORT ID
      // ============================================

      const reportId =
        "AUD-" +
        Math.random()
          .toString(36)
          .substring(2, 8)
          .toUpperCase();

      // ============================================
      // SAVE LEAD
      // ============================================

      const {
        data: leadInsertData,
        error: leadError,
      } = await supabase
        .from("leads")
        .insert([
          {
            company_name:
              leadData.company_name,

            full_name:
              leadData.full_name,

            email:
              leadData.email,
          },
        ])
        .select();

      if (leadError) {

        console.log(
          leadError
        );

        throw leadError;
      }

      const leadId =
        leadInsertData?.[0]?.id;

      // ============================================
      // AI SUMMARY
      // ============================================

      let aiSummaryContent =
        "Analysis completed successfully.";

      try {

        const aiResponse =
          await fetch(
            "/api/generate-summary",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                auditResults:
                  auditData.auditResults,

                totalSavings:
                  auditData.totalSavings,

                currentSpend:
                  auditData.totalCurrentSpend,

                optimizedSpend:
                  auditData.totalOptimizedSpend,
              }),
            }
          );

        const aiJson =
          await aiResponse.json();

        if (
          aiResponse.ok &&
          aiJson.success
        ) {

          aiSummaryContent =
            aiJson.summary;

        } else {

          console.log(
            "AI SUMMARY ERROR:",
            aiJson.error
          );

          aiSummaryContent =
            aiJson.summary ||
            "Unable to generate AI summary.";
        }

      } catch (err) {

        console.log(
          "FETCH ERROR:",
          err
        );

        aiSummaryContent =
          "Unable to generate AI summary at this moment.";
      }

      // ============================================
      // SAVE AUDIT
      // ============================================

      const { error } =
        await supabase
          .from("audits")
          .insert([
            {
              audit_id:
                reportId,

              lead_id:
                leadId,

              team_size:
                parseInt(teamSize),

              use_case:
                useCase,

              audit_data:
                rows,

              audit_results:
                auditData.auditResults,

              current_spend:
                auditData.totalCurrentSpend,

              optimized_spend:
                auditData.totalOptimizedSpend,

              total_savings:
                auditData.totalSavings,

              annual_savings:
                auditData.annualSavings,

              credex_savings:
                auditData.totalCredexSavings,

              ai_summary:
                aiSummaryContent,
            },
          ]);

      if (error) {

        console.log(error);

        throw error;
      }

      // ============================================
      // SUCCESS
      // ============================================

      router.push(
        `/results/${reportId}`
      );

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");
      // alert(
      //   "Something went wrong"
      // );

    } finally {

      setLoading(false);
    }
  };

  return (

    <>

      {/* ============================================
          POPUP
      ============================================ */}

      {showLeadPopup && (

        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center px-4">

          <div className="bg-white w-full max-w-lg rounded-3xl p-8 relative">

            <button
              onClick={() =>
                setShowLeadPopup(false)
              }
              className="absolute top-5 right-5 cursor-pointer"
            >
              <RiCloseLine size={24} />
            </button>

            <h2 className="text-3xl font-bold">
              Company Details
            </h2>

            <p className="text-gray-500 mt-2">
              Enter your details before generating audit report.
            </p>

            <div className="mt-8 space-y-5">

              <input
                type="text"
                placeholder="Company Name"
                value={
                  leadData.company_name
                }
                onChange={(e) =>
                  setLeadData({
                    ...leadData,
                    company_name:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none"
              />

              <input
                type="text"
                placeholder="Full Name"
                value={
                  leadData.full_name
                }
                onChange={(e) =>
                  setLeadData({
                    ...leadData,
                    full_name:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={
                  leadData.email
                }
                onChange={(e) =>
                  setLeadData({
                    ...leadData,
                    email:
                      e.target.value,
                  })
                }
                className="w-full border rounded-xl px-4 py-3 outline-none"
              />

              <div className="flex justify-center pt-2">

                <Turnstile
                  sitekey={
                    process.env
                      .NEXT_PUBLIC_TURNSTILE_SITE_KEY
                  }
                  onVerify={(token) =>
                    setCaptchaToken(
                      token
                    )
                  }
                />

              </div>

              <button
                onClick={handleRunAudit}
                disabled={loading}
                className="w-full bg-purple-600 hover:bg-purple-700 transition text-white py-4 rounded-2xl font-bold disabled:opacity-50 cursor-pointer flex items-center justify-center gap-3"
              >
                <RiSparklingFill
                  size={20}
                  className={`text-white ${loading
                      ? "animate-pulse scale-110 transition-transform duration-700"
                      : ""
                    }`}
                />

                {loading
                  ? "Generating..."
                  : "Generate Audit"}
              </button>

            </div>

          </div>

        </div>

      )}

      {/* ============================================
          MAIN PAGE
      ============================================ */}

      <div className="min-h-screen  overflow-x-hidden">

        {/* HERO */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 flex flex-col lg:flex-row justify-between gap-10">

          <div>

            <h1 className="text-4xl font-bold leading-tight text-slate-900">
              AI Spend Audit
            </h1>

            <p className="mt-5 text-slate-500 text-md max-w-2xl leading-relaxed">
              Add all the AI tools your team is using.
              We’ll analyze your current spend and show you how much you can save.
            </p>

          </div>

          {/* SECURE CARD */}

          <div className="bg-white border border-slate-100 shadow-lg rounded-3xl p-6 max-w-md h-fit">

            <div className="flex items-start gap-4">

              <div className="w-14 h-14 rounded-2xl bg-purple-100 flex justify-center items-center">

                <RiSecurePaymentLine
                  className="text-purple-600"
                  size={28}
                />

              </div>

              <div>

                <h2 className="font-bold text-lg">
                  Secure & Private
                </h2>

                <p className="text-slate-500 text-sm mt-2">
                  Your data is encrypted and never shared.
                  We only use it to generate your audit.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* MAIN CARD */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">

          <div className="bg-white border border-slate-100 rounded-[32px] shadow-xl p-4 sm:p-8">

            {/* TOP */}

            <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-5 mb-10">

              <div>

                <h2 className="text-3xl font-bold">
                  Your AI Tools
                </h2>

                <p className="text-slate-500 mt-2">
                  Add the AI tools and subscriptions you're currently using
                </p>

              </div>

              <button
                onClick={addRow}
                className="border-2 cursor-pointer border-dashed border-purple-400 text-purple-600 hover:bg-purple-50 transition px-6 py-3 rounded-xl font-semibold"
              >
                + Add Tool
              </button>

            </div>

            {/* TOOL ROWS */}

            <div className="space-y-6">

              {rows.map((row) => (

                <div
                  key={row.id}
                  className="grid grid-cols-1 lg:grid-cols-12 gap-5 bg-slate-50 border-2 border-dashed border-slate-300 rounded-3xl p-6"
                >

                  {/* TOOL */}

                  <div className="lg:col-span-4">

                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      AI Tool
                    </label>

                    <select
                      required
                      value={row.tool}
                      onChange={(e) =>
                        handleToolChange(
                          row.id,
                          e.target.value
                        )
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none"
                    >

                      <option value="">
                        Select Tool
                      </option>

                      {TOOLS_DATA.map(
                        (tool) => (

                          <option
                            key={tool.id}
                            value={tool.name}
                          >
                            {tool.name}
                          </option>

                        )
                      )}

                    </select>

                    {row.tool && (

                      <div className="flex items-center gap-3 mt-3">

                        <Image
                          src={row.icon}
                          alt={row.tool}
                          width={35}
                          height={35}
                          className="rounded-lg"
                        />

                        <span className="font-medium">
                          {row.tool}
                        </span>

                      </div>

                    )}

                  </div>

                  {/* PLAN */}

                  <div className="lg:col-span-2">

                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Plan
                    </label>

                    <select
                      required
                      value={
                        row.selectedPlan
                      }
                      onChange={(e) =>
                        updateField(
                          row.id,
                          "selectedPlan",
                          e.target.value
                        )
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none"
                    >

                      {row.plans.map(
                        (plan) => (

                          <option
                            key={plan}
                            value={plan}
                          >
                            {plan}
                          </option>

                        )
                      )}

                    </select>

                  </div>

                  {/* COST */}

                  <div className="lg:col-span-2">

                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Monthly Cost
                    </label>

                    <input
                      required
                      type="number"
                      placeholder="$20"
                      value={row.cost}
                      min="0"
                      onKeyDown={(e) => {

                        if (
                          e.key === "-" ||
                          e.key === "e" ||
                          e.key === "E"
                        ) {
                          e.preventDefault();
                        }

                      }}
                      onChange={(e) =>
                        updateField(
                          row.id,
                          "cost",
                          e.target.value
                        )
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none"
                    />

                  </div>

                  {/* SEATS */}

                  <div className="lg:col-span-2">

                    <label className="block text-sm font-medium text-slate-600 mb-2">
                      Seats
                    </label>

                    <input
                      required
                      type="number"
                      placeholder="2"
                      value={row.seats}
                      min={1}
                      onKeyDown={(e) => {

                        if (
                          e.key === "-" ||
                          e.key === "e" ||
                          e.key === "E"
                        ) {
                          e.preventDefault();
                        }

                      }}
                      onChange={(e) =>
                        updateField(
                          row.id,
                          "seats",
                          e.target.value
                        )
                      }
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none"
                    />

                  </div>

                  {/* DELETE */}

                  <div className="lg:col-span-2 flex items-end">

                    <button
                      onClick={() =>
                        deleteRow(
                          row.id
                        )
                      }
                      className="bg-red-50 hover:bg-red-100 transition p-3 rounded-xl text-red-500 cursor-pointer"
                    >

                      <RiDeleteBin6Line
                        size={22}
                      />

                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* GLOBAL INPUTS */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">

              {/* TEAM SIZE */}

              <div>

                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Total Team Size
                </label>

                <input
                  required
                  type="number"
                  placeholder="10"
                  value={teamSize}
                  min={1}
                  onKeyDown={(e) => {

                    if (
                      e.key === "-" ||
                      e.key === "e" ||
                      e.key === "E"
                    ) {
                      e.preventDefault();
                    }

                  }}
                  onChange={(e) =>
                    setTeamSize(
                      e.target.value
                    )
                  }
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none"
                />

              </div>

              {/* USE CASE */}

              <div>

                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Primary Use Case
                </label>

                <select
                  required
                  value={useCase}
                  onChange={(e) =>
                    setUseCase(
                      e.target.value
                    )
                  }
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none"
                >

                  <option value="coding">
                    Coding
                  </option>

                  <option value="writing">
                    Writing
                  </option>

                  <option value="data">
                    Data
                  </option>

                  <option value="research">
                    Research
                  </option>

                  <option value="mixed">
                    Mixed
                  </option>

                </select>

              </div>

            </div>

            {/* FOOTER */}

            <div className="mt-12 flex flex-col gap-10 bg-slate-50 border border-slate-100 rounded-2xl p-6">

              {/* ADD BUTTON */}

              <div>

                <button
                  onClick={addRow}
                  className="w-full cursor-pointer py-3 rounded-xl flex justify-center items-center text-purple-600 font-medium gap-2 border-2 border-dashed border-purple-500 hover:text-purple-700 hover:border-purple-700 transition-all"
                >

                  <span>+</span>

                  Add Another Tool

                </button>

              </div>

              {/* TOTAL */}

              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-2xl bg-purple-100 flex justify-center items-center">

                    <RiSparklingFill
                      className="text-purple-600"
                      size={26}
                    />

                  </div>

                  <div>

                    <p className="text-slate-500 text-sm">
                      Total Current Monthly Spend
                    </p>

                    <h2 className="text-3xl font-bold">
                      $
                      {totalSpend.toFixed(
                        2
                      )}
                    </h2>

                  </div>

                </div>

                {/* RUN AUDIT */}

                <button
                  onClick={
                    handleOpenPopup
                  }
                  disabled={loading}
                  className="bg-purple-600 cursor-pointer flex justify-center items-center gap-2 hover:bg-purple-700 transition text-white px-8 py-4 rounded-2xl font-bold text-md shadow-lg shadow-purple-200 disabled:opacity-50"
                >

                  <RiSparklingFill
                    className="text-white"
                    size={20}
                  />

                  {loading
                    ? "Running Audit..."
                    : "Run Audit →"}

                </button>

              </div>

            </div>

          </div>

        </div>

        <Footer />

      </div>

    </>
  );
}