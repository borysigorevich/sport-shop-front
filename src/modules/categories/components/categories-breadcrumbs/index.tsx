import { getCategoryByHandle } from '@lib/data';
import { cn } from '@lib/util/cn';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import React from 'react';
import { ProductCategoryWithChildren } from '../../../../types/global';

type CategoriesBreadcrumbsProps = {
	category: ProductCategoryWithChildren;
	categoriesParams: string[];
};

export const CategoriesBreadcrumbs = async ({
	category,
	categoriesParams,
}: CategoriesBreadcrumbsProps) => {
	const pathNames = categoriesParams;

	const categoriesNames = new Map([[category.handle, category.name]]);

	if (category.parent_category) {
		categoriesNames.set(
			category.parent_category.handle,
			category.parent_category.name
		);

		if (category.parent_category?.parent_category_id) {
			const parentCategory = await getCategoryByHandle([
				category.parent_category.handle,
			]).then((result) => result.product_categories[0]);
			categoriesNames.set(parentCategory.handle, parentCategory.name);
		}
	}

	return (
		<div className={'mb-3'}>
			<ul className={'flex items-center flex-wrap gap-2 pl-1'}>
				<li className={'text-black text-[13px] underline hover:text-red-base'}>
					<LocalizedClientLink href={`/`}>Ya Ye Whey</LocalizedClientLink>
				</li>
				<span className={'lg:block'}>{pathNames.length > 0 && ' / '}</span>
				{pathNames.map((link, index) => {
					let href = `/categories/${pathNames.slice(0, index + 1).join('/')}`;

					const linkName = categoriesNames.get(link) || link;

					return (
						<React.Fragment key={index}>
							<li
								className={cn(
									'text-black text-[13px] truncate',
									link !== pathNames.at(-1)
										? 'underline hover:text-red-base'
										: 'pointer-events-none'
								)}
							>
								<LocalizedClientLink href={href}>
									{linkName}
								</LocalizedClientLink>
							</li>
							<span className={' lg:block'}>
								{pathNames.length !== index + 1 && ' / '}
							</span>
						</React.Fragment>
					);
				})}
			</ul>
		</div>
	);
};
