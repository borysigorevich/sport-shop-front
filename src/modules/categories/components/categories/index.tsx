import LocalizedClientLink from '@modules/common/components/localized-client-link';
import Accordion from '@modules/products/components/product-tabs/accordion';
import React from 'react';
import { ProductCategoryWithChildren } from '../../../../types/global';

type CategoriesProps = {
	category: ProductCategoryWithChildren;
};

export const Categories = ({ category }: CategoriesProps) => {
	if (!category.category_children?.length) return null;

	console.log({ categoriesChildren: category.category_children }, '***');

	return (
		<Accordion type={'multiple'} defaultValue={[category.id]}>
			<Accordion.Item
				title={category.name}
				headingSize="medium"
				value={category.id}
				className={'first:border-t-0 pt-2'}
				headerTitleClassName={
					'text-lg font-semibold text-black text-start tracking-wider uppercase'
				}
			>
				<div className={'pt-2 grid gap-4 pl-1'}>
					{category.category_children.map((child) => {
						return (
							<LocalizedClientLink
								className={
									'text-black txt-compact-medium hover:underline'
								}
								key={child.id}
								href={`/categories/${child.handle}`}
								data-testid="sort-by-link"
							>
								{child.name}
							</LocalizedClientLink>
						);
					})}
				</div>
			</Accordion.Item>
		</Accordion>
	);
};
