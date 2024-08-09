import InteractiveLink from '@modules/common/components/interactive-link';
import Accordion from '@modules/products/components/product-tabs/accordion';
import React from 'react';
import { ProductCategoryWithChildren } from '../../../../types/global';

type CategoriesProps = {
	category: ProductCategoryWithChildren;
};

export const Categories = ({ category }: CategoriesProps) => {
	if (!category.category_children?.length) return null;

	return (
		<Accordion type={'multiple'}>
			<Accordion.Item
				title={category.name}
				headingSize="medium"
				value={category.id}
				className={'first:border-t-0 pt-2'}
				headerTitleClassName={'text-lg font-semibold text-black text-start tracking-wider'}
			>
				<div className={'pt-2 grid gap-4 pl-1'}>
					{category.category_children.map((child) => (
						<InteractiveLink
							key={child.id}
							href={`/categories/${child.handle}`}
							data-testid="sort-by-link"
						>
							{child.name}
						</InteractiveLink>
					))}
				</div>
			</Accordion.Item>
		</Accordion>
	);
};
