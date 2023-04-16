import 'styles/reset.css';
import 'styles/settings.css';
import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeLayout } from 'layouts/ThemeLayout/ThemeLayout';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeLayout>
			<Component className={'s-common s-light-theme'} {...pageProps} />
		</ThemeLayout>
	);
}
