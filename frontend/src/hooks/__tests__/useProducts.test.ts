import { useProducts } from '../useProducts';
import type { Product } from '../../types';

describe('useProducts', () => {
    it('should have valid price and category for all products', () => {
        const products: Product[] = useProducts();

        products.forEach((product) => {
            expect(typeof product.price).toBe('number');
            expect(typeof product.category).toBe('string');
        });
    });
});
