import { AttributesWrapper } from '@modules/categories/components/attributes/attributes-wrapper';
import { Categories } from '@modules/categories/components/categories';
import { CategoriesBreadcrumbsWrapper } from '@modules/categories/components/categories-breadcrumbs/categories-breadcrumbs-wrapper';
import { SkeletonCategoriesBreadcrumbs } from '@modules/skeletons/components/skeleton-categories-breadcrumbs';
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
	categoriesParamsCount
}: {
	categories: ProductCategoryWithChildren[];
	sortBy?: SortOptions;
	page?: string;
	countryCode: string;
	searchParams: Record<string, string>;
	categoriesParamsCount: number;
}) {
	let attributesSearchParams = Array.isArray(searchParams['attributes[]'])
		? searchParams['attributes[]']
		: searchParams['attributes[]']
		? [searchParams['attributes[]']]
		: [];

	const pageNumber = page ? parseInt(page) : 1;

	const category = categories.at(-1);

	if (!category || !countryCode) notFound();

	return (
		<div className="py-6 content-container  group" data-testid="category-container">
			<Suspense fallback={<SkeletonCategoriesBreadcrumbs categoriesCount={categoriesParamsCount} />}>
				<CategoriesBreadcrumbsWrapper />
			</Suspense>

			<div className={'grid small:grid-cols-[2fr_8fr] small:items-start gap-12'}>
				<div className={'grid'}>

					<Suspense fallback={<SkeletonProductFilters />}>

						<Categories category={category} />

						<AttributesWrapper
							attributesSearchParams={attributesSearchParams}
						/>
					</Suspense>
				</div>

				<div className="w-full ">
					<div className="flex flex-row mb-4 text-2xl-semi gap-4">
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
		</div>
	);
}
