import { Fragment, React } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export default function FilterDropdown({ state, setState, listArray }) {
	return (
		<div className="">
			<Listbox value={state} onChange={setState}>
				<div className="relative">
					<Listbox.Button className="relative inline-flex items-center mr-4 px-4 py-2 border border-gray-300 text-sm font-normal rounded-md text-gray-700 dark:text-white dark:bg-transparent bg-white hover:bg-gray-50">
						<span className="block truncate text-sm pr-5">{state.name}</span>
						<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
							<SelectorIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute text-sm max-h-60 mt-1 z-40 overflow-auto rounded-sm bg-white dark:bg-[#333333] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							{listArray.map((person, personIdx) => (
								<Listbox.Option
									key={personIdx}
									className={({ active }) =>
										`relative cursor-pointer select-none py-2 pl-4 pr-10 ${
											active
												? 'bg-red-600 text-white'
												: 'text-black dark:text-white'
										}`
									}
									value={person}
								>
									{({ state }) => (
										<>
											<span
												className={`block truncate ${
													state ? 'font-medium' : 'font-normal'
												}`}
											>
												{person.name}
											</span>
										</>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
}
