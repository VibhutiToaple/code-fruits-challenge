// src/data/enrichmentData.ts

/** 
 * Example enrichment dataset used by panels/lists. 
 * Adjust shape as per your project needs. 
 */
export type EnrichmentItem = {
  id: string;
  name: string;
  category: string;
  value: number;
};

export const enrichmentData: EnrichmentItem[] = [
  { id: "e1", name: "Vitamin C", category: "Vitamin", value: 100 },
  { id: "e2", name: "Iron", category: "Mineral", value: 50 },
  { id: "e3", name: "Fiber", category: "Nutrient", value: 30 },
];
