'use client';
import { cn } from '@lib/util/cn';
import React, { ComponentRef, PropsWithChildren, useRef, useState } from 'react';

export const ContentGrid = ({ children }: PropsWithChildren) => {
	const buttonRef = useRef<ComponentRef<'button'>>(null);
	const [showFilters, setShowFilters] = useState(true);

	return (
		<>
			<button
				id={'show-filters-button'}
				data-show-state={showFilters ? 'show' : 'hide'}
				ref={buttonRef}
				onClick={() => {
					setShowFilters(!showFilters);
				}}
				className={' h-0 hidden'}
			>
				show
			</button>
			<div
				className={cn(
					'grid gap-10',
					showFilters
						? 'lg:grid-cols-[1fr_3fr] gap-10'
						: 'lg:grid-cols-[0_3fr] lg:gap-0'
				)}
			>
				{children}
			</div>
		</>
	);
};
