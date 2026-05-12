import { GoogleGenerativeAI } from "@google/generative-ai";
import OpenAI from "openai";
import { NextResponse } from "next/server";

// const genAI = new GoogleGenerativeAI(
//   process.env.GEMINI_API_KEY
// );

// export async function POST(req) {

//   try {

//     const body = await req.json();

//     const {
//       auditResults,
//       totalSavings,
//       currentSpend,
//       optimizedSpend,
//     } = body;

//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.0-flash",
//     });

//     const prompt = `
// You are an AI spend optimization consultant.

// Analyze the following AI tool spending audit.

// Current Spend: $${currentSpend}
// Optimized Spend: $${optimizedSpend}
// Potential Savings: $${totalSavings}

// Audit Results:
// ${JSON.stringify(auditResults)}

// Generate:
// - Professional summary
// - Around 100 words
// - Mention overspending patterns
// - Mention optimization opportunities
// - Mention potential savings
// - Business friendly tone
// `;

//     const result = await model.generateContent(prompt);

//     const response = result.response.text();

//     return NextResponse.json({
//       success: true,
//       summary: response,
//     });

//   } catch (error) {

//     console.log("GEMINI ERROR:", error);

//     return NextResponse.json({
//       success: false,
//       error: error.message,
//       summary:
//         "Your team has several opportunities to optimize AI spending through better plan allocation, removing unnecessary enterprise subscriptions, and switching to more cost-efficient AI tooling.",
//     });
//   }
// }















const client = new OpenAI({
  apiKey: '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' ||  process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

export async function POST(req) {

  try {

    const body = await req.json();

    const {
      auditResults,
      totalSavings,
      currentSpend,
      optimizedSpend,
    } = body;

    const prompt = `
You are an AI spend optimization consultant.

Analyze the following AI tool spending audit.

Current Spend: $${currentSpend}
Optimized Spend: $${optimizedSpend}
Potential Savings: $${totalSavings}

Audit Results:
${JSON.stringify(auditResults)}

Generate:
- Professional summary
- Around 100 words
- Mention overspending patterns
- Mention optimization opportunities
- Mention potential savings
- Business friendly tone
`;

    const completion = await client.chat.completions.create({
      model: "deepseek/deepseek-chat",
      messages: [
        {
          role: "system",
          content:
            "You are an expert AI cost optimization consultant.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const response =
      completion.choices[0].message.content;

    return NextResponse.json({
      success: true,
      summary: response,
    });

  } catch (error) {

    console.log("OPENROUTER ERROR:", error);

    return NextResponse.json({
      success: false,
      error: error.message,
      summary:
        "Your team has several opportunities to optimize AI spending through better plan allocation, removing unnecessary enterprise subscriptions, and switching to more cost-efficient AI tooling.",
    });
  }
}
