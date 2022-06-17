import Link from 'next/link';
import Image from 'next/image';

import { useTheme } from 'next-themes';

export default function Layout({ children }) {
	const { theme, setTheme } = useTheme();
	return (
		<>
			<header className="bg-black">
				<div className="max-w-screen-2xl px-4 mx-auto sm:px-6 lg:px-8">
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

								<ul className="flex items-center gap-6 text-sm group">
									<li className="">
										<Link href="/">
											<a className="text-white transition hover:text-white">
												Home
											</a>
										</Link>
									</li>
									<li>
										<Link href="/trades">
											<a className="text-white transition hover:text-white/75">
												Trades
											</a>
										</Link>
									</li>
									<li>
										<Link href="/stats">
											<a className="text-white transition hover:text-white/75">
												Stats
											</a>
										</Link>
									</li>
									<li>
										<Link href="/owners">
											<a className="text-white transition hover:text-white/75">
												Owners
											</a>
										</Link>
										<ul className="hidden">
											<li>
												<Link href="/owners/1">
													<a className="text-white transition hover:text-white/75">
														Ethan
													</a>
												</Link>
											</li>
											<li>
												<Link href="/owners/2">
													<a className="text-white transition hover:text-white/75">
														Jacob
													</a>
												</Link>
											</li>
											<li>
												<Link href="/owners/3">
													<a className="text-white transition hover:text-white/75">
														Scott
													</a>
												</Link>
											</li>
											<li>
												<Link href="/owners/4">
													<a className="text-white transition hover:text-white/75">
														Morgan
													</a>
												</Link>
											</li>
										</ul>
									</li>
									<li>
										<Link href="/players">
											<a className="text-white transition hover:text-white/75">
												Players
											</a>
										</Link>
									</li>
									<li>
										<Link href="/supabase">
											<a className="text-white transition hover:text-white">
												Supabase
											</a>
										</Link>
									</li>
								</ul>
							</nav>

							<div className="flex items-center gap-4">
								<button
									onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
									className="p-2 text-white transition bg-gray-800 rounded hover:text-white/75"
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
									<button className="p-2 text-white transition bg-gray-800 rounded hover:text-white/75">
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

			<main className="max-w-screen-2xl p-4 mx-auto sm:px-6 lg:px-8">
				{children}
			</main>
		</>
	);
}
