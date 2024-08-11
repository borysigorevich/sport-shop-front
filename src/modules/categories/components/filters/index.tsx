'use client';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { removeScrollbar } from '@lib/util/remove-scrollbar';
import { X } from 'lucide-react';
import React, { PropsWithChildren } from 'react';

export const Filters = ({ children }: PropsWithChildren) => {
	return (
		<>
			<Popover className={'-mt-6 lg:hidden'}>
				<PopoverButton
					id={'filter-popover-trigger-button'}
					className={'h-0 invisible'}
				/>
				<PopoverPanel
					focus
					transition
					className="fixed inset-0 bg-white z-50 data-[closed]:translate-y-1 data-[closed]:opacity-0 transition h-full"
					ref={removeScrollbar}
				>
					<div className={'flex flex-col justify-between h-full items-center'}>
						<div className={'absolute top-0 w-full shadow-popover flex py-2 px-4 items-center justify-end bg-white'}>
							<PopoverButton>
								<X />
							</PopoverButton>
						</div>
						<div className={'px-5 pb-1 mt-10 mb-[56px] w-full overflow-auto'}>
							{children}
						</div>
						<div
							className={
								'absolute bottom-0 bg-white p-4 w-full shadow-popover'
							}
						>
							<button>clear</button>
							<button>See results</button>
						</div>
					</div>
				</PopoverPanel>
			</Popover>

			<div className={'hidden lg:block overflow-hidden'}>{children}</div>
		</>
	);
};
