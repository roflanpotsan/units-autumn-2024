import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { getPrice } from '../../utils';
import { Product, PriceSymbol } from '../../types';

jest.mock('../../utils', () => ({
    getPrice: jest.fn(),
}));

describe('ProductCard', () => {
    const mockProduct: Product = {
        id: 1,
        name: 'IPhone 14 Pro',
        description: 'Latest iphone, buy it now',
        price: 999,
        priceSymbol: '$',
        category: 'Электроника',
        imgUrl: '/iphone.png',
    };

    beforeEach(() => {
        (getPrice as jest.Mock).mockImplementation(
            (price, symbol) => `${price} ${symbol}`
        );
    });

    it('should render product details correctly', () => {
        const { getByText, getByAltText } = render(
            <ProductCard {...mockProduct} />
        );

        expect(getByText(mockProduct.name)).toBeInTheDocument();
        expect(getByText(mockProduct.description)).toBeInTheDocument();
        expect(getByText('999 $')).toBeInTheDocument();
        expect(getByText(mockProduct.category)).toBeInTheDocument();
        expect(getByAltText(mockProduct.name)).toBeInTheDocument();
    });

    it('should call getPrice with correct arguments', () => {
        render(<ProductCard {...mockProduct} />);
        expect(getPrice).toHaveBeenCalledWith(
            mockProduct.price,
            mockProduct.priceSymbol
        );
    });

    it('should not render image if imgUrl is not provided', () => {
        const productWithoutImage = { ...mockProduct, imgUrl: undefined };
        const { queryByAltText } = render(
            <ProductCard {...productWithoutImage} />
        );
        expect(queryByAltText(mockProduct.name)).toBeNull();
    });

    it('should render image if imgUrl is provided', () => {
        const { getByAltText } = render(<ProductCard {...mockProduct} />);
        expect(getByAltText(mockProduct.name)).toHaveAttribute(
            'src',
            mockProduct.imgUrl
        );
    });

    it('should render price correctly with different price symbols', () => {
        const symbol: PriceSymbol = '₽';
        const productWithDifferentSymbol = {
            ...mockProduct,
            priceSymbol: symbol,
        };
        render(<ProductCard {...productWithDifferentSymbol} />);
        expect(getPrice).toHaveBeenCalledWith(mockProduct.price, '₽');
    });
});
