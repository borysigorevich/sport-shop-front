import { getProductsListWithSort, getRegion } from '@lib/data';
import ProductPreview from '@modules/products/components/product-preview';
import { Pagination } from '@modules/store/components/pagination';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';

const PRODUCT_LIMIT = 12;

type PaginatedProductsParams = {
	limit: number;
	collection_id?: string[];
	category_id?: string[];
	id?: string[];
};

export default async function PaginatedProducts({
	sortBy,
	page,
	collectionId,
	categoryId,
	productsIds,
	countryCode,
	searchParams,
}: {
	sortBy?: SortOptions;
	page: number;
	collectionId?: string;
	categoryId?: string;
	productsIds?: string[];
	countryCode: string;
	searchParams?: Record<string, string>;
}) {
	const region = await getRegion(countryCode);

	if (!region) {
		return null;
	}

	const queryParams: PaginatedProductsParams = {
		limit: PRODUCT_LIMIT,
	};

	if (collectionId) {
		queryParams['collection_id'] = [collectionId];
	}

	if (categoryId) {
		queryParams['category_id'] = [categoryId];
	}

	if (productsIds) {
		queryParams['id'] = productsIds;
	}

	if (searchParams) {
		Object.keys(searchParams).forEach((key) => {
			// @ts-ignore
			queryParams[key] = searchParams[key];
		});
	}

	const {
		response: { products, count },
	} = await getProductsListWithSort({
		page,
		queryParams,
		sortBy,
		countryCode,
	});

	const totalPages = Math.ceil(count / PRODUCT_LIMIT);

	return (
		<>
			<ul
				className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8 group-has-[[data-attributes-pending]]:animate-pulse group-has-[[data-attributes-pending]]:pointer-events-none
								group-has-[[data-sort-by-pending]]:animate-pulse group-has-[[data-sort-by-pending]]:pointer-events-none"
				data-testid="products-list"
			>
				{products.map((p) => {
					return (
						<li key={p.id}>
							<ProductPreview productPreview={p} region={region} />
						</li>
					);
				})}
			</ul>
			{totalPages > 1 && (
				<Pagination
					data-testid="product-pagination"
					page={page}
					totalPages={totalPages}
				/>
			)}
		</>
	);
}
