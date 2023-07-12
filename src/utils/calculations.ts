export const calculateGainOrLoss = (buyPrice: number, sellPrice: number): number => {
  const gainOrLoss = ((sellPrice - buyPrice) / buyPrice) * 100;
  return Math.round(gainOrLoss * 100) / 100;  // Rounding to 2 decimal places
};
