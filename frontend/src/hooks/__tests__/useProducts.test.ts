import { useProducts } from '../useProducts';
import type { Product } from '../../types';

import { productsMock } from '../../mocks/productMocks';

describe('useProducts hook test', () => {
    it('should return products', () => {
        const products: Product[] = useProducts();
        expect(products).toEqual(productsMock);
    });
});
