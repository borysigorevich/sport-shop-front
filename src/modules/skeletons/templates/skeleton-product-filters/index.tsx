import React from 'react';

const filterItems = new Array(5).fill(0);

export const SkeletonProductFilters = () => {
	return (
		<div className="flex flex-col space-y-4 w-full animate-pulse">
			{filterItems.map((_, i) => (
				<div key={i} className="flex flex-col space-y-2">
					<div className="w-1/2 h-6 bg-gray-100 rounded" />
					<div className="w-3/4 h-4 bg-gray-100 rounded" />
				</div>
			))}
		</div>
	);
};
