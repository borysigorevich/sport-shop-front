import { retrievePricedProductById } from '@lib/data';
import { getProductPrice } from '@lib/util/get-product-price';
import { Region } from '@medusajs/medusa';
import { Text } from '@medusajs/ui';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { ProductPreviewType } from 'types/global';
import Thumbnail from '../thumbnail';
import PreviewPrice from './price';

export default async function ProductPreview({
	productPreview,
	isFeatured,
	region,
}: {
	productPreview: ProductPreviewType;
	isFeatured?: boolean;
	region: Region;
}) {
	const pricedProduct = await retrievePricedProductById({
		id: productPreview.id,
		regionId: region.id,
	}).then((product) => product);

	if (!pricedProduct) {
		return null;
	}

	const { cheapestPrice } = getProductPrice({
		product: pricedProduct,
		region,
	});

	return (
		<div data-testid="product-wrapper">
			<LocalizedClientLink
				href={`/products/${productPreview.handle}`}
				className="group"
			>
				<Thumbnail
					thumbnail={productPreview.thumbnail}
					size="full"
					isFeatured={isFeatured}
				/>
			</LocalizedClientLink>
			<div className="flex flex-col txt-compact-medium mt-4 justify-between">
				<Text className="text-black" data-testid="product-title">
					{productPreview.title}
				</Text>
				<div className="flex items-center gap-x-2">
					{cheapestPrice && <PreviewPrice price={cheapestPrice} />}
				</div>
			</div>
		</div>
	);
}
