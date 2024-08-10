'use client';
import { cn } from '@lib/util/cn';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';
import { ProductCategoryWithChildren } from '../../../../types/global';

const skipPaths = ['ua', 'categories'];

type CategoriesBreadcrumbsProps = {
	categories: ProductCategoryWithChildren[];
};

export const CategoriesBreadcrumbs = ({ categories }: CategoriesBreadcrumbsProps) => {
	const paths = usePathname();
	const pathNames = paths.split('/').filter((path) => path);
	const { countryCode } = useParams();

	const handleNamesMap = categories.reduce((acc, category) => {
		acc[category.handle] = category.name;
		return acc;
	}, {} as Record<string, string>);

	return (
		<div className={'mb-3'}>
			<ul className={'flex gap-2 pl-1'}>
				<li className={'text-black text-[13px] underline hover:text-red-base'}>
					<Link href={`/${countryCode}`}>Ya Ye Whey</Link>
				</li>
				{pathNames.length > 0 && ' > '}
				{pathNames.map((link, index) => {
					let href = `/${pathNames.slice(0, index + 1).join('/')}`;
					const linkName = handleNamesMap[link] || link;
					let itemLink =
						linkName[0].toUpperCase() + linkName.slice(1, linkName.length);

					if (skipPaths.includes(link)) return null;

					return (
						<React.Fragment key={index}>
							<li
								className={cn(
									'text-black text-[13px]',
									link !== pathNames.at(-1)
										? 'underline hover:text-red-base'
										: 'pointer-events-none'
								)}
							>
								<Link href={href}>{itemLink}</Link>
							</li>
							{pathNames.length !== index + 1 && ' > '}
						</React.Fragment>
					);
				})}
			</ul>
		</div>
	);
};
