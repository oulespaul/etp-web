export const formatNumber = (amount, digit = 2) => {
  const number = Number.parseFloat(amount);
  if (Number.isNaN(number)) {
    return "0.00";
  }

  return number.toLocaleString("th-TH", {
    minimumFractionDigits: digit,
    maximumFractionDigits: digit,
  });
};
