import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MainPage } from './MainPage';
import { useCurrentTime, useProducts } from '../../hooks';
import { applyCategories, updateCategories } from '../../utils';
import { Categories, ProductCard } from '../../components';
import '@testing-library/jest-dom';
import { Category } from '../../types';

// Замокаем хуки и утилиты
jest.mock('../../hooks', () => ({
    useCurrentTime: jest.fn(),
    useProducts: jest.fn(),
}));

jest.mock('../../utils', () => ({
    applyCategories: jest.fn(),
    updateCategories: jest.fn(),
}));

jest.mock('../../components', () => ({
    Categories: jest.fn(),
    ProductCard: jest.fn(),
}));

describe('MainPage', () => {
    const mockProducts = [
        {
            id: 1,
            name: 'IPhone 14 Pro',
            description: 'Latest iphone, buy it now',
            price: 999,
            category: 'Электроника',
        },
        {
            id: 2,
            name: 'Костюм гуся',
            description: 'Запускаем гуся, работяги',
            price: 1000,
            category: 'Одежда',
        },
        {
            id: 3,
            name: 'Настольная лампа',
            description: 'Говорят, что ее использовали в pixar',
            price: 699,
            category: 'Для дома',
        },
        {
            id: 4,
            name: 'Принтер',
            description: 'Незаменимая вещь для студента',
            price: 7000,
            category: 'Электроника',
        },
    ];

    const mockCategories = ['Электроника', 'Одежда', 'Для дома'];

    beforeEach(() => {
        // Мокаем хуки и утилиты перед каждым тестом
        (useCurrentTime as jest.Mock).mockReturnValue('12:00:00');
        (useProducts as jest.Mock).mockReturnValue(mockProducts);
        (applyCategories as jest.Mock).mockReturnValue(mockProducts);
        (updateCategories as jest.Mock).mockImplementation(
            (selected, clicked) => [...selected, clicked]
        );

        (Categories as jest.Mock).mockImplementation(
            ({ selectedCategories, onCategoryClick }) => (
                <div>
                    {mockCategories.map((category) => (
                        <div
                            key={category}
                            className={`categories__badge ${
                                selectedCategories.includes(category)
                                    ? 'categories__badge_selected'
                                    : ''
                            }`}
                            onClick={() => onCategoryClick(category)}
                        >
                            {category}
                        </div>
                    ))}
                </div>
            )
        );

        (ProductCard as jest.Mock).mockImplementation(({ name }) => (
            <div>{name}</div>
        ));
    });

    it('should render the page title and current time', () => {
        render(<MainPage />);
        expect(screen.getByText('VK Маркет')).toBeInTheDocument();
        expect(screen.getByText('12:00:00')).toBeInTheDocument();
    });

    it('should render products based on the selected categories', () => {
        render(<MainPage />);

        // Ожидаем, что продукты отрисованы
        expect(screen.getByText('IPhone 14 Pro')).toBeInTheDocument();
        expect(screen.getByText('Принтер')).toBeInTheDocument();

        // Проверяем, что была вызвана утилита для фильтрации продуктов
        const categories: Category[] = [];
        expect(applyCategories).toHaveBeenCalledWith(mockProducts, categories);
    });

    it('should update the selected categories when a category is clicked', () => {
        render(<MainPage />);

        const categoryButton = screen.getByText('Электроника');
        expect(categoryButton).not.toHaveClass('categories__badge_selected');
        fireEvent.click(categoryButton);

        expect(updateCategories).toHaveBeenCalledWith([], 'Электроника');
        expect(categoryButton).toHaveClass('categories__badge_selected');
    });

    it('should render filtered products when categories are selected', () => {
        (applyCategories as jest.Mock).mockReturnValue([
            mockProducts[0],
            mockProducts[3],
        ]);

        render(<MainPage />);

        const categoryButton = screen.getByText('Электроника');
        fireEvent.click(categoryButton);

        expect(screen.getByText('IPhone 14 Pro')).toBeInTheDocument();
        expect(screen.getByText('Принтер')).toBeInTheDocument();
        expect(screen.queryByText('Костюм гуся')).not.toBeInTheDocument();
        expect(screen.queryByText('Настольная лампа')).not.toBeInTheDocument();
    });
});
