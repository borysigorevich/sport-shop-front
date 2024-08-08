'use client';
import { Checkbox, Label } from '@medusajs/ui';
import Accordion from '@modules/products/components/product-tabs/accordion';
import { useRouter } from 'next/navigation';
import React, { useLayoutEffect, useOptimistic, useTransition } from 'react';

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
	const router = useRouter();

	const [optimisticAttributesSearchParams, setOptimisticAttributesSearchParams] =
		useOptimistic(attributesSearchParams);
	const [isPending, startTransition] = useTransition();

	useLayoutEffect(() => {
		startTransition(() => {
			setOptimisticAttributesSearchParams(attributesSearchParams);
		});
	}, [attributesSearchParams]);

	if (!attributes || attributes.length === 0) return null;

	const expandedAccordionValues = attributes.reduce((acc, attribute) => {
		const values = attribute.values.map((value) => value.id);
		const isExpanded = values.some((value) =>
			optimisticAttributesSearchParams.includes(value)
		);

		if (isExpanded) {
			acc.push(attribute.id);
		}

		return acc;
	}, [] as string[]);

	return (
		<div
			className={'grid gap-4'}
			data-attributes-pending={isPending ? '' : undefined}
		>
			<Accordion type="multiple" defaultValue={expandedAccordionValues}>
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
											checked={
												isPending
													? optimisticAttributesSearchParams.includes(
															value.id
													  )
													: attributesSearchParams.includes(
															value.id
													  )
											}
											onCheckedChange={(checked) => {
												const newAttributes = checked
													? [
															...optimisticAttributesSearchParams,
															value.id,
													  ]
													: optimisticAttributesSearchParams.filter(
															(a) => a !== value.id
													  );

												const newSearchParams =
													new URLSearchParams(
														newAttributes.map((attribute) => [
															'attributes[]',
															attribute,
														])
													);

												startTransition(() => {
													router.push(`?${newSearchParams}`);
													setOptimisticAttributesSearchParams(
														newAttributes
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
