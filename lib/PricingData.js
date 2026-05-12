// lib/pricingData.js

export const PRICING_DATA = {

  ChatGPT: {

    vendor: "OpenAI",

    alternative: "Claude",

    creditDiscount: 15,

    plans: {

      Plus: {
        pricePerSeat: 20,
        recommendedMaxSeats: 2,
        useCases: [
          "writing",
          "research",
          "mixed",
        ],
      },

      Team: {
        pricePerSeat: 30,
        recommendedMinSeats: 3,
        recommendedMaxSeats: 20,
        useCases: [
          "coding",
          "mixed",
          "research",
        ],
      },

      Enterprise: {
        pricePerSeat: 60,
        recommendedMinSeats: 21,
        useCases: [
          "enterprise",
          "mixed",
        ],
      },

      "API Direct": {
        pricePerSeat: 25,
        recommendedMinSeats: 1,
        useCases: [
          "coding",
          "data",
        ],
      },

    },

  },

  Claude: {

    vendor: "Anthropic",

    alternative: "ChatGPT",

    creditDiscount: 12,

    plans: {

      Free: {
        pricePerSeat: 0,
        recommendedMaxSeats: 1,
        useCases: [
          "writing",
        ],
      },

      Pro: {
        pricePerSeat: 20,
        recommendedMaxSeats: 2,
        useCases: [
          "writing",
          "research",
        ],
      },

      Max: {
        pricePerSeat: 40,
        recommendedMinSeats: 3,
        recommendedMaxSeats: 5,
        useCases: [
          "research",
          "mixed",
        ],
      },

      Team: {
        pricePerSeat: 30,
        recommendedMinSeats: 6,
        recommendedMaxSeats: 20,
        useCases: [
          "writing",
          "mixed",
        ],
      },

      Enterprise: {
        pricePerSeat: 75,
        recommendedMinSeats: 21,
        useCases: [
          "enterprise",
        ],
      },

      "API Direct": {
        pricePerSeat: 35,
        recommendedMinSeats: 1,
        useCases: [
          "coding",
          "data",
        ],
      },

    },

  },

  Cursor: {

    vendor: "Cursor",

    alternative: "GitHub Copilot",

    creditDiscount: 10,

    plans: {

      Hobby: {
        pricePerSeat: 0,
        recommendedMaxSeats: 1,
        useCases: [
          "coding",
        ],
      },

      Pro: {
        pricePerSeat: 20,
        recommendedMinSeats: 2,
        recommendedMaxSeats: 5,
        useCases: [
          "coding",
        ],
      },

      Business: {
        pricePerSeat: 40,
        recommendedMinSeats: 6,
        recommendedMaxSeats: 25,
        useCases: [
          "coding",
          "team",
        ],
      },

      Enterprise: {
        pricePerSeat: 60,
        recommendedMinSeats: 26,
        useCases: [
          "enterprise",
          "coding",
        ],
      },

    },

  },

  "GitHub Copilot": {

    vendor: "GitHub",

    alternative: "Cursor",

    creditDiscount: 8,

    plans: {

      Individual: {
        pricePerSeat: 10,
        recommendedMaxSeats: 2,
        useCases: [
          "coding",
        ],
      },

      Business: {
        pricePerSeat: 19,
        recommendedMinSeats: 3,
        recommendedMaxSeats: 20,
        useCases: [
          "coding",
          "team",
        ],
      },

      Enterprise: {
        pricePerSeat: 39,
        recommendedMinSeats: 21,
        useCases: [
          "enterprise",
          "coding",
        ],
      },

    },

  },

  Gemini: {

    vendor: "Google",

    alternative: "ChatGPT",

    creditDiscount: 10,

    plans: {

      Pro: {
        pricePerSeat: 20,
        recommendedMaxSeats: 5,
        useCases: [
          "research",
          "data",
        ],
      },

      Ultra: {
        pricePerSeat: 40,
        recommendedMinSeats: 6,
        recommendedMaxSeats: 20,
        useCases: [
          "research",
          "mixed",
        ],
      },

      API: {
        pricePerSeat: 30,
        recommendedMinSeats: 1,
        useCases: [
          "data",
          "coding",
        ],
      },

    },

  },

  "Anthropic API": {

    vendor: "Anthropic",

    alternative: "OpenAI API",

    creditDiscount: 15,

    plans: {

      "API Direct": {
        pricePerSeat: 30,
        recommendedMinSeats: 1,
        useCases: [
          "coding",
          "data",
        ],
      },

    },

  },

  "OpenAI API": {

    vendor: "OpenAI",

    alternative: "Anthropic API",

    creditDiscount: 15,

    plans: {

      "API Direct": {
        pricePerSeat: 25,
        recommendedMinSeats: 1,
        useCases: [
          "coding",
          "data",
        ],
      },

    },

  },

  Windsurf: {

    vendor: "Windsurf",

    alternative: "Cursor",

    creditDiscount: 10,

    plans: {

      Free: {
        pricePerSeat: 0,
        recommendedMaxSeats: 1,
        useCases: [
          "coding",
        ],
      },

      Pro: {
        pricePerSeat: 15,
        recommendedMinSeats: 2,
        recommendedMaxSeats: 5,
        useCases: [
          "coding",
        ],
      },

      Teams: {
        pricePerSeat: 30,
        recommendedMinSeats: 6,
        recommendedMaxSeats: 20,
        useCases: [
          "coding",
          "team",
        ],
      },

      Enterprise: {
        pricePerSeat: 50,
        recommendedMinSeats: 21,
        useCases: [
          "enterprise",
        ],
      },

    },

  },

};