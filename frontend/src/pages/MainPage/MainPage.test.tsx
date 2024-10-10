import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainPage } from './MainPage';
import { applyCategories, getPrice, updateCategories } from '../../utils';
import '@testing-library/jest-dom';
import { productsMock as mockProducts } from '../../mocks/productMocks';

jest.mock('../../hooks', () => ({
    useCurrentTime: jest.fn(() => '12:00:00'),
    useProducts: jest.fn(() => mockProducts),
}));

describe('MainPage title', () => {
    it('should render the page title', () => {
        render(<MainPage />);
        const element = screen.getByText('VK Маркет');
        expect(element.tagName).toBe('H2');
        expect(element).toHaveClass('main-page__title');
    });
});

describe('MainPage timer', () => {
    it('should render the page title', () => {
        render(<MainPage />);
        const element = screen.getByText('12:00:00');
        expect(element.tagName).toBe('H3');
    });
});

describe('MainPage products no category', () => {
    it('should render all products with none selected categories', () => {
        const { getByText } = render(<MainPage />);

        const productOne = getByText('IPhone 14 Pro');
        const productTwo = getByText('Принтер');
        const productThree = getByText('Настольная лампа');
        const productFour = getByText('Костюм гуся');
        expect(productOne.tagName).toBe('H2');
        expect(productOne).toHaveClass('product-card__name');
        expect(productTwo.tagName).toBe('H2');
        expect(productTwo).toHaveClass('product-card__name');
        expect(productThree.tagName).toBe('H2');
        expect(productThree).toHaveClass('product-card__name');
        expect(productFour.tagName).toBe('H2');
        expect(productFour).toHaveClass('product-card__name');
    });
});

describe('MainPage products by category selection', () => {
    it('should render products based on the selected categories', () => {
        const { getByText } = render(<MainPage />);
        const electronicsCategory = screen.getAllByText('Электроника', {
            selector: 'div.categories__badge',
        })[0];
        fireEvent.click(electronicsCategory);

        const productOne = getByText('IPhone 14 Pro');
        const productTwo = getByText('Принтер');
        expect(productOne.tagName).toBe('H2');
        expect(productOne).toHaveClass('product-card__name');
        expect(productTwo.tagName).toBe('H2');
        expect(productTwo).toHaveClass('product-card__name');
    });
});

describe('MainPage category not selected', () => {
    it('not selected category should not have selected class', () => {
        render(<MainPage />);
        const electronicsCategory = screen.getAllByText('Электроника', {
            selector: 'div.categories__badge',
        })[0];
        expect(electronicsCategory).not.toHaveClass(
            'categories__badge_selected'
        );
    });
});

describe('MainPage category selected', () => {
    it('selected category should have selected class', () => {
        render(<MainPage />);
        const electronicsCategory = screen.getAllByText('Электроника', {
            selector: 'div.categories__badge',
        })[0];
        fireEvent.click(electronicsCategory);
        expect(electronicsCategory).toHaveClass('categories__badge_selected');
    });
});
