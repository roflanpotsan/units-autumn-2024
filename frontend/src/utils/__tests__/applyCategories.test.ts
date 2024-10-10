import { applyCategories } from '../applyCategories';
import { Category } from '../../types';

import { productsMock as products } from '../../mocks/productMocks';

describe('applyCategories empty list of categories', () => {
    it('should return all products if no categories are specified', () => {
        const categories: Category[] = [];
        const result = applyCategories(products, categories);
        expect(result).toEqual(products);
    });
});

describe('applyCategories homeware category', () => {
    it('should return homewares if such category is specified', () => {
        const categories: Category[] = ['Для дома'];
        const result = applyCategories(products, categories);
        expect(result).toEqual([products[2]]);
    });
});

describe('applyCategories clothes category', () => {
    it('should return clother if such category is specified', () => {
        const categories: Category[] = ['Одежда'];
        const result = applyCategories(products, categories);
        expect(result).toEqual([products[1]]);
    });
});

describe('applyCategories electronics category', () => {
    it('should return only electronics if such category is specified', () => {
        const categories: Category[] = ['Электроника'];
        const result = applyCategories(products, categories);
        expect(result).toEqual([products[0], products[3]]);
    });
});

describe('applyCategories list of all categories', () => {
    it('should return items for multiple specified categories (Электроника, Для дома, Одежда)', () => {
        const categories: Category[] = ['Электроника', 'Для дома', 'Одежда'];
        const result = applyCategories(products, categories);
        expect(result).toEqual(products);
    });
});
