import { AttributesWrapper } from '@modules/categories/components/attributes/attributes-wrapper';
import { Categories } from '@modules/categories/components/categories';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { SkeletonProductFilters } from '@modules/skeletons/templates/skeleton-product-filters';
import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid';
import RefinementList from '@modules/store/components/refinement-list';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import PaginatedProducts from '@modules/store/templates/paginated-products';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { ProductCategoryWithChildren } from '../../../types/global';

export default async function CategoryTemplate({
	categories,
	sortBy,
	page,
	countryCode,
	searchParams,
}: {
	categories: ProductCategoryWithChildren[];
	sortBy?: SortOptions;
	page?: string;
	countryCode: string;
	searchParams: Record<string, string>;
}) {
	let attributesSearchParams = Array.isArray(searchParams['attributes[]'])
		? searchParams['attributes[]']
		: searchParams['attributes[]']
		? [searchParams['attributes[]']]
		: [];

	const pageNumber = page ? parseInt(page) : 1;

	const category = categories[categories.length - 1];
	const parents = categories.slice(0, categories.length - 1);

	if (!category || !countryCode) notFound();

	return (
		<div
			className="grid small:grid-cols-[2fr_8fr] small:items-start py-6 content-container gap-12 group"
			data-testid="category-container"
		>
			<div className={'grid'}>
				<Categories category={category} />

				<Suspense fallback={<SkeletonProductFilters />}>
					<AttributesWrapper attributesSearchParams={attributesSearchParams} />
				</Suspense>
			</div>

			<div className="w-full ">
				<div className="flex flex-row mb-4 text-2xl-semi gap-4">
					{parents &&
						parents.map((parent) => (
							<span key={parent.id} className="text-ui-fg-subtle">
								<LocalizedClientLink
									className="mr-4 hover:text-black"
									href={`/categories/${parent.handle}`}
									data-testid="sort-by-link"
								>
									{parent.name}
								</LocalizedClientLink>
								/
							</span>
						))}
					<div className={'flex items-center justify-between w-full'}>
						<h1 data-testid="category-page-title" className={'uppercase'}>
							{category.name}
						</h1>
						<RefinementList
							sortBy={sortBy || 'created_at'}
							data-testid="sort-by-container"
							className={'!m-0'}
						/>
					</div>
				</div>
				{category.description && (
					<div className="mb-8 text-base-regular">
						<p>{category.description}</p>
					</div>
				)}
				<Suspense fallback={<SkeletonProductGrid />}>
					<PaginatedProducts
						sortBy={sortBy || 'created_at'}
						page={pageNumber}
						categoryId={category.id}
						countryCode={countryCode}
						searchParams={searchParams}
					/>
				</Suspense>
			</div>
		</div>
	);
}
