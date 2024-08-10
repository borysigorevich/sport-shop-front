'use client';
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from "@headlessui/react"
import Link from 'next/link';
import { ProductCategoryWithChildren } from '../../../../types/global';

type CategoriesMenuProps = {
	categories: ProductCategoryWithChildren[];
};

const SubCategories = ({
	categoryChildren,
	parentCategory,
}: {
	categoryChildren: ProductCategoryWithChildren[];
	parentCategory: ProductCategoryWithChildren;
}) => {
	return (
		<Popover>
			<PopoverButton
				className={
					'text-black data-[open]:text-white group-hover/link-wrapper:text-white'
				}
			>
				{'>'}
			</PopoverButton>

			<PopoverPanel
				transition
				className={
					'absolute right-0 top-0 bg-white transition data-[closed]:translate-x-[110%] data-[closed]:opacity-0 translate-x-full min-w-fit'
				}
			>
				<div
					className={
						'bg-white border border-t-0 border-ui-border-base max-h-[calc(100vh_-_123px)] overflow-auto'
					}
				>
					<div className={'px-8 pt-4 pb-6'}>
						<h3 className={'text-xl text-red-base font-bold'}>
							{parentCategory.name}
						</h3>
					</div>
					<ul
						className={
							'px-2 pb-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-10 gap-y-4'
						}
					>
						{categoryChildren.map((categoryChild) => {
							return (
								<li
									key={categoryChild.id}
									className={'min-w-fit whitespace-nowrap'}
								>
									<Link
										href={`./categories/${parentCategory.handle}/${categoryChild.handle}`}
										className={
											'px-6 pt-4 pb-3 text-black-26 font-bold text-base hover:underline'
										}
									>
										{categoryChild.name}
									</Link>

									<ul>
										{categoryChild.category_children.map((child) => (
											<li
												key={child.id}
												className={'px-6 py-3 last:pb-0'}
											>
												<Link
													href={`./categories/${parentCategory.handle}/${categoryChild.handle}/${child.handle}`}
													className={
														'text-black-26 text-sm hover:underline'
													}
												>
													{child.name}
												</Link>
											</li>
										))}
									</ul>
								</li>
							);
						})}
					</ul>
				</div>
			</PopoverPanel>
		</Popover>
	);
};

const CategoriesMenu = ({ categories }: CategoriesMenuProps) => {
	return (
		<div className="order-1 lg:order-2 flex items-center">
			<Popover className="lg:relative flex">
				<>
					<div className="flex">
						<PopoverButton
							data-testid="nav-menu-button"
							className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
						>
							Menu
						</PopoverButton>
					</div>

					<PopoverBackdrop
						transition
						className="fixed inset-0 data-[closed]:opacity-0 lg:backdrop-blur-sm transition-all bg-black/15 -z-10" />

					<PopoverPanel
						transition
						className="flex flex-col absolute w-full min-w-[350px] sm:pr-0 z-[100] inset-x-0 text-sm text-ui-fg-on-color h-[calc(100vh_-_63px)] lg:h-fit
												 transition  data-[closed]:translate-y-1 data-[closed]:opacity-0 left-0 top-[64px] lg:left-[calc(100vw_*_0.1_-_200px)] lg:top-[42.5px]"
					>
						<div
							data-testid="nav-menu-popup"
							className="flex flex-col h-full bg-white justify-between border border-t-0 border-ui-border-base min-w-[324px]"
						>
							<ul className="grid gap-0.5 w-full relative py-2">
								{categories.map((category) => {
									return (
										<li key={category.id} className="grid gap-2">
											<div
												className={
													'px-6 py-4 hover:bg-red-base group/link-wrapper flex items-center justify-between [&:has([data-open])]:bg-red-base [&:has([data-open])>a]:text-white'
												}
											>
												<Link
													href={`./categories/${category.handle}`}
													className="text-black-26 whitespace-nowrap font-bold group-hover/link-wrapper:text-white relative before:absolute before:inset-0 before:py-6 before:px-[60%] before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 hover:underline"
												>
													{category.name}
												</Link>
												<SubCategories
													categoryChildren={
														category.category_children
													}
													parentCategory={category}
												/>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
					</PopoverPanel>
				</>
			</Popover>
		</div>
	);
};

export default CategoriesMenu;
