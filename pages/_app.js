import '@/styles/globals.css';

import { ThemeProvider } from 'next-themes';

import Layout from '@/components/Layout';
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider attribute="class">
			<Layout>
				<Head>
					<link rel="icon" href="/favicon.webp" />
				</Head>
				<Component {...pageProps} />
			</Layout>
		</ThemeProvider>
	);
}

export default MyApp;
