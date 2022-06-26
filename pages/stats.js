import Link from 'next/link';
import React from 'react';

import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import {
	CheckIcon,
	SelectorIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
} from '@heroicons/react/solid';

import { useTable, usePagination, useSortBy, useFlexLayout } from 'react-table';

function Table({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page, // Instead of using 'rows', we'll use page,
		// which has only the rows for the active page

		// The rest of these things are super handy, too ;)
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize,
		state: { pageIndex, pageSize },
	} = useTable(
		{
			columns,
			data,
			initialState: { pageIndex: 0, pageSize: 25 },
		},
		useFlexLayout,
		useSortBy,
		usePagination
	);

	// Render the UI for your table
	return (
		<>
			<div className="wrapper overflow-x-auto bg-white border rounded-md shadow-sm p-4">
				<table
					{...getTableProps()}
					className="min-w-full text-sm divide-y divide-gray-200"
				>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column, index) => (
									<th
										key={index}
										{...column.getHeaderProps(column.getSortByToggleProps())}
										className="sticky left-0 pb-4 text-left"
									>
										{column.render('Header')}
										<span>
											{column.isSorted
												? column.isSortedDesc
													? ' ▼'
													: ' ▲'
												: ''}
										</span>
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{page.map((row, index) => {
							prepareRow(row);
							return (
								<tr key={index} {...row.getRowProps()}>
									{row.cells.map((cell, index) => {
										return (
											<td key={index} {...cell.getCellProps()} className="">
												{cell.render('Cell')}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			{/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
			<div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200">
				<div className="flex-1 flex justify-between sm:hidden">
					<button
						onClick={() => previousPage()}
						disabled={!canPreviousPage}
						className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
					>
						{'Previous'}
					</button>{' '}
					<button
						onClick={() => nextPage()}
						disabled={!canNextPage}
						className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
					>
						{'Next'}
					</button>
				</div>
				<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between ">
					<span className="text-sm text-gray-700">
						Showing Page{' '}
						<strong>
							{pageIndex + 1} <span className="font-normal">of</span>{' '}
							{pageOptions.length}
						</strong>{' '}
					</span>
					<div className="flex gap-2">
						<span className="text-sm">
							Show:{' '}
							<select
								value={pageSize}
								onChange={(e) => {
									setPageSize(Number(e.target.value));
								}}
								className="relative h-[38px] inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
							>
								{[10, 25, 50, 100, 250].map((pageSize) => (
									<option key={pageSize} value={pageSize}>
										{pageSize}
									</option>
								))}
							</select>
						</span>
						<span className="text-sm hidden md:block">
							Go to page:{' '}
							<input
								// type="number"
								defaultValue={pageIndex + 1}
								onChange={(e) => {
									const page = e.target.value ? Number(e.target.value) - 1 : 0;
									gotoPage(page);
								}}
								style={{ width: '60px' }}
								className="relative hidden md:inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
							/>
						</span>{' '}
						<div className="flex gap-2">
							<button
								onClick={() => gotoPage(0)}
								disabled={!canPreviousPage}
								className="relative hidden lg:inline-flex items-center p-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{'First'}
							</button>
							<button
								onClick={() => previousPage()}
								disabled={!canPreviousPage}
								className="relative inline-flex items-center p-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{'Previous'}
							</button>
							<button
								onClick={() => nextPage()}
								disabled={!canNextPage}
								className="relative inline-flex items-center p-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{'Next'}
							</button>
							<button
								onClick={() => gotoPage(pageCount - 1)}
								disabled={!canNextPage}
								className="relative hidden lg:inline-flex items-center p-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{'Last'}
							</button>{' '}
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

function SelectMenu({ people }) {
	const [selected, setSelected] = useState({ name: 'All Players' });
	const [query, setQuery] = useState('');

	const filteredPeople =
		query === ''
			? people
			: people.filter((person) =>
					person.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	return (
		<div className="w-60 z-10">
			<Combobox value={selected} onChange={setSelected}>
				<div className="relative mt-1">
					<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
						<Combobox.Input
							className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
							displayValue={(person) => person.name}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
							<SelectorIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className="absolute mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{filteredPeople.length === 0 && query !== '' ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									Nothing found.
								</div>
							) : (
								filteredPeople.map((person) => (
									<Combobox.Option
										key={person.id}
										className={({ active }) =>
											`relative cursor-pointer select-none py-2 pl-4 pr-4 ${
												active ? 'bg-red-600 text-white' : 'text-gray-900'
											}`
										}
										value={person}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? 'font-medium' : 'font-normal'
													}`}
												>
													{person.name}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? 'text-white' : 'text-red-600'
														}`}
													></span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
}

const people = [
	{ id: 1, name: 'Ethan' },
	{ id: 2, name: 'Jacob' },
	{ id: 3, name: 'Scott' },
	{ id: 4, name: 'Morgan' },
	{ id: 5, name: 'Jorden' },
];

function SelectPlayer() {
	const [selected, setSelected] = useState({ name: '' });
	const [query, setQuery] = useState('');

	const filteredPeople =
		query === ''
			? people
			: people.filter((person) =>
					person.name
						.toLowerCase()
						.replace(/\s+/g, '')
						.includes(query.toLowerCase().replace(/\s+/g, ''))
			  );

	return (
		<div className="w-48 z-10">
			<Combobox value={selected} onChange={setSelected}>
				<div className="relative mt-1">
					<div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
						<Combobox.Input
							className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
							displayValue={(person) => person.name}
							onChange={(event) => setQuery(event.target.value)}
						/>
						<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
							<SelectorIcon
								className="h-5 w-5 text-gray-400"
								aria-hidden="true"
							/>
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
						afterLeave={() => setQuery('')}
					>
						<Combobox.Options className="absolute mt-1 max-h-96 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{filteredPeople.length === 0 && query !== '' ? (
								<div className="relative cursor-default select-none py-2 px-4 text-gray-700">
									Nothing found.
								</div>
							) : (
								filteredPeople.map((person) => (
									<Combobox.Option
										key={person.id}
										className={({ active }) =>
											`relative cursor-pointer select-none py-2 pl-10 pr-4 ${
												active ? 'bg-red-600 text-white' : 'text-gray-900'
											}`
										}
										value={person}
									>
										{({ selected, active }) => (
											<>
												<span
													className={`block truncate ${
														selected ? 'font-medium' : 'font-normal'
													}`}
												>
													{person.name}
												</span>
												{selected ? (
													<span
														className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
															active ? 'text-white' : 'text-red-600'
														}`}
													></span>
												) : null}
											</>
										)}
									</Combobox.Option>
								))
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
		</div>
	);
}

export default function Stats({ results, playerNameOptions }) {
	const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'player_name',
				width: 200,
				Cell: (e) => (
					<>
						<Link href={`/players/${e.row?.original?.player_id}`}>
							<a>{e.row?.original?.player_name}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Owner',
				accessor: 'owner',
				width: 80,
			},

			{
				Header: 'FP',
				accessor: 'fantasy_points',
				width: 50,
				Cell: (e) => (
					<>
						<p>{e.value}</p>
					</>
				),
			},
		],
		[]
	);

	const data = React.useMemo(() => results, [results]);

	return (
		<>
			<h1 className="text-3xl my-12">Statistics</h1>
			<div className="flex gap-4 pb-4">
				<SelectMenu people={playerNameOptions} />
				<SelectPlayer />
			</div>
			<Table columns={columns} data={data} />
		</>
	);
}

export async function getStaticProps() {
	try {
		const res = await fetch(
			'https://ethanrmorris.github.io/v1/stats/players/games.json'
		);
		const results = await res.json();

		const playerNameOptions = [
			...new Set(results.map((player) => player.player_name)),
		]
			.sort()
			.map((string, index) => ({ id: index + 1, name: string }));

		return {
			props: { results, playerNameOptions },
		};
	} catch (err) {
		console.error(err);
	}
}
