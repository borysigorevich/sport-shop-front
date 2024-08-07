'use client';
import { Checkbox, Heading, Label } from '@medusajs/ui';
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
};

export const Attributes = ({ attributes }: AttributesProps) => {
	const pathname = usePathname();
	const router = useRouter();
	const params = useSearchParams();

	const [isPending, startTransition] = useTransition();

	const attributesParamsValue = useMemo(() => {
		const map = new Map();

		params.getAll(`attributes[]`).forEach((value) => {
			map.set(value, true);
		});

		return map;
	}, [params]);

	if (!attributes || attributes.length === 0) return null;

	return (
		<div className={'grid gap-4'}>
			{attributes?.map((attribute, attributeIndex) => (
				<div key={attribute.id}>
					<Heading level="h1">{attribute.name}</Heading>
					<ul className={'grid gap-2 mt-3'}>
						{attribute.values.map((value, index) => (
							<div key={value.id}>
								<Label className={'flex items-center gap-2'}>
								<Checkbox
									id={value.id}
									defaultChecked={attributesParamsValue.has(value.id)}
									onCheckedChange={(checked) => {
										startTransition(() => {
											const searchParams = new URLSearchParams(
												params
											);
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
											router.replace(
												`${pathname}?${searchParams.toString()}`
											);
										});
									}}
								/>
								{value.value}
								</Label>
							</div>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};
