import { getCategoryByHandle } from "@lib/data"
import { CategoriesBreadcrumbs } from "@modules/categories/components/categories-breadcrumbs/index"
import { notFound } from "next/navigation"
import React from 'react';
import { ProductCategoryWithChildren } from '../../../../types/global';

type CategoriesBreadcrumbsWrapperProps = {
	category?: ProductCategoryWithChildren;
	categoryParams?: string;
};

export const CategoriesBreadcrumbsWrapper = async ({
	category,
	categoryParams,
}: CategoriesBreadcrumbsWrapperProps) => {
	let resultCategory = category;

	if (!resultCategory && categoryParams) {
		resultCategory = await getCategoryByHandle([categoryParams], {
			include_descendants_tree: true,
		}).then((response) => response.product_categories?.[0]);
	}

	if (!resultCategory) {
		return notFound();
	}

	return <CategoriesBreadcrumbs category={resultCategory} />;
};
