'use client';
import { Checkbox, Label } from '@medusajs/ui';
import Accordion from '@modules/products/components/product-tabs/accordion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useMemo, useTransition } from 'react';

type AttributeValue = {
	id: string;
	value: string;
};

type Attribute = {
	id: string;
	name: string;
	values: AttributeValue[];
};

type AttributesProps = {
	attributes: Attribute[];
	attributesSearchParams: string[];
};

export const Attributes = ({ attributes, attributesSearchParams }: AttributesProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const params = useSearchParams();

	const [isPending, startTransition] = useTransition();

	if (!attributes || attributes.length === 0) return null;

	console.log({ attributes });

	console.log({ attributesSearchParams });

	return (
		<div className={'grid gap-4'}>
			<Accordion type="multiple">
				{attributes.map((attribute, i) => (
					<Accordion.Item
						key={i}
						title={attribute.name}
						headingSize="medium"
						value={attribute.id}
						className={'first:border-t-0 pt-2'}
						headerTitleClassName={'text-lg font-semibold text-black'}
					>
						<div className={'pt-4 grid gap-2'}>
							{attribute.values.map((value, index) => (
								<div key={value.id}>
									<Label className={'flex items-center gap-2'}>
										<Checkbox
											id={value.id}
											checked={attributesSearchParams.includes(value.id)}
											onCheckedChange={(checked) => {
												startTransition(() => {
													const searchParams =
														new URLSearchParams(params);
													if (checked) {
														searchParams.append(
															`attributes[]`,
															value.id
														);
													} else {
														searchParams.delete(
															`attributes[]`,
															value.id
														);
													}
													router.push(
														`${pathname}?${searchParams.toString()}`
													);
												});
											}}
										/>
										{value.value}
									</Label>
								</div>
							))}
						</div>
					</Accordion.Item>
				))}
			</Accordion>
		</div>
	);
};
