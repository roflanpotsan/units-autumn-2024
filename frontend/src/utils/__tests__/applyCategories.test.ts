import { applyCategories } from '../applyCategories';
import { Category, Product } from '../../types';

describe('applyCategories function test', () => {
    const products: Product[] = [
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

    it('should return all products if no categories are specified', () => {
        const categories: Category[] = [];
        const result = applyCategories(products, categories);
        expect(result).toEqual(products);
    });

    it('should return only electronics if such category is specified', () => {
        const categories: Category[] = ['Электроника'];
        const result = applyCategories(products, categories);
        expect(result).toEqual([
            {
                id: 1,
                name: 'IPhone 14 Pro',
                description: 'Latest iphone, buy it now',
                price: 999,
                category: 'Электроника',
            },
            {
                id: 4,
                name: 'Принтер',
                description: 'Незаменимая вещь для студента',
                price: 7000,
                category: 'Электроника',
            },
        ]);
    });

    it('should return clothes if such category is specified', () => {
        const categories: Category[] = ['Для дома'];
        const result = applyCategories(products, categories);
        expect(result).toEqual([
            {
                id: 3,
                name: 'Настольная лампа',
                description: 'Говорят, что ее использовали в pixar',
                price: 699,
                category: 'Для дома',
            },
        ]);
    });

    it('should return homewares if such category is specified', () => {
        const categories: Category[] = ['Одежда'];
        const result = applyCategories(products, categories);
        expect(result).toEqual([
            {
                id: 2,
                name: 'Костюм гуся',
                description: 'Запускаем гуся, работяги',
                price: 1000,
                category: 'Одежда',
            },
        ]);
    });

    it('should return items for multiple specified categories (Электроника, Для дома, Одежда)', () => {
        const categories: Category[] = ['Электроника', 'Для дома', 'Одежда'];
        const result = applyCategories(products, categories);
        expect(result).toEqual([
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
        ]);
    });
});
