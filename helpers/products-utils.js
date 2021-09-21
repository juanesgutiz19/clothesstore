
const calculatePriceWithDiscount = ( price, discountPercentage ) => {
    const discountPrice = price - price * (discountPercentage / 100);
    return discountPrice;
};

const setDiscountPriceToProducts = ( products ) => {
    return products.map((p) => {
        p = p.toJSON(); 
        p.priceWithDiscount = calculatePriceWithDiscount(p.price, p.discountPercentage);
        return p;
    });
  };

module.exports = { setDiscountPriceToProducts }