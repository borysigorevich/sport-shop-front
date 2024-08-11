import { getCategoryByHandle, listCategories, listRegions } from '@lib/data';
import CategoryTemplate from '@modules/categories/templates';
import { SortOptions } from '@modules/store/components/refinement-list/sort-products';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductCategoryWithChildren } from '../../../../../types/global';

type Props = {
	params: { category: string[]; countryCode: string };
	searchParams: {
		sortBy?: SortOptions;
		page?: string;
	};
};

const generatePaths = (categories: ProductCategoryWithChildren[]) => {
	const paths: string[][] = [];

	const traverse = (
		category: ProductCategoryWithChildren,
		parentPath: string[] = []
	) => {
		const currentPath = [...parentPath, category.handle];
		paths.push(currentPath);

		for (const child of category.category_children) {
			traverse(child, currentPath);
		}
	};

	for (const category of categories) {
		traverse(category);
	}

	return paths;
};

export async function generateStaticParams() {
	const product_categories = await listCategories({ include_descendants_tree: true });

	if (!product_categories) {
		return [];
	}

	const countryCodes = await listRegions().then((regions) =>
		regions?.map((r) => r.countries.map((c) => c.iso_2)).flat()
	);

	const categoryHandles = generatePaths(
		product_categories.filter((category) => category.parent_category_id === null)
	);

	const staticParams = countryCodes
		?.map((countryCode) =>
			categoryHandles.map((handle) => ({
				countryCode,
				category: handle,
			}))
		)
		.flat();

	return staticParams;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	try {
		const { product_categories } = await getCategoryByHandle([
			params.category.at(-1) as string,
		]).then((product_categories) => product_categories);

		const title = product_categories.map((category) => category.name).join(' | ');

		const description =
			product_categories[product_categories.length - 1].description ??
			`${title} category.`;

		return {
			title: `${title} | Ya Ye Whey Store`,
			description,
			alternates: {
				canonical: `${params.category.join('/')}`,
			},
		};
	} catch (error) {
		notFound();
	}
}

export default async function CategoryPage({ params, searchParams }: Props) {
	const { sortBy, page, ...rest } = searchParams;

	const { product_categories } = await getCategoryByHandle(
		[params.category.at(-1) as string],
		{ include_descendants_tree: true }
	).then((product_categories) => product_categories);

	if (!product_categories) {
		notFound();
	}

	return (
		<CategoryTemplate
			categories={product_categories}
			sortBy={sortBy}
			page={page}
			countryCode={params.countryCode}
			categoryParams={params.category}
			searchParams={rest}
		/>
	);
}
