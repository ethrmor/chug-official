/* This example requires Tailwind CSS v2.0+ */
import { forwardRef, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import { useTheme } from 'next-themes';
import Link from 'next/link';
import Image from 'next/image';
import NavDropdown from './NavDropdown';

const navigation = [
	{ name: 'Dashboard', href: '#', current: true },
	{ name: 'Team', href: '#', current: false },
	{ name: 'Projects', href: '#', current: false },
	{ name: 'Calendar', href: '#', current: false },
];

// eslint-disable-next-line react/display-name
const MyLink = forwardRef((props, ref) => {
	let { href, children, ...rest } = props;
	return (
		<Link href={href}>
			<a ref={ref} {...rest}>
				{children}
			</a>
		</Link>
	);
});

export default function Navigaton({ owners, league, stats }) {
	const { theme, setTheme } = useTheme();
	return (
		<Disclosure as="nav">
			{({ open }) => (
				<>
					<div className="max-w-screen-xl px-4 mx-auto sm:px-6 lg:px-8">
						<div className="relative flex items-center justify-between h-16">
							<div className="absolute inset-y-0 left-0 flex items-center md:hidden">
								{/* Mobile menu button*/}
								<Disclosure.Button className="inline-flex p-2 text-white transition bg-dark-surface hover:bg-dark-bg rounded">
									<span className="sr-only">Open main menu</span>
									{open ? (
										<XIcon className="block h-5 w-5" aria-hidden="true" />
									) : (
										<MenuIcon className="block h-5 w-5" aria-hidden="true" />
									)}
								</Disclosure.Button>
							</div>
							<div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
								<div className="flex-shrink-0 flex items-center">
									<Link href="/">
										<a className="flex">
											<span className="sr-only">Home</span>
											<Image
												src="/logo.webp"
												width={70}
												height={40}
												alt={'Logo'}
											/>
										</a>
									</Link>
								</div>
							</div>
							<div>
								<div className="hidden md:block">
									<div className="flex space-x-4 gap-2">
										<h2 className="sr-only" id="header-navigation">
											Header navigation
										</h2>

										<ul className="flex items-center gap-2 text-sm group">
											<li className="">
												<Link href="/">
													<a className="text-white transition hover:bg-dark-bg p-2 rounded-md">
														Home
													</a>
												</Link>
											</li>
											<li>
												<NavDropdown
													buttonName={'Franchises'}
													listArray={owners}
												/>
											</li>
											<li>
												<Link href="/schedule">
													<a className="text-white transition hover:bg-dark-bg p-2 rounded-md">
														Schedule
													</a>
												</Link>
											</li>
											<li>
												<Link href="/standings">
													<a className="text-white transition hover:bg-dark-bg p-2 rounded-md">
														Standings
													</a>
												</Link>
											</li>
											<li>
												<NavDropdown buttonName={'Stats'} listArray={stats} />
											</li>
											<li>
												<NavDropdown buttonName={'League'} listArray={league} />
											</li>
											<li>
												<Link href="/news">
													<a className="text-white transition hover:bg-dark-bg p-2 rounded-md">
														News
													</a>
												</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="absolute inset-y-0 right-0 flex items-center md:static md:inset-auto md:ml-4">
								<button
									onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
									className="p-2 text-white transition bg-dark-surface hover:bg-dark-bg rounded"
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
							</div>
						</div>
					</div>

					<Transition
						as={Fragment}
						enter="transition ease-out duration-300"
						enterFrom="transform opacity-0 scale-95"
						enterTo="transform opacity-100 scale-100"
						leave="transition ease-in duration-75"
						leaveFrom="transform opacity-100 scale-100"
						leaveTo="transform opacity-0 scale-95"
					>
						<Disclosure.Panel className="sm:hidden">
							<div className="px-2 pt-2 pb-3 space-y-1">
								<div className="flex flex-col mt-6 space-y-1">
									<Disclosure.Button as={MyLink} href="/">
										<a className="flex items-center px-4 py-2 text-white rounded-md hover:bg-dark-nav">
											<span className="ml-3 text-sm font-medium">Home</span>
										</a>
									</Disclosure.Button>

									<details className="group">
										<summary className="flex items-center px-4 py-2 text-white rounded-lg cursor-pointer hover:bg-dark-nav">
											<span className="ml-3 text-sm font-medium">
												Franchises
											</span>

											<span className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="w-5 h-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
														clipRule="evenodd"
													/>
												</svg>
											</span>
										</summary>

										<nav className="py-2 pl-8 flex flex-col">
											{owners.map((owner) => (
												<Disclosure.Button
													as={MyLink}
													href={`${owner.id}`}
													key={owner.id}
												>
													<a className="flex items-center px-4 py-2 text-white rounded-md hover:bg-dark-nav">
														<span className="ml-3 text-sm font-medium">
															{' '}
															{owner.name}{' '}
														</span>
													</a>
												</Disclosure.Button>
											))}
										</nav>
									</details>

									<Disclosure.Button as={MyLink} href="/schedule">
										<a className="flex items-center px-4 py-2 text-white rounded-md hover:bg-dark-nav">
											<span className="ml-3 text-sm font-medium">Schedule</span>
										</a>
									</Disclosure.Button>

									<Disclosure.Button as={MyLink} href="/standings">
										<a className="flex items-center px-4 py-2 text-white rounded-md hover:bg-dark-nav">
											<span className="ml-3 text-sm font-medium">
												Standings
											</span>
										</a>
									</Disclosure.Button>

									<details className="group">
										<summary className="flex items-center px-4 py-2 text-white rounded-lg cursor-pointer hover:bg-dark-nav">
											<span className="ml-3 text-sm font-medium"> Stats </span>

											<span className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="w-5 h-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
														clipRule="evenodd"
													/>
												</svg>
											</span>
										</summary>

										<nav className="py-2 pl-8 flex flex-col">
											{stats.map((owner) => (
												<Disclosure.Button
													as={MyLink}
													href={`${owner.id}`}
													key={owner.id}
												>
													<a className="flex items-center px-4 py-2 text-white rounded-md hover:bg-dark-nav">
														<span className="ml-3 text-sm font-medium">
															{' '}
															{owner.name}{' '}
														</span>
													</a>
												</Disclosure.Button>
											))}
										</nav>
									</details>

									<details className="group">
										<summary className="flex items-center px-4 py-2 text-white rounded-lg cursor-pointer hover:bg-dark-nav">
											<span className="ml-3 text-sm font-medium"> League </span>

											<span className="ml-auto transition duration-300 shrink-0 group-open:-rotate-180">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="w-5 h-5"
													viewBox="0 0 20 20"
													fill="currentColor"
												>
													<path
														fillRule="evenodd"
														d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
														clipRule="evenodd"
													/>
												</svg>
											</span>
										</summary>

										<nav className="py-2 pl-8 flex flex-col">
											{league.map((owner) => (
												<Disclosure.Button
													as={MyLink}
													href={`${owner.id}`}
													key={owner.id}
												>
													<a className="flex items-center px-4 py-2 text-white rounded-md hover:bg-dark-nav">
														<span className="ml-3 text-sm font-medium">
															{' '}
															{owner.name}{' '}
														</span>
													</a>
												</Disclosure.Button>
											))}
										</nav>
									</details>

									<Disclosure.Button as={MyLink} href="/news">
										<a className="flex items-center px-4 py-2 text-white rounded-md hover:bg-dark-nav">
											<span className="ml-3 text-sm font-medium">News</span>
										</a>
									</Disclosure.Button>
								</div>
							</div>
						</Disclosure.Panel>
					</Transition>
				</>
			)}
		</Disclosure>
	);
}
