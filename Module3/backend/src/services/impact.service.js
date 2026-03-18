// src/services/impact.service.js

import Impact from "../models/impact.model.js";
import { calculatePlasticSaved, calculateCarbonSaved } from "../utils/estimation.util.js";
import { generateAISummary } from "./gemin.service.js";

export const generateImpactReport = async (order) => {
  const plasticSaved = calculatePlasticSaved(order.items);
  const carbonSaved = calculateCarbonSaved(order.items);

  const localImpact = "Supports local vendors and reduces transport emissions";

  const aiSummary = await generateAISummary({
    plasticSaved,
    carbonSaved,
    localImpact
  });

  const impact = await Impact.create({
    orderId: order.orderId,
    plasticSaved,
    carbonSaved,
    localImpact,
    aiSummary
  });

  return impact;
};