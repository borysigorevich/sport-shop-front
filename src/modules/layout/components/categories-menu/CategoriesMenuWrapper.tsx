import { getCategoriesList } from '@lib/data';
import CategoriesMenu from '@modules/layout/components/categories-menu/index';
import React from 'react';

export const CategoriesMenuWrapper = async () => {
	const { product_categories } = await getCategoriesList(0, 100, {
		include_descendants_tree: true,
	});

	const highLevelCategories = product_categories.filter(
		(category) => category.parent_category_id === null
	);

	return <CategoriesMenu categories={highLevelCategories} />;
};
