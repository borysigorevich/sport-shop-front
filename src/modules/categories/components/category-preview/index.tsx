import { Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import Thumbnail from '@modules/products/components/thumbnail';
import React from 'react';

type CategoryPreviewProps = {
	handle: string;
	title: string;
	thumbnail: string;
};

export const CategoryPreview = ({ thumbnail, handle, title }: CategoryPreviewProps) => {
	return (
		<div data-testid="product-wrapper">
			<LocalizedClientLink href={`/categories/${handle}`} className="group">
				<Thumbnail thumbnail={thumbnail} size="full" />
			</LocalizedClientLink>
			<div className="flex txt-compact-medium mt-4 justify-between">
				<Text className="text-black font-semibold" data-testid="product-title">
					{title}
				</Text>
			</div>
		</div>
	);
};
