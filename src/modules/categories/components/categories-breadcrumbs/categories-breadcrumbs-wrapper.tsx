import { listCategories } from "@lib/data"
import { CategoriesBreadcrumbs } from '@modules/categories/components/categories-breadcrumbs/index';
import React, { memo } from "react"

export const CategoriesBreadcrumbsWrapper = memo(async function CategoriesBreadcrumbsWrapper() {
	const categories = await listCategories({ include_descendants_tree: true });

	return <CategoriesBreadcrumbs categories={categories} />;
});
