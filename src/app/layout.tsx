import { Metadata } from 'next';
import 'styles/globals.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:8000';

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
};

export default function RootLayout(props: { children: React.ReactNode }) {
	return (
		<html lang="en" data-mode="light">
			<body>
				<div className="relative h-full">{props.children}</div>
			</body>
		</html>
	);
}
