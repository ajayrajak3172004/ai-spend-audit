// lib/auditEngine.js

import { PRICING_DATA } from "./PricingData";

export const runAuditEngine = ({
  rows,
  teamSize,
  useCase,
}) => {

  const auditResults = [];

  let totalCurrentSpend = 0;

  let totalOptimizedSpend = 0;

  let totalSavings = 0;

  // LOOP THROUGH ALL TOOLS

  rows.forEach((item) => {

    // SKIP EMPTY

    if (!item.tool || !item.selectedPlan) return;

    const toolData = PRICING_DATA[item.tool];

    if (!toolData) return;

    const plans = toolData.plans;

    const currentPlanData =
      plans[item.selectedPlan];

    if (!currentPlanData) return;

    // CURRENT VALUES

    const seats = Number(item.seats || 1);

    const currentSpend =
      Number(item.cost || 0);

    totalCurrentSpend += currentSpend;

    // DEFAULT VALUES

    let recommendedPlan =
      item.selectedPlan;

    let optimizedCost =
      currentSpend;

    let savings = 0;

    let reason =
      "Your current setup already looks cost-efficient.";

    // ============================================
    // FIND BEST PLAN
    // ============================================

    let cheapestMatchingPlan =
      item.selectedPlan;

    let cheapestCost =
      currentSpend;

    // LOOP THROUGH ALL PLANS

    Object.entries(plans).forEach(
      ([planName, planData]) => {

        const {
          pricePerSeat,
          recommendedMinSeats,
          recommendedMaxSeats,
          useCases,
        } = planData;

        // CHECK SEAT RULES

        const validMin =
          !recommendedMinSeats ||
          seats >= recommendedMinSeats;

        const validMax =
          !recommendedMaxSeats ||
          seats <= recommendedMaxSeats;

        // CHECK USE CASE

        const validUseCase =
          !useCases ||
          useCases.includes(useCase);

        // IF VALID

        if (
          validMin &&
          validMax &&
          validUseCase
        ) {

          const estimatedCost =
            pricePerSeat * seats;

          // FIND CHEAPEST

          if (
            estimatedCost < cheapestCost
          ) {

            cheapestCost =
              estimatedCost;

            cheapestMatchingPlan =
              planName;
          }
        }
      }
    );

    // ============================================
    // IF FOUND BETTER PLAN
    // ============================================

    if (
      cheapestMatchingPlan !==
      item.selectedPlan
    ) {

      recommendedPlan =
        cheapestMatchingPlan;

      optimizedCost =
        cheapestCost;

      savings =
        currentSpend - optimizedCost;

      reason = `${item.selectedPlan} may be overkill for ${seats} seat(s). ${recommendedPlan} provides similar value at a lower monthly cost.`;
    }

    // ============================================
    // ALTERNATIVE TOOL
    // ============================================

    let alternativeTool =
      toolData.alternative;

    let alternativeSavings = 0;

    if (alternativeTool) {

      alternativeSavings =
        Math.round(
          optimizedCost * 0.1
        );
    }

    // ============================================
    // CREDITS SAVINGS
    // ============================================

    const creditDiscount =
      toolData.creditDiscount || 0;

    const credexSavings =
      Math.round(
        (optimizedCost *
          creditDiscount) /
          100
      );

    // ============================================
    // TOTALS
    // ============================================

    totalOptimizedSpend += optimizedCost;

    totalSavings += savings;

    // ============================================
    // PUSH RESULT
    // ============================================

    auditResults.push({

      tool: item.tool,

      icon: item.icon,

      currentPlan:
        item.selectedPlan,

      recommendedPlan,

      currentSpend,

      optimizedCost,

      savings,

      seats,

      useCase,

      reason,

      alternativeTool,

      alternativeSavings,

      credexSavings,

    });
  });

  // ============================================
  // FINAL TOTALS
  // ============================================

  const annualSavings =
    totalSavings * 12;

  const totalCredexSavings =
    Math.round(
      totalOptimizedSpend * 0.15
    );

  return {

    teamSize,

    useCase,

    totalCurrentSpend,

    totalOptimizedSpend,

    totalSavings,

    annualSavings,

    totalCredexSavings,

    auditResults,

  };
};