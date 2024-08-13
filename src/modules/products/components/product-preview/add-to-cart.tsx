'use client';
import { Button } from '@medusajs/ui';
import { addToCart } from '@modules/cart/actions';
import React, { useState } from 'react';

type AddToCartProps = {
	productId: string;
	countryCode: string;
};

export const AddToCart = ({ productId, countryCode }: AddToCartProps) => {
	const [isAdding, setIsAdding] = useState(false);

	const handleAddToCart = async () => {
		if (!productId) return null;

		setIsAdding(true);
		await addToCart({
			countryCode: countryCode.toLowerCase(),
			variantId: productId,
			quantity: 1,
		});

		setIsAdding(false);
	};

	return (
		<Button
			onClick={handleAddToCart}
			disabled={isAdding}
			isLoading={isAdding}
			variant="primary"
			className="w-fit h-8 rounded-none focus:rounded-none"
			data-testid="add-product-button"
		>
			Add to cart
		</Button>
	);
};
