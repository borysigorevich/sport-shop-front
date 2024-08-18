'use client';

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import { ChevronDown } from 'lucide-react';

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

	const labelToShow = sortOptions.find((option) => option.value === sortBy)?.label;

	return (
		<div className="flex gap-3 items-center">
			<Listbox
				as={'div'}
				className={'flex items-center gap-3'}
				value={sortBy}
				onChange={handleChange}
			>
				<div className="relative">
					<ListboxButton className="group min-w-fit relative w-full flex items-center gap-2 cursor-pointer bg-white p-1.5 text-left text-gray-900 focus:outline-none focus-visible:ring-1 focus-visible:ring-black/15 text-sm sm:leading-6">
						<span className="block truncate">{labelToShow}</span>
						<ChevronDown
							className={'transition group-data-[open]:rotate-180'}
							size={'18px'}
						/>
					</ListboxButton>

					<ListboxOptions
						transition
						modal={false}
						className="absolute z-10 -left-8 lg:-left-5 mt-1 max-h-60 min-w-fit overflow-auto bg-white py-1 text-base shadow-popover ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
					>
						{sortOptions.map((option) => (
							<ListboxOption
								key={option.value}
								value={option.value}
								className="group relative cursor-pointer select-none py-2 pl-3 pr-9 text-black data-[focus]:bg-red-base data-[focus]:text-white min-w-fit"
							>
								<span className="block truncate font-normal group-data-[selected]:font-semibold">
									{option.label}
								</span>

								<span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden"></span>
							</ListboxOption>
						))}
					</ListboxOptions>
				</div>
			</Listbox>
		</div>
	);
};

export default SortProducts;
