import { UserProfile, StyleCapsuleProfile, WardrobePiece } from "./types";

export function generateFoundationalWardrobe(profile: UserProfile): StyleCapsuleProfile {
  const { skinTone, bodyType, gender } = profile;

  let seasonPalette = "Deep Autumn / Warm Earth";
  let contrastProfile = "Medium-High Contrast";
  let bestColors = ["Charcoal", "Dark Navy Blue", "Warm White / Ecru", "Olive Green", "Espresso Brown"];
  let avoidColors = ["Neon Yellow", "Pastel Pink", "Faded Washed Gray"];
  let silhouetteAdvice = "Structured shoulders with tapered leg lines to create a clean V-taper frame.";

  const lowerTone = (skinTone || "").toLowerCase();
  if (lowerTone.includes("cool") || lowerTone.includes("fair")) {
    seasonPalette = "Cool Winter / High Contrast";
    contrastProfile = "High Value Contrast";
    bestColors = ["Crisp True White", "Midnight Black", "Royal Navy", "Emerald Green", "Slate Gray"];
    avoidColors = ["Mustard Yellow", "Warm Beige", "Orange-Red"];
  } else if (lowerTone.includes("warm") || lowerTone.includes("olive") || lowerTone.includes("tan")) {
    seasonPalette = "Warm Autumn / Deep Earth";
    contrastProfile = "Rich Saturated Contrast";
    bestColors = ["Dark Navy", "Charcoal Gray", "Camel / Khaki", "Forest Olive", "Off-White / Cream"];
    avoidColors = ["Icy Blue", "Neon Green", "Pale Lilac"];
  } else if (lowerTone.includes("deep") || lowerTone.includes("dark")) {
    seasonPalette = "Deep Winter / Jewel Tones";
    contrastProfile = "Ultra-High Dynamic Contrast";
    bestColors = ["Cobalt Blue", "Crisp Pure White", "Onyx Black", "Rich Burgundy", "Deep Sage"];
    avoidColors = ["Muddy Brown", "Dusty Khaki"];
  }

  if (bodyType === "Lean" || bodyType === "Slim") {
    silhouetteAdvice = "Layered silhouettes (over-shirts, tailored jackets) with heavier weight fabrics (240gsm cotton, wool) to add depth without swimming in excess fabric.";
  } else if (bodyType === "Muscular" || bodyType === "Athletic") {
    silhouetteAdvice = "Tailored athletic taper. Avoid boxy cuts that bunch at the waist. Prioritize slight stretch in trousers and raglan or set-in shoulder tees.";
  } else if (bodyType === "Stocky") {
    silhouetteAdvice = "Vertical monocromatic visual lines. Single-breasted coats, dark lower layers, avoiding horizontal stripes or oversized cargo pockets.";
  }

  const generatedCapsule: WardrobePiece[] = [
    {
      id: "ward-1",
      name: `Heavyweight 250gsm Crewneck Tee in ${bestColors[0]}`,
      category: "Tops",
      recommendedColor: bestColors[0],
      priority: "Essential",
      purpose: "Daily foundational base layer with clean neckline that never sags.",
      budgetEst: "$35 - $50",
      matchingPalette: [bestColors[1], bestColors[2]],
      acquired: false,
    },
    {
      id: "ward-2",
      name: `Crisp Heavyweight Tee in ${bestColors[2]}`,
      category: "Tops",
      recommendedColor: bestColors[2],
      priority: "Essential",
      purpose: "High-contrast base for layering under jackets or overshirts.",
      budgetEst: "$35 - $50",
      matchingPalette: [bestColors[0], bestColors[3]],
      acquired: false,
    },
    {
      id: "ward-3",
      name: `Tailored Oxford Cloth Button-Down (OCBD) in ${bestColors[1]}`,
      category: "Tops",
      recommendedColor: bestColors[1],
      priority: "Essential",
      purpose: "Smart-casual staple that bridges casual remote work and investor/dinner events.",
      budgetEst: "$65 - $110",
      matchingPalette: [bestColors[0], bestColors[2]],
      acquired: false,
    },
    {
      id: "ward-4",
      name: `Minimalist Wool / Flannel Overshirt in ${bestColors[3] || "Deep Olive"}`,
      category: "Outerwear",
      recommendedColor: bestColors[3] || "Deep Olive",
      priority: "Essential",
      purpose: "Structured middle-layer adding frame density and instant elevated presence.",
      budgetEst: "$90 - $160",
      matchingPalette: [bestColors[0], bestColors[2]],
      acquired: false,
    },
    {
      id: "ward-5",
      name: "Tapered Selvedge Denim (Raw Indigo / Deep Black)",
      category: "Bottoms",
      recommendedColor: "Deep Indigo",
      priority: "Essential",
      purpose: "Universal leg line that pairs with boots, sneakers, and tailored jackets.",
      budgetEst: "$95 - $150",
      matchingPalette: [bestColors[0], bestColors[2]],
      acquired: false,
    },
    {
      id: "ward-6",
      name: `Pleated / Flat-Front Tapered Trousers in ${bestColors[0]}`,
      category: "Bottoms",
      recommendedColor: bestColors[0],
      priority: "Essential",
      purpose: "Elevated comfort trouser with drape that sharpens your silhouette.",
      budgetEst: "$80 - $130",
      matchingPalette: [bestColors[1], bestColors[2]],
      acquired: false,
    },
    {
      id: "ward-7",
      name: "Minimalist Italian Full-Grain Low-Top Leather Sneakers",
      category: "Footwear",
      recommendedColor: "Matte Crisp White",
      priority: "Essential",
      purpose: "Zero-logo, sleek sneaker that dresses up denim or pairs with trousers.",
      budgetEst: "$120 - $180",
      matchingPalette: [bestColors[0], bestColors[1]],
      acquired: false,
    },
    {
      id: "ward-8",
      name: "Goodyear-Welted Chelsea Boots or Derby Shoes in Dark Mocha",
      category: "Footwear",
      recommendedColor: "Dark Mocha / Onyx",
      priority: "Recommended",
      purpose: "Adds authority and durability for formal meetings, evenings, and travel.",
      budgetEst: "$160 - $240",
      matchingPalette: [bestColors[0], bestColors[1]],
      acquired: false,
    },
  ];

  return {
    seasonPalette,
    contrastProfile,
    silhouetteAdvice,
    bestColors,
    avoidColors,
    generatedCapsule,
  };
}
