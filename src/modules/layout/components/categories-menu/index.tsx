'use client';
import { Popover, PopoverBackdrop, PopoverButton, PopoverPanel } from '@headlessui/react';
import { removeScrollbar } from '@lib/util/remove-scrollbar';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import Accordion from '@modules/products/components/product-tabs/accordion';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import React, { useState } from 'react';
import { ProductCategoryWithChildren } from '../../../../types/global';

type CategoriesMenuProps = {
	categories: ProductCategoryWithChildren[];
};

const MobileSubCategories = ({
	parentCategory,
	back,
	close,
}: {
	parentCategory: ProductCategoryWithChildren;
	back: VoidFunction;
	close: VoidFunction;
}) => {
	return (
		<div>
			<div
				className={'flex items-center p-6 gap-4 cursor-pointer mb-2 pb-4'}
				onClick={back}
			>
				<span className={'text-xl text-black'}>
					<ChevronLeft/>
				</span>
				<h3 className={'text-xl text-red-base font-bold'}>
					{parentCategory.name}
				</h3>
			</div>

			<Accordion type="multiple">
				{parentCategory.category_children.map((categoryChild, index) => (
					<Accordion.Item
						key={categoryChild.id}
						title={categoryChild.name}
						headingSize="medium"
						value={categoryChild.id}
						disabled={!categoryChild.category_children.length}
						className={'first:border-t-0 pt-2'}
						headerClassName={'px-6'}
						headerTitleElement={
							<LocalizedClientLink
								href={`/categories/${categoryChild.handle}`}
								onClick={() => {
									close();
								}}
								className={
									'text-black text-base font-semibold tracking-wider'
								}
							>
								{categoryChild.name}
							</LocalizedClientLink>
						}
					>
						<div className={'pt-2 grid gap-3 px-5'}>
							{categoryChild.category_children.map((child, index) => (
								<div key={child.id}>
									<LocalizedClientLink
										href={`/categories/${child.handle}`}
										className={'text-black-26'}
										onClick={() => {
											close();
										}}
									>
										{child.name}
									</LocalizedClientLink>
								</div>
							))}
						</div>
					</Accordion.Item>
				))}
			</Accordion>
		</div>
	);
};

