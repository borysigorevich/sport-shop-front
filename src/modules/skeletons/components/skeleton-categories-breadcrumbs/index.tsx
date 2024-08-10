import React from 'react';

type SkeletonCategoriesBreadcrumbsProps = {
	categoriesCount: number;
};

export const SkeletonCategoriesBreadcrumbs = ({categoriesCount}: SkeletonCategoriesBreadcrumbsProps) => {
	return (
		<div className={'mb-3'}>
			<ul className={'flex gap-2 pl-1'}>
				<div className={'flex items-center gap-2'}>
					<li className={'bg-gray-100 rounded h-3 w-20 animate-pulse'}></li>
					<span > {'>'} </span>
				</div>
				{[...Array(categoriesCount)].map((_, index) => (
					<div key={index} className={'flex items-center gap-2'}>
						<li
							className={
								'bg-gray-100 rounded h-3 w-20 animate-pulse'
							}
						></li>
						{index !== categoriesCount - 1 && (
							<span> {'>'} </span>
						)}
					</div>
				))}
			</ul>
		</div>
	);
};
