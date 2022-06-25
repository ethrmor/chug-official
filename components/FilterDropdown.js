import { Fragment, React } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';

export default function FilterDropdown({ state, setState, listArray }) {
	return (
		<div className="w-full">
			<Listbox value={state} onChange={setState}>
				<div className="relative">
					<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white dark:bg-[#333333] py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-base">
						<span className="block truncate">{state.name}</span>
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
						<Listbox.Options className="absolute mt-1 max-h-60 w-full z-40 overflow-auto rounded-sm bg-white dark:bg-[#333333] py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
							{listArray.map((person, personIdx) => (
								<Listbox.Option
									key={personIdx}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4 ${
											active ? 'bg-red-600 text-white' : 'text-black'
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
											{state ? (
												<span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
													<CheckIcon className="h-5 w-5" aria-hidden="true" />
												</span>
											) : null}
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
