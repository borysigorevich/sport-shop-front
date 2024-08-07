import SkeletonProductGrid from '@modules/skeletons/templates/skeleton-product-grid';
import RefinementList from '@modules/store/components/refinement-list';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import { Suspense } from 'react';

import PaginatedProducts from './paginated-products';

const StoreTemplate = ({
	sortBy,
	page,
	countryCode,
	searchParams,
}: {
	sortBy?: SortOptions;
	page?: string;
	countryCode: string;
	searchParams: Record<string, string>;
}) => {
	const pageNumber = page ? parseInt(page) : 1;

	return (
		<div
			className="flex flex-col small:flex-row small:items-start py-6 content-container"
			data-testid="category-container"
		>
			<div>
				<RefinementList sortBy={sortBy || 'created_at'} />
			</div>
			<div className="w-full">
				<div className="mb-8 text-2xl-semi">
					<h1 data-testid="store-page-title">All products</h1>
				</div>
				<Suspense fallback={<SkeletonProductGrid />}>
					<PaginatedProducts
						sortBy={sortBy || 'created_at'}
						page={pageNumber}
						countryCode={countryCode}
						searchParams={searchParams}
					/>
				</Suspense>
			</div>
		</div>
	);
};

export default StoreTemplate;
