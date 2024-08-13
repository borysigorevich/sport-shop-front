import { Region } from '@medusajs/medusa';
import { PricedProduct } from '@medusajs/medusa/dist/types/pricing';
import { CategoriesBreadcrumbsWrapper } from '@modules/categories/components/categories-breadcrumbs/categories-breadcrumbs-wrapper';

import ImageGallery from '@modules/products/components/image-gallery';
import ProductActions from '@modules/products/components/product-actions';
import ProductOnboardingCta from '@modules/products/components/product-onboarding-cta';
import ProductTabs from '@modules/products/components/product-tabs';
import RelatedProducts from '@modules/products/components/related-products';
import ProductInfo from '@modules/products/templates/product-info';
import { SkeletonCategoriesBreadcrumbs } from '@modules/skeletons/components/skeleton-categories-breadcrumbs';
import SkeletonRelatedProducts from '@modules/skeletons/templates/skeleton-related-products';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import ProductActionsWrapper from './product-actions-wrapper';

type ProductTemplateProps = {
	product: PricedProduct;
	region: Region;
	countryCode: string;
	category?: string;
};

const ProductTemplate: React.FC<ProductTemplateProps> = ({
	product,
	region,
	countryCode,
	category,
}) => {
	if (!product || !product.id) {
		return notFound();
	}

	return (
		<div className={'content-container pt-6'}>
			<Suspense fallback={<SkeletonCategoriesBreadcrumbs />}>
				<CategoriesBreadcrumbsWrapper categoryParams={category} />
			</Suspense>
			<div
				className="grid py-6 relative gap-4 lg:gap-12"
				data-testid="product-container"
			>
				<div className={'grid lg:grid-cols-[4fr_6fr] gap-4 lg:gap-12'}>
					<div className="w-full relative grid gap-4">
						<div className={'lg:hidden'}>
							<ProductInfo product={product} />
						</div>
						<ImageGallery images={product?.images || []} />
					</div>
					<div className="flex flex-col small:sticky small:top-48 small:py-0 small:max-w-[300px] w-full py-8 gap-y-4">
						<div className={'hidden lg:block'}>
							<ProductInfo product={product} />
						</div>
						<ProductOnboardingCta />
						<Suspense
							fallback={
								<ProductActions
									disabled={true}
									product={product}
									region={region}
								/>
							}
						>
							<ProductActionsWrapper id={product.id} region={region} />
						</Suspense>
					</div>
				</div>
				<div className={'lg:max-w-2xl w-full mx-auto'}>
					<ProductTabs product={product} />
				</div>
			</div>
			<div className="my-16 small:my-32" data-testid="related-products-container">
				<Suspense fallback={<SkeletonRelatedProducts />}>
					<RelatedProducts product={product} countryCode={countryCode} />
				</Suspense>
			</div>
		</div>
	);
};

export default ProductTemplate;
