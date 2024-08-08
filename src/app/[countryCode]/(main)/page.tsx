import { getRegion, listCategories } from '@lib/data';
import { CategoryPreview } from '@modules/categories/components/category-preview';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Ya Ye Whey',
	description: 'Sport Nutrition, Vitamins, Supplements, and more.',
};

const baseUri = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL + '/uploads/';

const imagesConfig = {
	protein: baseUri + '1723033866232-1-s.webp',
	'vitamins-supplements': baseUri + '1723040819906-3-s.jpg',
} as const;

export default async function Home({
	params: { countryCode },
}: {
	params: { countryCode: string };
}) {
	const categories = await listCategories();

	const region = await getRegion(countryCode);

	if (!categories || !region) {
		return null;
	}

	return (
		<>
			<div className="p-4 md:p-12">
				<ul className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] gap-x-6">
					{categories.map((category) => {
						return (
							<CategoryPreview
								key={category.id}
								handle={category.handle}
								title={category.name}
								thumbnail={
									imagesConfig[
										category.handle as keyof typeof imagesConfig
									]
								}
							/>
						);
					})}
				</ul>
			</div>
		</>
	);
}
