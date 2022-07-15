import Link from 'next/link';
import React, { useState } from 'react';

import {
	useTable,
	useFlexLayout,
	usePagination,
	useExpanded,
} from 'react-table';
import { Tab } from '@headlessui/react';
import { supabase } from '@/utils/supabaseClient';
import StatsDropdown from '@/components/StatsDropdown';
import Pagination from '@/components/Pagination';
import { nflTeams } from '@/utils/nflTeams';

const years = [
	{ year: '2022', name: '2022' },
	{ year: '2021', name: '2021' },
];

function Table({ columns, data }) {
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page,
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
			initialState: { pageIndex: 0, pageSize: 12 },
		},
		useFlexLayout,
		useExpanded,
		usePagination
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
						{page.map((row, i) => {
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
			<Pagination
				canPreviousPage={canPreviousPage}
				canNextPage={canNextPage}
				pageCount={pageCount}
				pageOptions={pageOptions}
				pageSize={pageSize}
				pageIndex={pageIndex}
				gotoPage={gotoPage}
				nextPage={nextPage}
				previousPage={previousPage}
				setPageSize={setPageSize}
			/>
		</>
	);
}

export default function Stats({ rookie, startup }) {
	const [year, setYear] = useState(years[0]);

	const filtered = !year
		? rookie
		: rookie.filter((person) => person.year.toString().includes(year.year));

	const rookieColumns = React.useMemo(
		() => [
			{
				Header: 'Pick',
				columns: [
					{
						Header: 'Overall',
						accessor: 'overall_pick',
						width: 80,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Round',
						accessor: 'round',
						width: 80,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Pick',
						accessor: 'pick',
						width: 80,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
				],
			},
			{
				Header: 'Franchise',
				accessor: 'owner_id.team',
				width: 220,
				Cell: (e) => (
					<>
						<Link href={`/owners/${e.row?.original?.owner_id.id}`}>
							<a className="pl-2">{e.row?.original?.owner_id.team}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Player',
				accessor: 'player',
				width: 220,
				Cell: (e) => (
					<>
						<Link href={`/players/${e.row?.original?.player_id.player_id}`}>
							<a className="pl-2">{e.row?.original?.player}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Team',
				accessor: 'nfl_team',
				width: 220,
				Cell: (e) => (
					<>
						<p className="">{nflTeams[e.value.toUpperCase()]}</p>
					</>
				),
			},
			{
				Header: 'Position',
				accessor: 'position',
				width: 140,
				Cell: (e) => (
					<>
						<p className="text-center">{e.value}</p>
					</>
				),
			},

			{
				Header: 'Position Rank',
				accessor: 'position_rank',
				width: 140,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
		],
		[]
	);

	const startupColumns = React.useMemo(
		() => [
			{
				Header: 'Pick',
				columns: [
					{
						Header: 'Overall',
						accessor: 'overall_pick',
						width: 80,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Round',
						accessor: 'round',
						width: 80,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Pick',
						accessor: 'pick',
						width: 80,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
				],
			},
			{
				Header: 'Franchise',
				accessor: 'owner_id.team',
				width: 220,
				Cell: (e) => (
					<>
						<Link href={`/owners/${e.row?.original?.owner_id.id}`}>
							<a className="pl-2">{e.row?.original?.owner_id.team}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Player',
				accessor: 'player',
				width: 220,
				Cell: (e) => (
					<>
						<Link href={`/players/${e.row?.original?.player_id.player_id}`}>
							<a className="pl-2">{e.row?.original?.player}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Team',
				accessor: 'nfl_team',
				width: 220,
				Cell: (e) => (
					<>
						<p className="">{nflTeams[e.value.toUpperCase()]}</p>
					</>
				),
			},
			{
				Header: 'Position',
				accessor: 'position',
				width: 140,
				Cell: (e) => (
					<>
						<p className="text-center">{e.value}</p>
					</>
				),
			},

			{
				Header: 'Position Rank',
				accessor: 'position_rank',
				width: 140,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
		],
		[]
	);

	const rookieData = React.useMemo(() => filtered, [filtered]);

	const startUpData = React.useMemo(() => startup, [startup]);

	const tabs = ['Rookie', 'Startup'];

	const cols = [
		{ column: rookieColumns, data: rookieData },
		{ column: startupColumns, data: startUpData },
	];

	const [selectedIndex, setSelectedIndex] = useState();

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl mt-2 mb-4">Drafts</h1>
			<div className="bg-white dark:bg-[#333333] rounded-md shadow-md pt-2">
				<Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
					<Tab.List className="text-sm border-b border-[#e5e5e5] dark:border-[#444444] flex justify-between">
						<div>
							{tabs.map((tab, index) => (
								<Tab
									key={index}
									className={({ selected }) =>
										selected
											? 'border-b-2 border-red-600 pt-2 pb-4 px-4 outline-none'
											: 'text-black/50 dark:text-white/50 py-2 px-4'
									}
								>
									{tab}
								</Tab>
							))}
						</div>
						{selectedIndex !== 1 && (
							<StatsDropdown
								state={year}
								setState={setYear}
								listArray={years}
							/>
						)}
					</Tab.List>
					<Tab.Panels className="">
						{cols.map((col, index) => (
							<Tab.Panel key={index}>
								<div className="bg-white dark:bg-[#333333] rounded-md shadow-md">
									<Table columns={col.column} data={col.data} />
								</div>
							</Tab.Panel>
						))}
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
	);
}

export async function getStaticProps() {
	try {
		const { data: rookie } = await supabase
			.from('draft_rookie')
			.select('*, owner_id (*), player_id (*)');

		const { data: startup } = await supabase
			.from('draft_startup')
			.select('*, owner_id (*), player_id (*)')
			.order('overall_pick', { ascending: true });

		return {
			props: { rookie, startup },
		};
	} catch (err) {
		console.error(err);
	}
}
