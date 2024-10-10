import { updateCategories } from '../updateCategories';
import type { Category } from '../../types';

describe('updateCategories with new category', () => {
    it('should add a category if it is not in the current categories', () => {
        const currentCategories: Category[] = ['Электроника', 'Одежда'];
        const changedCategory: Category = 'Для дома';
        const result = updateCategories(currentCategories, changedCategory);
        expect(result).toEqual(['Электроника', 'Одежда', 'Для дома']);
    });
});

describe('updateCategories with same category', () => {
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
});
