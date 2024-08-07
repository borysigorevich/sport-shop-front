'use client';
import { Checkbox, Heading, Label } from '@medusajs/ui';
import axios from 'axios';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useMemo, useState, useTransition } from 'react';

type AttributeValue = {
	id: string;
	value: string;
};

type Attribute = {
	id: string;
	name: string;
	values: AttributeValue[];
};

export const Attributes = () => {
	const pathname = usePathname();
	const router = useRouter();
	const params = useSearchParams();

	console.log({ params });

	const [isPending, startTransition] = useTransition();

	const [attributes, setAttributes] = useState<Attribute[]>([]);

	useEffect(() => {
		const abortController = new AbortController();
		let isMounted = true;

		const fetchAttributes = async () => {
			try {
				const data = (
					await axios.get(
						process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL + '/store/attributes',
						{
							signal: abortController.signal,
						}
					)
				).data;

				if (isMounted) {
					setAttributes(data.attributes);
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchAttributes();

		return () => {
			abortController.abort();
		};
	}, []);

	const attributesParamsValue = useMemo(() => {
		const map = new Map();

		params.getAll(`attributes[]`).forEach((value) => {
			map.set(value, true);
		});

		return map;
	}, [params]);

	if (!attributes || attributes.length === 0) return null;

	console.log({ attributes });

	const handleChange = () => {};

	console.log({ attributesParamsValue });

	return (
		<div className={'grid gap-4'}>
			{attributes?.map((attribute, attributeIndex) => (
				<div key={attribute.id}>
					<Heading level="h1">{attribute.name}</Heading>
					<ul className={'grid gap-2 mt-3'}>
						{attribute.values.map((value, index) => (
							<div className="flex items-center space-x-2" key={value.id}>
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
											router.push(
												`${pathname}?${searchParams.toString()}`
											);
										});
									}}
								/>
								<Label htmlFor={value.id}>{value.value}</Label>
							</div>
						))}
					</ul>
				</div>
			))}
		</div>
	);
};
