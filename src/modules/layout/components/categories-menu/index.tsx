'use client';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ProductCategoryWithChildren } from '../../../../types/global';

type CategoriesMenuProps = {
	categories: ProductCategoryWithChildren[];
};

const CategoriesMenu = ({categories}: CategoriesMenuProps) => {

	return (
		<div className="h-full">
			<div className="flex items-center h-full">
				<Popover className="flex">
					<>
						<div className="flex">
							<PopoverButton
								data-testid="nav-menu-button"
								className="relative h-full flex items-center transition-all ease-out duration-200 focus:outline-none hover:text-ui-fg-base"
							>
								Menu
							</PopoverButton>
						</div>

						<PopoverPanel
							transition
							className="flex flex-col absolute  w-full max-w-[350px] sm:pr-0 z-[100] inset-x-0 text-sm text-ui-fg-on-color m-2
												 transition duration-200 data-[closed]:-translate-y-1 data-[closed]:opacity-0 left-1/2 -translate-x-1/2 top-[56px]
								"
						>
							<div
								data-testid="nav-menu-popup"
								className="flex flex-col h-full bg-white rounded-rounded justify-between p-6 shadow-popover backdrop-blur-2xl rounded-tr-none rounded-tl-none"
							></div>
						</PopoverPanel>
					</>
				</Popover>
			</div>
		</div>
	);
};

export default CategoriesMenu;
