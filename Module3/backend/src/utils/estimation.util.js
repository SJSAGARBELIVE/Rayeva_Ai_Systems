// src/utils/estimation.util.js

export const calculatePlasticSaved = (items) => {
  return items.length * 50; // grams
};

export const calculateCarbonSaved = (items) => {
  return items.length * 0.2; // kg CO2
};