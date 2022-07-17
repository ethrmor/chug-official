import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';

import Navigation from '@/components/Navigation';

export default function Layout({ children }) {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		window.onscroll = function () {
			if (window.scrollY > 0) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};
	}, []);

	let newDate = new Date();
	let year = newDate.getFullYear();

	const ownerLinks = [
		{ id: '/owners/1', name: 'Silverbacks' },
		{ id: '/owners/2', name: 'Slayton Slayerz' },
		{ id: '/owners/3', name: 'Outkasts' },
		{ id: '/owners/4', name: 'Direwolves' },
		{ id: '/owners/5', name: 'Macdaddys' },
		{ id: '/owners/6', name: 'Quarantine Cowboys' },
		{ id: '/owners/7', name: 'Kingston Kraken' },
		{ id: '/owners/8', name: 'Goathouse Alums' },
		{ id: '/owners/9', name: 'Jeff City Leprechauns' },
		{ id: '/owners/10', name: 'White Panthers' },
		{ id: '/owners/11', name: '45ers' },
		{ id: '/owners/12', name: 'Rabbis' },
		{ id: '/owners/13', name: 'Baba Yagas' },
	];

	const leagueLinks = [
		{ id: '/league/trades', name: 'Trades' },
		{ id: '/league/drafts', name: 'Drafts' },
		{ id: '/league/allchug', name: 'All-Chug' },
		{ id: '/league/probowl', name: 'Pro Bowl' },
		{ id: '/league/records', name: 'Record Book' },
		{ id: '/league/bible', name: 'Bible' },
		{ id: '/league/shop', name: 'Shop' },
	];

	const statsLinks = [
		{ id: '/stats/owners/career', name: 'Owners' },
		{ id: '/stats/players/career', name: 'Players' },
	];

	return (
		<div className="flex flex-col min-h-screen">
			<header
				className={`bg-dark-bg shadow-md sticky top-0 z-50 ${
					scrolled ? 'shadow-xl' : null
				}`}
			>
				<Navigation
					owners={ownerLinks}
					league={leagueLinks}
					stats={statsLinks}
				/>
			</header>
			<main className="max-w-screen-xl w-full p-4 mx-auto sm:px-6 lg:px-8 flex-grow">
				{children}
			</main>
			<footer className="bg-dark-bg text-light-text py-6">
				<div className="max-w-screen-xl p-4 mx-auto sm:px-6 lg:px-8 flex flex-col items-center">
					<nav>
						<ul className="flex flex-wrap items-center justify-center gap-2 text-xs group">
							{[
								{ name: 'Home', slug: '/' },
								{ name: 'Franchises', slug: '/owners/' },
								{ name: 'Schedule', slug: '/schedule/' },
								{ name: 'Stats', slug: '/stats/' },
								{ name: 'Standings', slug: '/standings/' },
								{ name: 'League', slug: '/league/' },
								{ name: 'News', slug: '/news' },
							].map((item, index) => (
								<li key={index}>
									<Link href={item.slug}>
										<a className="text-light-text-2 transition hover:bg-dark-hover p-2 rounded-md">
											{item.name}
										</a>
									</Link>
								</li>
							))}
						</ul>
					</nav>
					<div>
						<Link href="/">
							<a className="flex py-6">
								<Image src="/logo.webp" width={80} height={48} alt={'Logo'} />
							</a>
						</Link>
					</div>
					<p className="text-xs text-light-text-2">Chug League &copy; {year}</p>
				</div>
			</footer>
		</div>
	);
}
