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
		<LocalizedClientLink href={`/categories/${handle}`} className="group">
			<div data-testid="product-wrapper">
				<Thumbnail thumbnail={thumbnail} size="full" />
				<div className="flex txt-compact-medium mt-4 justify-between">
					<Text className="text-ui-fg-subtle" data-testid="product-title">
						{title}
					</Text>
				</div>
			</div>
		</LocalizedClientLink>
	);
};
