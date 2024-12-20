import { cn } from '@lib/util/cn';
import { clx, Text } from '@medusajs/ui';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import React from 'react';

type AccordionItemProps = AccordionPrimitive.AccordionItemProps & {
	title: string;
	subtitle?: string;
	description?: string;
	required?: boolean;
	tooltip?: string;
	forceMountContent?: true;
	headingSize?: 'small' | 'medium' | 'large';
	customTrigger?: React.ReactNode;
	complete?: boolean;
	active?: boolean;
	triggerable?: boolean;
	headerTitleElement?: React.ReactNode;
	headerClassName?: string;
	headerTitleClassName?: string;
	childrenWrapperClassName?: string;
	children: React.ReactNode;
};

type AccordionProps =
	| (AccordionPrimitive.AccordionSingleProps & React.RefAttributes<HTMLDivElement>)
	| (AccordionPrimitive.AccordionMultipleProps & React.RefAttributes<HTMLDivElement>);

const Accordion: React.FC<AccordionProps> & {
	Item: React.FC<AccordionItemProps>;
} = ({ children, ...props }) => {
	return (
		// @ts-ignore
		<AccordionPrimitive.Root {...props}>{children}</AccordionPrimitive.Root>
	);
};

const Item: React.FC<AccordionItemProps> = ({
	title,
	subtitle,
	description,
	children,
	className,
	headingSize = 'large',
	customTrigger = undefined,
	forceMountContent = undefined,
	triggerable,
	headerTitleElement,
	headerClassName,
	headerTitleClassName,
	childrenWrapperClassName,
	...props
}) => {
	return (
		// @ts-ignore
		<AccordionPrimitive.Item
			{...props}
			className={clx(
				'border-grey-20 group border-t last:mb-0 last:border-b',
				'py-3',
				className
			)}
		>
			{/*@ts-ignore*/}
			<AccordionPrimitive.Header className={cn('px-1', headerClassName)}>
				<div className="flex flex-col">
					{/*@ts-ignore*/}
					<AccordionPrimitive.Trigger
						className={'flex w-full items-center justify-between'}
					>
						<div className="flex items-center gap-4">
							{headerTitleElement || (
								<Text
									className={cn(
										'text-ui-fg-subtle text-sm',
										headerTitleClassName
									)}
								>
									{title}
								</Text>
							)}
						</div>
						{!props.disabled && (customTrigger || <MorphingTrigger />)}
					</AccordionPrimitive.Trigger>
					{subtitle && (
						<Text as="span" size="small" className="mt-1">
							{subtitle}
						</Text>
					)}
				</div>
			</AccordionPrimitive.Header>
			{/*@ts-ignore*/}
			<AccordionPrimitive.Content
				forceMount={forceMountContent}
				className={clx('radix-state-closed:pointer-events-none px-1')}
			>
				<div className="inter-base-regular group-radix-state-closed:animate-accordion-close">
					{description && <Text>{description}</Text>}
					<div className={cn('w-full', childrenWrapperClassName)}>
						{children}
					</div>
				</div>
			</AccordionPrimitive.Content>
		</AccordionPrimitive.Item>
	);
};

Accordion.Item = Item;

const MorphingTrigger = () => {
	return (
		<div className="text-grey-90 hover:bg-grey-5 active:bg-grey-5 active:text-violet-60 focus:border-violet-60 disabled:text-grey-30 bg-transparent disabled:bg-transparent rounded-rounded group relative p-[6px]">
			<div className="h-5 w-5">
				<span className="bg-grey-50 rounded-circle group-radix-state-open:rotate-90 absolute inset-y-[31.75%] left-[48%] right-1/2 w-[1.5px] " />
				<span className="bg-grey-50 rounded-circle group-radix-state-open:rotate-90 group-radix-state-open:left-1/2 group-radix-state-open:right-1/2 absolute inset-x-[31.75%] top-[48%] bottom-1/2 h-[1.5px]" />
			</div>
		</div>
	);
};

export default Accordion;
