'use client';

import { Select } from '@medusajs/ui';

export type SortOptions = 'price_asc' | 'price_desc' | 'created_at';

type SortProductsProps = {
	sortBy: SortOptions;
	setQueryParams: (name: string, value: SortOptions) => void;
	'data-testid'?: string;
};

const sortOptions = [
	{
		value: 'created_at',
		label: 'Latest Arrivals',
	},
	{
		value: 'price_asc',
		label: 'Price: Low -> High',
	},
	{
		value: 'price_desc',
		label: 'Price: High -> Low',
	},
];

const SortProducts = ({
	'data-testid': dataTestId,
	sortBy,
	setQueryParams,
}: SortProductsProps) => {
	const handleChange = (value: string) => {
		const newSortBy = value as SortOptions;
		setQueryParams('sortBy', newSortBy);
	};

	return (
		<div className="flex gap-3 items-center">
			<span className={'min-w-fit text-sm'}>Sort By:</span>
			{/*@ts-ignore*/}
			<Select onValueChange={handleChange} value={sortBy}>
				<Select.Trigger className={'h-8 min-w-[175px]'}>
					<Select.Value placeholder="Select a currency" />
				</Select.Trigger>
				<Select.Content>
					{sortOptions.map((item) => (
						<Select.Item key={item.value} value={item.value}>
							{item.label}
						</Select.Item>
					))}
				</Select.Content>
			</Select>
		</div>
	);
};

export default SortProducts;
