export const formatCurrency = (amount: number) => {
    if (isNaN(amount) || amount === 0) {
      return "$0";
    }
  
    const options: Intl.NumberFormatOptions = {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2, // Show decimals only if needed
      maximumFractionDigits: 2, // Limit to 2 decimal places
    };
  
    return amount.toLocaleString("en-US", options);
  };
  