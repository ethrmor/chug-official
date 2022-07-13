// import { supabase } from '@/utils/supabaseClient';
// import React, { useState } from 'react';
// import FilterDropdown from '@/components/FilterDropdown';

// import { useFlexLayout, useTable } from 'react-table';
// import Link from 'next/link';

// const seasonTypes = [
// 	{ type: 'season', name: 'Regular Season' },
// 	{ type: 'playoffs', name: 'Playoffs' },
// ];

// const years = [
// 	{ year: 2022, name: '2022' },
// 	{ year: 2021, name: '2021' },
// 	{ year: 2020, name: '2020' },
// ];

// function Table({ columns, data }) {
// 	// Use the state and functions returned from useTable to build your UI
// 	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
// 		useTable(
// 			{
// 				columns,
// 				data,
// 			},
// 			useFlexLayout
// 		);

// 	// Render the UI for your table
// 	return (
// 		<>
// 			<div className="wrapper overflow-x-auto max-w-[894px] p-4">
// 				<table
// 					className="max-w-full text-sm divide-y divide-gray-200 dark:divide-[#555555]"
// 					{...getTableProps()}
// 				>
// 					<thead>
// 						{headerGroups.map((headerGroup, index) => (
// 							<tr key={index} {...headerGroup.getHeaderGroupProps()}>
// 								{headerGroup.headers.map((column, index) => (
// 									<th
// 										key={index}
// 										className="flex items-center justify-center py-2 text-xs font-normal text-gray-400"
// 										{...column.getHeaderProps()}
// 									>
// 										{column.render('Header')}
// 									</th>
// 								))}
// 							</tr>
// 						))}
// 					</thead>
// 					<tbody {...getTableBodyProps()}>
// 						{rows.map((row, i) => {
// 							prepareRow(row);
// 							return (
// 								<tr
// 									key={i}
// 									className="py-2 border-b last:border-0 dark:border-gray-600 text-sm hover:bg-gray-200 dark:hover:bg-gray-800"
// 									{...row.getRowProps()}
// 								>
// 									{row.cells.map((cell, index) => {
// 										return (
// 											<td key={index} {...cell.getCellProps()}>
// 												{cell.render('Cell')}
// 											</td>
// 										);
// 									})}
// 								</tr>
// 							);
// 						})}
// 					</tbody>
// 				</table>
// 			</div>
// 		</>
// 	);
// }

// export default function Schedule({ results }) {
// 	const [seasonType, setSeasonType] = useState(seasonTypes[0]);
// 	const [year, setYear] = useState(years[0]);

// 	const filtered = !year
// 		? results
// 		: results.filter((obj) => obj.year === year.year);

// 	const columns = React.useMemo(

// 		[]
// 	);

// 	const data = React.useMemo(() => filtered, [filtered]);

// 	return (
// 		<>
// 			<h1 className="text-2xl mt-2 mb-4">Standings</h1>
// 			<div className="grid md:grid-cols-[300px_1fr] gap-6 text-sm">
// 				<div className="flex flex-col gap-4 md:sticky top-20 self-start">
// 					<p>Filters</p>
// 					<FilterDropdown
// 						state={seasonType}
// 						setState={setSeasonType}
// 						listArray={seasonTypes}
// 					/>
// 					<FilterDropdown state={year} setState={setYear} listArray={years} />
// 				</div>
// 				<div className=" max-w-100 flex flex-col gap-4">
// 					<p>
// 						{year.name} -{' '}
// 						{seasonType.type === 'playoffs' ? `Playoffs` : `Regular Season`}
// 					</p>
// 					<div className="max-w-100 bg-white dark:bg-[#333333] p-4 shadow-md rounded-md hover:shadow-lg">
// 						{seasonType.type === 'season' ? (
// 							<>
// 								<Table columns={columns} data={data} />
// 							</>
// 						) : (
// 							<div>Playoffs</div>
// 						)}
// 					</div>
// 				</div>
// 			</div>
// 		</>
// 	);
// }

import Link from 'next/link';
import React, { useState } from 'react';

import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { useTable, useSortBy, usePagination, useFlexLayout } from 'react-table';
import { Tab } from '@headlessui/react';
import { supabase } from '@/utils/supabaseClient';
import Pagination from '@/components/Pagination';
import StatsDropdown from '@/components/StatsDropdown';

const years = [
	{ year: '2022', name: '2022' },
	{ year: '2021', name: '2021' },
	{ year: '2020', name: '2020' },
];

