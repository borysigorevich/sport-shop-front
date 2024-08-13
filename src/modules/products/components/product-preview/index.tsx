import { retrievePricedProductById } from '@lib/data';
import { getProductPrice } from '@lib/util/get-product-price';
import { Region } from '@medusajs/medusa';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import { AddToCart } from '@modules/products/components/product-preview/add-to-cart';
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
			<div className="flex txt-compact-medium mt-4 justify-between">
				<div className="flex items-center gap-x-2 text-black">
					{cheapestPrice && <PreviewPrice price={cheapestPrice} />}
				</div>
				<AddToCart productId={productPreview.id} countryCode={region.name} />
			</div>
		</div>
	);
}
