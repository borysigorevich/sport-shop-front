'use client';
import { Checkbox, Label } from '@medusajs/ui';
import Accordion from '@modules/products/components/product-tabs/accordion';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useLayoutEffect, useMemo, useOptimistic, useTransition } from 'react';

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
	const params = useSearchParams();

	const [optimisticAttributesSearchParams, setOptimisticAttributesSearchParams] =
		useOptimistic(attributesSearchParams);
	const [isPending, startTransition] = useTransition();

	useLayoutEffect(() => {
		startTransition(() => {
			setOptimisticAttributesSearchParams(attributesSearchParams);
		});
	}, [attributesSearchParams]);

	const expandedAccordionValues = useMemo(() => {
		return attributes.reduce((acc, attribute) => {
			const values = attribute.values.map((value) => value.id);
			const isExpanded = values.some((value) =>
				optimisticAttributesSearchParams.includes(value)
			);

			if (isExpanded) {
				acc.push(attribute.id);
			}

			return acc;
		}, [] as string[]);
	}, [attributes]);

	const handleChange = (attributeId: string) => (checked: boolean) => {
		const newAttributes = checked
			? [...optimisticAttributesSearchParams, attributeId]
			: optimisticAttributesSearchParams.filter((attrId) => attrId !== attributeId);

		const searchParams = new URLSearchParams(params);
		searchParams.delete('attributes[]');

		newAttributes.forEach(attr => searchParams.append('attributes[]', attr));

		startTransition(() => {
			router.push(`?${searchParams}`);
			setOptimisticAttributesSearchParams(newAttributes);
		});
	};

	if (!attributes || attributes.length === 0) return null;

	return (
		<div
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
						<div className={'pt-2 grid gap-2'}>
							{attribute.values.map((value, index) => (
								<div key={value.id}>
									<Label className={'flex items-center gap-2'}>
										<Checkbox
											id={value.id}
											checked={optimisticAttributesSearchParams.includes(
												value.id
											)}
											onCheckedChange={handleChange(value.id)}
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
