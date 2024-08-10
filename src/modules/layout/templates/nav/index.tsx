import LocalizedClientLink from '@modules/common/components/localized-client-link';
import CartButton from '@modules/layout/components/cart-button';
import { CategoriesMenuWrapper } from '@modules/layout/components/categories-menu/CategoriesMenuWrapper';
import { Suspense } from 'react';

export default function Nav() {
	return (
		<div className="sticky top-0 inset-x-0 z-50 group">
			<header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
				<nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex justify-between items-center w-full h-full text-small-regular gap-10">
					<LocalizedClientLink
						href="/"
						className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase order-2 lg:order-1 flex-1 lg:flex-grow-0 text-center min-w-fit"
						data-testid="nav-store-link"
					>
						Ya Ye Whey
					</LocalizedClientLink>

					<CategoriesMenuWrapper />

					<div className="flex items-center gap-x-6 h-full lg:flex-1 min-w-fit basis-0 justify-end order-3">
						<div className="hidden small:flex items-center gap-x-6 h-full">
							{process.env.FEATURE_SEARCH_ENABLED && (
								<LocalizedClientLink
									className="hover:text-ui-fg-base"
									href="/search"
									scroll={false}
									data-testid="nav-search-link"
								>
									Search
								</LocalizedClientLink>
							)}
							<LocalizedClientLink
								className="hover:text-ui-fg-base"
								href="/account"
								data-testid="nav-account-link"
							>
								Account
							</LocalizedClientLink>
						</div>
						<Suspense
							fallback={
								<LocalizedClientLink
									className="hover:text-ui-fg-base flex gap-2"
									href="/cart"
									data-testid="nav-cart-link"
								>
									Cart (0)
								</LocalizedClientLink>
							}
						>
							<CartButton />
						</Suspense>
					</div>
				</nav>
			</header>
		</div>
	);
}
