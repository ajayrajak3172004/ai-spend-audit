import ResultsCard from "@/components/ResultsCart";

// ============================================
// DYNAMIC SEO / OPEN GRAPH
// ============================================

export async function generateMetadata({
  params,
}) {

  const { auditId } = params;

  const publicUrl =
    `https://yourdomain.com/results/${auditId}`;

  return {

    title:
      `AI Spend Audit ${auditId}`,

    description:
      "See AI tool savings and optimization recommendations.",

    openGraph: {

      title:
        "AI Spend Audit Results",

      description:
        "Discover how much you can save on ChatGPT, Claude, Cursor and more.",

      url: publicUrl,

      siteName:
        "Credex AI Audit",

      images: [
        {
          url:
            "https://yourdomain.com/og-image.png",

          width: 1200,
          height: 630,

          alt:
            "AI Spend Audit",
        },
      ],

      locale: "en_US",

      type: "website",
    },

    twitter: {

      card:
        "summary_large_image",

      title:
        "AI Spend Audit Results",

      description:
        "See your AI optimization savings report.",

      images: [
        "https://yourdomain.com/og-image.png",
      ],
    },
  };
}

// ============================================
// PAGE
// ============================================

export default async function Page({
  params,
}) {

  const { auditId } =
    await params;

  return (
    <ResultsCard
      auditId={auditId}
    />
  );
}