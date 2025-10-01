// src/data/enrichmentData.ts

/**
 * Example enrichment dataset.
 * Replace with the fields actually used in your components (title, description, etc.)
 */

export type EnrichmentItem = {
  id: string;
  name: string;
  description: string;
  category?: string;
  value?: number;
};

export const enrichmentData: EnrichmentItem[] = [
  {
    id: "1",
    name: "Vitamin C",
    description: "Boosts immunity and supports skin health",
    category: "Vitamin",
    value: 100,
  },
  {
    id: "2",
    name: "Iron",
    description: "Essential for blood and energy levels",
    category: "Mineral",
    value: 50,
  },
  {
    id: "3",
    name: "Fiber",
    description: "Supports digestion and overall health",
    category: "Nutrient",
    value: 30,
  },
];
