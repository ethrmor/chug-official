import Link from 'next/link';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, forwardRef } from 'react';
import { ChevronDownIcon } from '@heroicons/react/solid';

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

export default function NavDropdown({ buttonName, listArray }) {
	return (
		<div className="">
			<Menu as="div" className="relative inline-block text-left">
				<>
					<Menu.Button className="inline-flex w-full justify-center rounded-md p-2 text-dark-text hover:bg-dark-bg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
						{buttonName}
						<ChevronDownIcon
							className="ml-2 -mr-1 h-5 w-5 text-white"
							aria-hidden="true"
						/>
					</Menu.Button>
				</>
				<Transition
					as={Fragment}
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="absolute right-0 mt-3.5 w-56 origin-top-right rounded-b-md bg-white dark:bg-dark-nav shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="px-1 py-1">
							{listArray.map((item) => (
								<Menu.Item key={item.id}>
									{({ active }) => (
										<MyLink
											href={item.id}
											className={`${
												active
													? 'bg-light-hover dark:bg-dark-nav dark:hover:bg-dark-bg  text-light-text dark:text-dark-text'
													: 'text-light-text dark:text-dark-text'
											} group flex w-full items-center rounded-md px-2 py-2 text-sm`}
										>
											{item.name}
										</MyLink>
									)}
								</Menu.Item>
							))}
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	);
}
