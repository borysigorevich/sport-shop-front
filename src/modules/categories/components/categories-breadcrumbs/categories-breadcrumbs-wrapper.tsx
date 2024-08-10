import { getCategoriesList } from '@lib/data';
import { CategoriesBreadcrumbs } from '@modules/categories/components/categories-breadcrumbs/index';
import React from 'react';

export const CategoriesBreadcrumbsWrapper = async () => {
	const { product_categories } = await getCategoriesList(0, 100);

	return <CategoriesBreadcrumbs categories={product_categories} />;
};
