import LocalizedClientLink from '@modules/common/components/localized-client-link';
import CartButton from '@modules/layout/components/cart-button';
import { CategoriesMenuWrapper } from '@modules/layout/components/categories-menu/CategoriesMenuWrapper';
import { Suspense } from 'react';

export default function Nav() {
	return (
		<div className="sticky top-0 inset-x-0 z-50 group">
			<header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
				<nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex justify-between items-center w-full h-full text-small-regular">
					<div className={'flex items-center gap-5 justify-between'}>
						<div className="flex items-center h-full">
							<LocalizedClientLink
								href="/"
								className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
								data-testid="nav-store-link"
							>
								Ya Ye Whey
							</LocalizedClientLink>
						</div>

						<CategoriesMenuWrapper />
					</div>

					<div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
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
