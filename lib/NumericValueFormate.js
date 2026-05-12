// lib/utils.js

export const NumericValueFormate = (value) => {
  if (!value || isNaN(value)) return "$0";

  // Intl.NumberFormat built-in JS feature that handles formatting 
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact", // Ye K, M, B automatically handle karta hai
    compactDisplay: "short", 
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 1, // Example: 1.5k (instead of 1.52k)
  });

  return formatter.format(value);
};

