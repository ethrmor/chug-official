import Link from 'next/link';
import Image from 'next/image';

export default function Layout({ children }) {
	return (
		<>
			{/* <header className="bg-gray-900">
				<div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
					<Image src="/logo.webp" width={80} height={50} alt={'Logo'} />
					<div>
						<nav>
							<ul>
								<li>
									<Link href="/">
										<a>Home</a>
									</Link>
								</li>
								<li>
									<Link href="/trades">
										<a>Trades</a>
									</Link>
								</li>
								<li>
									<Link href="/stats">
										<a>Stats</a>
									</Link>
								</li>
								<li>
									<Link href="/owners">
										<a>Owners</a>
									</Link>
									<ul>
										<li>
											<Link href="/owners/1">
												<a>Ethan</a>
											</Link>
										</li>
										<li>
											<Link href="/owners/2">
												<a>Jacob</a>
											</Link>
										</li>
										<li>
											<Link href="/owners/3">
												<a>Scott</a>
											</Link>
										</li>
										<li>
											<Link href="/owners/4">
												<a>Morgan</a>
											</Link>
										</li>
									</ul>
								</li>
								<li>
									<Link href="/players">
										<a>Players</a>
									</Link>
								</li>
								<li>
									<Link href="/supabase">
										<a>Supabase</a>
									</Link>
								</li>
							</ul>
						</nav>
						<div>Toggle</div>
					</div>
				</div>
			</header> */}
			<header className="bg-gray-900">
				<div className="max-w-screen-2xl px-4 mx-auto sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16">
						<div className="flex-1 md:flex md:items-center md:gap-12">
							<Link href="/">
								<a className="flex text-teal-300">
									<span className="sr-only">Home</span>
									<Image src="/logo.webp" width={70} height={40} alt={'Logo'} />
								</a>
							</Link>
						</div>

						<div className="md:flex md:items-center md:gap-12 ">
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
											<a className="group-hover:text-gray-500 text-white transition hover:text-white">
												About
											</a>
										</Link>
									</li>
									<li>
										<Link href="/trades">
											<a className="group-hover:text-gray-500 text-white transition hover:text-white/75">
												Trades
											</a>
										</Link>
									</li>
									<li>
										<Link href="/stats">
											<a className="group-hover:text-gray-500 text-white transition hover:text-white/75">
												Stats
											</a>
										</Link>
									</li>
									<li>
										<Link href="/owners">
											<a className="group-hover:text-gray-500 text-white transition hover:text-white/75">
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
											<a className="group-hover:text-gray-500 text-white transition hover:text-white/75">
												Players
											</a>
										</Link>
									</li>
									<li>
										<Link href="/supabase">
											<a className="group-hover:text-gray-500 text-white transition hover:text-white">
												Supabase
											</a>
										</Link>
									</li>
								</ul>
							</nav>

							<div className="flex items-center gap-4">
								<div className="sm:gap-4 sm:flex">
									<Link href="/">
										<a className="px-5 py-2.5 text-sm font-medium text-white bg-teal-600 rounded-md shadow">
											Dk
										</a>
									</Link>
								</div>

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

			<main>{children}</main>
		</>
	);
}
