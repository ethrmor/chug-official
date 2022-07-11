import Link from 'next/link';
import Image from 'next/image';

import { useState, useEffect } from 'react';

import { useTheme } from 'next-themes';
import NavDropdown from './NavDropdown';

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

	const { theme, setTheme } = useTheme();
	return (
		<div className="flex flex-col min-h-screen">
			<header
				className={`bg-[#121212] shadow-md sticky top-0 z-50 ${
					scrolled ? 'shadow-xl' : null
				}`}
			>
				<div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex-1 md:flex md:items-center md:gap-12">
							<Link href="/">
								<a className="flex">
									<span className="sr-only">Home</span>
									<Image src="/logo.webp" width={70} height={40} alt={'Logo'} />
								</a>
							</Link>
						</div>

						<div className="md:flex md:items-center md:gap-6 ">
							<nav
								className="hidden md:block"
								aria-labelledby="header-navigation"
							>
								<h2 className="sr-only" id="header-navigation">
									Header navigation
								</h2>

								<ul className="flex items-center gap-2 text-sm group">
									<li className="">
										<Link href="/">
											<a className="text-white transition hover:bg-[#222222] p-2 rounded-md">
												Home
											</a>
										</Link>
									</li>
									<li>
										<NavDropdown
											buttonName={'Franchises'}
											listArray={ownerLinks}
										/>
									</li>
									<li>
										<Link href="/schedule">
											<a className="text-white transition hover:bg-[#222222] p-2 rounded-md">
												Schedule
											</a>
										</Link>
									</li>
									<li>
										<Link href="/standings">
											<a className="text-white transition hover:bg-[#222222] p-2 rounded-md">
												Standings
											</a>
										</Link>
									</li>
									<li>
										<NavDropdown buttonName={'Stats'} listArray={statsLinks} />
									</li>
									<li>
										<NavDropdown
											buttonName={'League'}
											listArray={leagueLinks}
										/>
									</li>
									<li>
										<Link href="/news">
											<a className="text-white transition hover:bg-[#222222] p-2 rounded-md">
												News
											</a>
										</Link>
									</li>
								</ul>
							</nav>

							<div className="flex items-center gap-4">
								<button
									onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
									className="p-2 text-white transition bg-[#222222] rounded hover:text-white/75"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="w-5 h-5"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										strokeWidth="2"
									>
										{theme === 'dark' ? (
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
											/>
										) : (
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
											/>
										)}
									</svg>
								</button>

								<div className="block md:hidden">
									<button className="p-2 text-white transition bg-[#222222] rounded hover:text-white/75">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="w-5 h-5"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
											strokeWidth="2"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M4 6h16M4 12h16M4 18h16"
											/>
										</svg>
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
			<main className="max-w-screen-xl w-full p-4 mx-auto sm:px-6 lg:px-8 flex-grow">
				{children}
			</main>
			<footer className="bg-[#121212] text-white py-6">
				<div className="max-w-screen-xl p-4 mx-auto sm:px-6 lg:px-8 flex flex-col items-center">
					<nav>
						<ul className="flex items-center gap-2 text-xs group">
							<li>
								<Link href="/">
									<a className="text-white/60 transition hover:bg-[#222222] p-2 rounded-md">
										Home
									</a>
								</Link>
							</li>
							<li>
								<Link href="/owners">
									<a className="text-white/60 transition hover:bg-[#222222] p-2 rounded-md">
										Franchises
									</a>
								</Link>
							</li>
							<li>
								<Link href="/schedule">
									<a className="text-white/60 transition hover:bg-[#222222] p-2 rounded-md">
										Schedule
									</a>
								</Link>
							</li>
							<li>
								<Link href="/stats">
									<a className="text-white/60 transition hover:bg-[#222222] p-2 rounded-md">
										Stats
									</a>
								</Link>
							</li>
							<li>
								<Link href="/standings">
									<a className="text-white/60 transition hover:bg-[#222222] p-2 rounded-md">
										Standings
									</a>
								</Link>
							</li>
							<li>
								<Link href="/league">
									<a className="text-white/60 transition hover:bg-[#222222] p-2 rounded-md">
										League
									</a>
								</Link>
							</li>
							<li>
								<Link href="/news">
									<a className="text-white/60 transition hover:bg-[#222222] p-2 rounded-md">
										News
									</a>
								</Link>
							</li>
						</ul>
					</nav>
					<div>
						<Link href="/">
							<a className="flex py-6">
								<Image src="/logo.webp" width={80} height={48} alt={'Logo'} />
							</a>
						</Link>
					</div>
					<p className="text-xs text-white/60">Chug League &copy; {year}</p>
				</div>
			</footer>
		</div>
	);
}
