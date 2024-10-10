import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard';
import { getPrice } from '../../utils';
import { PriceSymbol } from '../../types';
import { productMock as mockProduct } from '../../mocks/productMocks';

jest.mock('../../utils', () => ({
    getPrice: jest.fn(),
}));

beforeEach(() => {
    jest.mocked(getPrice).mockImplementation(
        (price, symbol) => `${price} ${symbol}`
    );
});

describe('Rendering product name', () => {
    it('should render product name correctly', () => {
        const { getByText } = render(<ProductCard {...mockProduct} />);
        const element = getByText(mockProduct.name);
        expect(element.tagName).toBe('H2');
        expect(element).toHaveClass('product-card__name');
    });
});

describe('Rendering product description', () => {
    it('should render product description correctly', () => {
        const { getByText } = render(<ProductCard {...mockProduct} />);
        const element = getByText(mockProduct.description);
        expect(element.tagName).toBe('DIV');
        expect(element).toHaveClass('product-card__description');
    });
});

describe('Rendering product price', () => {
    it('should render product price correctly', () => {
        const { getByText } = render(<ProductCard {...mockProduct} />);
        const productPrice = getPrice(
            mockProduct.price,
            mockProduct.priceSymbol
        );
        const element = getByText(productPrice);
        expect(element.tagName).toBe('H1');
        expect(element).toHaveClass('product-card__price');
    });
});

describe('Rendering product category', () => {
    it('should render product category correctly', () => {
        const { getByText } = render(<ProductCard {...mockProduct} />);
        const element = getByText(mockProduct.category);
        expect(element.tagName).toBe('DIV');
        expect(element).toHaveClass('product-card__category');
    });
});

describe('Rendering product alt name', () => {
    it('should render product name correctly', () => {
        const { getByAltText } = render(<ProductCard {...mockProduct} />);
        const element = getByAltText(mockProduct.name);
        expect(element.tagName).toBe('IMG');
        expect(element).toHaveClass('product-card__image');
    });
});

describe('At render product price function call', () => {
    it('should call getPrice with correct arguments', () => {
        render(<ProductCard {...mockProduct} />);
        expect(getPrice).toHaveBeenCalledWith(
            mockProduct.price,
            mockProduct.priceSymbol
        );
    });
});

describe('Render IMG tag if no image url was provided', () => {
    it('should not render image if imgUrl is not provided', () => {
        const productWithoutImage = { ...mockProduct, imgUrl: undefined };
        const { queryByAltText } = render(
            <ProductCard {...productWithoutImage} />
        );
        const element = queryByAltText(mockProduct.name);
        expect(element).toBeNull();
    });
});

describe('Render IMG tag if image url was provided', () => {
    it('should render image if imgUrl is provided', () => {
        const { getByAltText } = render(<ProductCard {...mockProduct} />);
        const element = getByAltText(mockProduct.name);
        expect(element.tagName).toBe('IMG');
        expect(element).toHaveAttribute('src', mockProduct.imgUrl);
    });
});

describe('Render different price symbols', () => {
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
