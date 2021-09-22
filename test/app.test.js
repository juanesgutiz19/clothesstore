const { fileIsGreaterThan1MB } = require('../helpers/files-utils');
const { isNumeric, discountPercentageInBounds, isPositive } = require('../helpers/general-validator');
const { calculatePriceWithDiscount } = require('../helpers/products-utils');


describe('Fize size in bounds', () => {
    test('File greater than 1MB should return false', () => {
        const result = fileIsGreaterThan1MB(1000001);
        expect(result).toBe(true);
    });

    test('File less or equal than 1MB should return false', () => {
        const result = fileIsGreaterThan1MB(999999);
        expect(result).toBe(false);
    });
});

describe('Validation to do not allow string values when it should be numeric', () => {
    test("Price with a string value should return an error", () => {
        const result = () => {
            isNumeric('precio', 'a4343');
        };
        expect(result).toThrow("El valor de precio solo puede ser numérico");
      });
      test("DiscountPercentage with a numeric value should return a true", () => {
        const result = isNumeric('discountPercentage', 10);
        expect(result).toBe(true);
      });
});

describe('Validation discount percentage in bounds', () => {
    test("Discount percentage greater than 99 should return an error", () => {
        const result = () => {
            discountPercentageInBounds(101);
        };
        expect(result).toThrow("El porcentaje de descuento debe estar en el intervalo [0, 100)");
    });
    test("Discount percentage less than 0 should return an error", () => {
        const result = () => {
            discountPercentageInBounds(-1);
        };
        expect(result).toThrow("El porcentaje de descuento debe estar en el intervalo [0, 100)");
    });
    test("Discount percentage in the interval [0, 100) should return true", () => {
        const result = discountPercentageInBounds('discountPercentage', 10);
        expect(result).toBe(true);
    });
});

describe('Validation to do not allow negative values', () => {
    test("Negative value should return an error", () => {
        const result = () => {
            isPositive('precio', -1);
        };
        expect(result).toThrow("El valor de precio debe ser positivo");
      });
      test("Positive value should return a true", () => {
        const result = isPositive('precio', 124000);
        expect(result).toBe(true);
      });
});


describe('The discount percentage calculation is correct', () => {
    test('With a price of 555000 and a discount percentage of 15 the price with discount should be 471750', () => {
        const result = calculatePriceWithDiscount(555000,15);
        expect(result).toBe(471750);
    });
});