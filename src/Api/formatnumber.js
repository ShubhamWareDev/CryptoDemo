export const formatLargeNumber = (value) => {
  if (value >= 1e12) {
    return (value / 1e12).toFixed(2) + " Trillion"; // For Trillions
  } else if (value >= 1e9) {
    return (value / 1e9).toFixed(2) + " Billion"; // For Billions
  } else if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + " Million"; // For Millions
  } else {
    return value.toLocaleString(); // For smaller values, format as is
  }
};