function Table({ columns, data }) {
	const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
		useTable(
			{
				columns,
				data,
				initialState: { pageIndex: 0, pageSize: 12 },
			},
			useFlexLayout
		);

	// Render the UI for your table
	return (
		<>
			<div className="wrapper overflow-x-auto p-4">
				<table
					className="min-w-full text-sm divide-y divide-gray-200 dark:divide-[#555555]"
					{...getTableProps()}
				>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column, index) => (
									<th
										key={index}
										className="flex items-center justify-center py-2 text-xs font-normal text-gray-400"
										{...column.getHeaderProps()}
									>
										{column.render('Header')}
									</th>
								))}
							</tr>
						))}
					</thead>
					<tbody {...getTableBodyProps()}>
						{rows.map((row, i) => {
							prepareRow(row);
							return (
								<tr
									key={i}
									className="py-2 border-b last:border-0 dark:border-gray-600 text-sm hover:bg-gray-200 dark:hover:bg-gray-800"
									{...row.getRowProps()}
								>
									{row.cells.map((cell, index) => {
										return (
											<td key={index} {...cell.getCellProps()}>
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
		</>
	);
}

export default function Stats({ results }) {
	const [year, setYear] = useState(years[0]);

	const filtered = !year
		? results
		: results.filter((person) => person.year.toString().includes(year.year));

	const columns = React.useMemo(
		() => [
			{
				Header: 'Team',
				accessor: 'owner_id.team',
				width: 200,
				Cell: (e) => (
					<>
						<Link href={`/owners/${e.row?.original?.owner_id.id}`}>
							<a className="pl-2">{e.row?.original?.owner_id.team}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Games Played',
				accessor: 'regular_season_games_played',
				width: 100,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Wins',
				accessor: 'regular_season_wins',
				width: 60,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Losses',
				accessor: 'regular_season_losses',
				width: 60,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Ties',
				accessor: 'regular_season_ties',
				width: 60,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Pct.',
				accessor: 'regular_season_pct',
				width: 80,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value.toFixed(3)}</p>
					</>
				),
			},
			{
				Header: 'Points',
				columns: [
					{
						Header: 'Points For',
						accessor: 'regular_season_points_for',
						width: 120,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'regular_season_points_against',
						width: 120,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Spread',
						accessor: 'regular_season_points_spread',
						width: 100,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Game High',
						accessor: 'regular_season_game_hi',
						width: 80,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value ? e.value.toFixed(2) : '0.00'}
								</p>
							</>
						),
					},
					{
						Header: 'Game Low',
						accessor: 'regular_season_game_lo',
						width: 80,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value ? e.value.toFixed(2) : '0.00'}
								</p>
							</>
						),
					},
				],
			},
			{
				Header: 'Transactions',
				columns: [
					{
						Header: 'Waivers',
						accessor: 'transactions',
						width: 60,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Trades',
						accessor: 'trades',
						width: 60,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
				],
			},
		],
		[]
	);

	const data = React.useMemo(() => filtered, [filtered]);

	const tabs = ['Regular Season', 'Playoff Bracket'];

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl mt-2 mb-4">Standings</h1>
			<div className="bg-white dark:bg-[#333333] rounded-md shadow-md pt-2">
				<div className="flex justify-between text-md border-b border-[#e5e5e5] dark:border-[#444444]">
					<div className="flex ">
						<Link href="/standings">
							<a className="border-b-2 border-red-600 pb-3 pt-2 px-4 outline-none">
								Standings
							</a>
						</Link>
					</div>
					<StatsDropdown state={year} setState={setYear} listArray={years} />
				</div>
				<Tab.Group>
					<Tab.List className="text-sm border-b border-[#e5e5e5] dark:border-[#444444]">
						{tabs.map((tab, index) => (
							<Tab
								key={index}
								className={({ selected }) =>
									selected
										? 'border-b-2 border-red-600 py-2 px-4 outline-none'
										: 'text-black/50 dark:text-white/50 py-2 px-4'
								}
							>
								{tab}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels className="">
						<Tab.Panel>
							<div className="bg-white dark:bg-[#333333] rounded-md shadow-md">
								<Table columns={columns} data={data} />
							</div>
						</Tab.Panel>
						<Tab.Panel>
							<div className="bg-white dark:bg-[#333333] rounded-md shadow-md py-2 px-4">
								<div className="grid grid-cols-4 grid-rows-10 py-8 text-sm">
									<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-1 row-end-2"></div>
									<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-1 row-end-2 border-b px-2 pb-1">
										<h2>
											<span className="text-xs font-bold text-black/40 pr-1">
												1
											</span>
											Macdaddys
										</h2>
										<p className="tabular-nums">142.44</p>
									</div>
									<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-1 row-end-2"></div>
									<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-1 row-end-2"></div>
									<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-2 row-end-3 border-b px-2 pb-1">
										<h2>
											<span className="text-xs font-bold text-black/40 pr-1">
												3
											</span>
											45ers
										</h2>
										<p className="tabular-nums">123.50</p>
									</div>
									<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-2 row-end-3 border-r"></div>
									<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-2 row-end-3 border-b px-2 pb-1">
										<h2>
											<span className="text-xs font-bold text-black/40 pr-1">
												6
											</span>
											Goathouse Alums
										</h2>
										<p className="tabular-nums">125.42</p>
									</div>
									<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-2 row-end-3"></div>
									<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-3 row-end-4 border-r"></div>
									<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-3 row-end-4 border-b border-r px-2 pb-1">
										<h2>
											<span className="text-xs font-bold text-black/40 pr-1">
												6
											</span>
											Goathouse Alums
										</h2>
										<p className="tabular-nums">151.46</p>
									</div>
									<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-3 row-end-4 border-r"></div>
									<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-3 row-end-4"></div>
									<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-4 row-end-5 border-b border-r px-2 pb-1">
										<h2>
											<span className="text-xs font-bold text-black/40 pr-1">
												6
											</span>
											Goathouse Alums
										</h2>
										<p className="tabular-nums">132.90</p>
									</div>
									<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-4 row-end-5"></div>
									<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-4 row-end-5 border-r"></div>
									<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-4 row-end-5"></div>
									<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-5 row-end-6"></div>
									<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-5 row-end-6"></div>
									<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-5 row-end-6 border-r"></div>
									<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-5 row-end-6 border-b px-2 pb-1">
										<h2>
											<span className="text-xs font-bold text-black/40 pr-1">
												2
											</span>
											Jeff City Leprechauns
										</h2>
									</div>
									<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-6 row-end 7"></div>
									<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-6 row-end 7"></div>
									<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-6 row-end-7 border-r"></div>
									<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-6 row-end-7"></div>
									<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-7 row-end-8"></div>
									<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-7 row-end-8 border-b px-2 pb-1">
										<h2>
											<span className="text-xs font-bold text-black/40 pr-1">
												2
											</span>
											Jeff City Leprechauns
										</h2>
										<p className="tabular-nums">145.56</p>
									</div>
									<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-7 row-end-8 border-r"></div>
									<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-7 row-end-8"></div>
									<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-8 row-end-9 border-b px-2 pb-1">
										<h2>
											<span className="text-xs font-bold text-black/40 pr-1">
												4
											</span>
											White Panthers
										</h2>
										<p className="tabular-nums">99.50</p>
									</div>
									<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-8 row-end-9 border-r"></div>
									<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-8 row-end-9 border-b border-r px-2 pb-1">
										<h2>
											<span className="text-xs font-bold text-black/40 pr-1">
												2
											</span>
											Jeff City Leprechauns
										</h2>
										<p className="tabular-nums">148.80</p>
									</div>
									<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-8 row-end-9"></div>
									<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-9 row-end-10 border-r"></div>
									<div className="flex items-end justify-between b-8 col-start-2 col-end-3 row-start-9 row-end-10 border-b border-r px-2 pb-1">
										<h2>
											<span className="text-xs font-bold text-black/40 pr-1">
												5
											</span>
											Slayton Slayerz
										</h2>
										<p className="tabular-nums">135.20</p>
									</div>
									<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-9 row-end-10"></div>
									<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-9 row-end-10"></div>
									<div className="flex items-end justify-between h-8 col-start-1 col-end-2 row-start-10 row-end-11 border-b border-r px-2 pb-1">
										<h2>
											<span className="text-xs font-bold text-black/40 pr-1">
												5
											</span>
											Slayton Slayerz
										</h2>
										<p className="tabular-nums">125.54</p>
									</div>
									<div className="flex items-end justify-between h-8 col-start-2 col-end-3 row-start-10 row-end-11"></div>
									<div className="flex items-end justify-between h-8 col-start-3 col-end-4 row-start-10 row-end-11"></div>
									<div className="flex items-end justify-between h-8 col-start-4 col-end-5 row-start-10 row-end-11"></div>
								</div>
							</div>
						</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
	);
}

export async function getStaticProps() {
	try {
		const { data: results } = await supabase
			.from('owners_seasons')
			.select('*, owner_id (*)')
			.order('regular_season_wins', { ascending: false })
			.order('regular_season_points_for', { ascending: false });

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
