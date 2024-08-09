import { ArrowUpRightMini } from '@medusajs/icons';
import { Text } from '@medusajs/ui';
import LocalizedClientLink from '../localized-client-link';

type InteractiveLinkProps = {
	href: string;
	children?: React.ReactNode;
	onClick?: () => void;
};

const InteractiveLink = ({ href, children, onClick, ...props }: InteractiveLinkProps) => {
	return (
		<LocalizedClientLink
			className="flex gap-x-1 items-center group/link"
			href={href}
			onClick={onClick}
			{...props}
		>
			<Text className="text-black txt-compact-medium">{children}</Text>
			<ArrowUpRightMini
				className="group-hover/link:rotate-45 ease-in-out duration-150"
			/>
		</LocalizedClientLink>
	);
};

export default InteractiveLink;
