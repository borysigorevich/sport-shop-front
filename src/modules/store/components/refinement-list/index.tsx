'use client';

import { cn } from '@lib/util/cn';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useLayoutEffect, useOptimistic, useTransition } from "react"

import SortProducts, { SortOptions } from './sort-products';

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
	const [isPending, startTransition] = useTransition()

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
		})
	};

	useLayoutEffect(() => {
		startTransition(() => {
			if(sortBy !== optimisticSortBy){
				setOptimisticSortBy(sortBy)
			}
		})
	}, [sortBy])

	return (
		<div
			className={cn(
				'flex small:flex-col gap-12 py-4 mb-8 small:px-0 pl-6  small:ml-[1.675rem]',
				className
			)}
			data-sort-by-pending={isPending ? '' : undefined}
		>
			<SortProducts
				sortBy={optimisticSortBy}
				setQueryParams={setQueryParams}
				data-testid={dataTestId}
			/>
		</div>
	);
};

export default RefinementList;
