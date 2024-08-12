import { retrievePricedProductById } from '@lib/data';
import { getProductPrice } from '@lib/util/get-product-price';
import { Region } from '@medusajs/medusa';
import { Button } from '@medusajs/ui';
import { addToCart } from '@modules/cart/actions';
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

	const handleAddToCart = async () => {
		'use server';
		if (!productPreview?.id) return null;

		// setIsAdding(true);

		await addToCart({
			variantId: productPreview.id,
			quantity: 1,
			countryCode: region.name,
		});

		// setIsAdding(false);
	};

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
				{/*TODO decompose in client component*/}
				<form action={handleAddToCart}>
					<Button
						type={'submit'}
						variant="primary"
						className="w-full h-8 rounded-none"
						data-testid="add-product-button"
					>
						Add to cart
					</Button>
				</form>
			</div>
		</div>
	);
}
