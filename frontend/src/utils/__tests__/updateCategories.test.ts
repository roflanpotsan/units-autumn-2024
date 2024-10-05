import { updateCategories } from '../updateCategories';
import type { Category } from '../../types';

describe('updateCategories', () => {
    it('should add a category if it is not in the current categories', () => {
        const currentCategories: Category[] = ['Электроника', 'Одежда'];
        const changedCategory: Category = 'Для дома';
        const result = updateCategories(currentCategories, changedCategory);
        expect(result).toEqual(['Электроника', 'Одежда', 'Для дома']);
    });

    it('should remove a category if it is already in the current categories', () => {
        const currentCategories: Category[] = [
            'Электроника',
            'Одежда',
            'Для дома',
        ];
        const changedCategory: Category = 'Одежда';
        const result = updateCategories(currentCategories, changedCategory);
        expect(result).toEqual(['Электроника', 'Для дома']);
    });

    it('should return the same array if no categories are added or removed', () => {
        const currentCategories: Category[] = [];
        const changedCategory: Category = 'Электроника';
        const result = updateCategories(currentCategories, changedCategory);
        expect(result).toEqual(['Электроника']);
    });
});
