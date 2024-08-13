'use client';
import { cn } from '@lib/util/cn';
import React, {
	ComponentRef,
	PropsWithChildren,
	useLayoutEffect,
	useRef,
	useState,
} from 'react';

export const ContentGrid = ({ children }: PropsWithChildren) => {
	const buttonRef = useRef<ComponentRef<'button'>>(null);
	const gridContentRef = useRef<ComponentRef<'div'>>(null);
	const [showFilters, setShowFilters] = useState(true);
	const [sidebarWidth, setSidebarWidth] = useState(0);

	useLayoutEffect(() => {
		const filterSidebar = document.getElementById('filter-sidebar');
		const contentGrid = gridContentRef.current;

		if (!filterSidebar || !contentGrid) return;

		const resizeObserver = new ResizeObserver(() => {
			if (contentGrid && showFilters) {
				const oneFourth = (contentGrid.clientWidth - 40) / 4;
				filterSidebar.style.minWidth = oneFourth + 'px';
				setSidebarWidth(oneFourth);
			}
		});

		resizeObserver.observe(contentGrid);

		return () => {
			resizeObserver.disconnect();
		};
	}, [showFilters]);

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
				ref={gridContentRef}
				style={{
					gridTemplateColumns: showFilters
						? `${sidebarWidth ? sidebarWidth + 'px' : '1fr'} 3fr`
						: '0 1fr',
				}}
				className={cn(
					'lg:grid transition-all duration-200',
					showFilters ? 'grid-cols-[1fr_3fr] gap-10' : 'grid-cols-[0_1fr] gap-0'
				)}
			>
				{children}
			</div>
		</>
	);
};
