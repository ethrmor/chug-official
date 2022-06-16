import Link from 'next/link';
import Image from 'next/image';

export default function Layout({ children }) {
	return (
		<>
			<div>
				<header>
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
				</header>
			</div>
			<main>{children}</main>
		</>
	);
}
