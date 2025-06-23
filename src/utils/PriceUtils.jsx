const formatPrice = (price) => {
  return `$${parseFloat(price).toFixed(2)}`;
};

export { formatPrice };