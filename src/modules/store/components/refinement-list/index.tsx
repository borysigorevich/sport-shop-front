'use client';

import { cn } from '@lib/util/cn';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useOptimistic, useState, useTransition } from 'react';

import SortProducts, { SortOptions } from './sort-products';

const FilterToggle = () => {
	const [filterToggleButtonText, setFilterToggleButtonText] =
		useState<string>('Hide filter');

	const handleFilterToggleDesktop = () => {
		const filtersButton = document.querySelector(
			'#show-filters-button'
		) as HTMLButtonElement;
		const showFilter = filtersButton.dataset.showState === 'show';
		setFilterToggleButtonText(showFilter ? 'Show Filter' : 'Hide Filter');
		filtersButton.click();
	};

	const handleFilterToggleMobile = () => {
		const filtersButton = document.querySelector(
			'#filter-popover-trigger-button'
		) as HTMLButtonElement;
		filtersButton.click();
	};

	return (
		<>
			<button className={'text-sm lg:hidden'} onClick={handleFilterToggleMobile}>
				Show Filters
			</button>

			<button
				className={'text-sm hidden lg:block'}
				onClick={handleFilterToggleDesktop}
			>
				{filterToggleButtonText}
			</button>
		</>
	);
};

type RefinementListProps = {
	sortBy: SortOptions;
	search?: boolean;
	'data-testid'?: string;
	className?: string;
};

const RefinementList = ({
	sortBy,
	'data-testid': dataTestId,
	className,
}: RefinementListProps) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [optimisticSortBy, setOptimisticSortBy] = useOptimistic(sortBy);
	const [isPending, startTransition] = useTransition();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const setQueryParams = (name: string, value: string) => {
		const query = createQueryString(name, value);
		startTransition(() => {
			setOptimisticSortBy(value as SortOptions);
			router.push(`${pathname}?${query}`);
		});
	};

	return (
		<div
			className={cn(
				'grid grid-cols-[auto_auto_auto] py-4 mb-8 small:px-0 pl-6 small:ml-[1.675rem]',
				className
			)}
			data-sort-by-pending={isPending ? '' : undefined}
		>
			<FilterToggle/>

			<div
				className={
					'w-px h-[60%] ml-4 mr-2.5 bg-gray-300 relative top-1/2 -translate-y-1/2'
				}
			/>
			<SortProducts
				sortBy={optimisticSortBy}
				setQueryParams={setQueryParams}
				data-testid={dataTestId}
			/>
		</div>
	);
};

export default RefinementList;