const DesktopSubCategories = ({
	categoryChildren,
	parentCategory,
	close,
}: {
	categoryChildren: ProductCategoryWithChildren[];
	parentCategory: ProductCategoryWithChildren;
	close: VoidFunction;
}) => {
	return (
		<Popover>
			<PopoverButton
				className={
					'text-black data-[open]:text-white relative group-hover/link-wrapper:text-white flex items-center before:absolute before:inset-0 before:py-6 before:pr-[105%] before:pl-[500%] before:top-1/2 before:-translate-y-1/2 before:-left-[85px] -translate-x-1/2'
				}
			>
				<ChevronRight />
			</PopoverButton>

			<PopoverPanel
				transition
				className={
					'absolute right-0 top-0 bg-white transition data-[closed]:translate-x-[110%] data-[closed]:opacity-0 translate-x-full min-w-fit'
				}
			>
				<div
					className={
						'bg-white border border-t-0 border-ui-border-base max-h-[calc(100vh_-_123px)] w-[62vw] overflow-auto'
					}
				>
					<div className={'px-8 pt-4 pb-6'}>
						<h3 className={'text-xl text-red-base font-bold'}>
							{parentCategory.name}
						</h3>
					</div>
					<ul
						className={
							'px-2 pb-6 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-x-1 gap-y-4'
						}
					>
						{categoryChildren.map((categoryChild) => {
							return (
								<li
									key={categoryChild.id}
									className={'min-w-fit whitespace-nowrap'}
								>
									<LocalizedClientLink
										href={`/categories/${categoryChild.handle}`}
										onClick={() => {
											close();
										}}
										className={
											'px-6 pt-4 pb-3 text-black-26 font-bold text-base hover:underline'
										}
									>
										{categoryChild.name}
									</LocalizedClientLink>

									<ul>
										{categoryChild.category_children.map((child) => (
											<li
												key={child.id}
												className={'px-6 py-3 last:pb-0'}
											>
												<LocalizedClientLink
													href={`/categories/${child.handle}`}
													onClick={() => {
														close();
													}}
													className={
														'text-black-26 text-sm hover:underline'
													}
												>
													{child.name}
												</LocalizedClientLink>
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

const MobileHighLevelCategoriesList = ({
	categories,
	close,
}: {
	categories: ProductCategoryWithChildren[];
	close: VoidFunction;
}) => {
	const [selectedCategory, setSelectedCategory] =
		useState<ProductCategoryWithChildren | null>(null);

	const handleBack = () => {
		setSelectedCategory(null);
	};

	return (
		<ul className={'grid gap-0.5 lg:hidden bg-white'}>
			{selectedCategory ? (
				<MobileSubCategories
					parentCategory={selectedCategory}
					back={handleBack}
					close={close}
				/>
			) : (
				categories.map((category) => {
					return (
						<li key={category.id} className="grid gap-2">
							<div
								className={
									'px-6 py-4 group/link-wrapper flex items-center justify-between cursor-pointer'
								}
								onClick={() => {
									setSelectedCategory(category);
								}}
							>
								<LocalizedClientLink
									onClick={(event) => {
										event.stopPropagation();
										close();
									}}
									href={`/categories/${category.handle}`}
									className="text-black-26 whitespace-nowrap font-bold relative before:absolute before:inset-0 before:py-6 before:px-[60%] before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 hover:underline"
								>
									{category.name}
								</LocalizedClientLink>

								<span className={'text-black'}>
									<ChevronRight />
								</span>
							</div>
						</li>
					);
				})
			)}
		</ul>
	);
};

const DesktopHighLevelCategoriesList = ({
	categories,
	close,
}: {
	categories: ProductCategoryWithChildren[];
	close: VoidFunction;
}) => {
	return (
		<ul className="hidden gap-0.5 w-full relative py-2 lg:grid bg-white h-full">
			{categories.map((category) => {
				return (
					<li key={category.id} className="grid gap-2">
						<div
							className={
								'px-6 py-4 hover:bg-red-base group/link-wrapper flex items-center justify-between [&:has([data-open])]:bg-red-base [&:has([data-open])>a]:text-white'
							}
						>
							<LocalizedClientLink
								href={`/categories/${category.handle}`}
								onClick={() => {
									close();
								}}
								className="text-black-26 whitespace-nowrap font-bold group-hover/link-wrapper:text-white relative before:absolute before:inset-0 before:py-6 before:px-[60%] before:top-1/2 before:-translate-y-1/2 before:left-1/2 before:-translate-x-1/2 hover:underline"
							>
								{category.name}
							</LocalizedClientLink>
							<DesktopSubCategories
								categoryChildren={category.category_children}
								parentCategory={category}
								close={close}
							/>
						</div>
					</li>
				);
			})}
		</ul>
	);
};

const CategoriesMenu = ({ categories }: CategoriesMenuProps) => {
	return (
		<div className="order-1 lg:order-2 flex items-center">
			<Popover className="lg:relative flex">
				{({ close }) => (
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
							className="fixed inset-0 data-[closed]:opacity-0 lg:backdrop-blur-sm transition-all -z-10"
						/>

						<PopoverPanel
							transition
							className="flex flex-col absolute w-full min-w-[350px] sm:pr-0 z-[100] inset-x-0 text-sm text-ui-fg-on-color h-[calc(100vh_-_63px)] lg:h-fit
												 transition  data-[closed]:translate-y-1 data-[closed]:opacity-0 left-0 top-[64px] lg:left-[calc(100vw_*_0.1_-_265px)] lg:top-[42.5px] overflow-auto lg:overflow-visible"
							ref={removeScrollbar}
						>
							<div
								data-testid="nav-menu-popup"
								className="flex flex-col h-full bg-white justify-between border border-t-0 border-ui-border-base min-w-[324px]"
							>
								<MobileHighLevelCategoriesList
									categories={categories}
									close={close}
								/>
								<DesktopHighLevelCategoriesList
									categories={categories}
									close={close}
								/>
							</div>
						</PopoverPanel>
					</>
				)}
			</Popover>
		</div>
	);
};

export default CategoriesMenu;
