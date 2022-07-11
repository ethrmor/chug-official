import Link from 'next/link';
import React, { useState } from 'react';

import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import {
	useTable,
	useSortBy,
	usePagination,
	useFlexLayout,
	useExpanded,
} from 'react-table';
import { Tab } from '@headlessui/react';
import { supabase } from '@/utils/supabaseClient';
import Pagination from '@/components/Pagination';
import StatsDropdown from '@/components/StatsDropdown';

const years = [
	{ year: '', name: 'All Years' },
	{ year: '2022', name: '2022' },
	{ year: '2021', name: '2021' },
	{ year: '2020', name: '2020' },
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
		useSortBy,
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
										{...column.getHeaderProps(column.getSortByToggleProps())}
									>
										{column.render('Header')}
										<span>
											{column.isSorted ? (
												column.isSortedDesc ? (
													<ArrowSmDownIcon className="h-4 w-4" />
												) : (
													<ArrowSmUpIcon className="h-4 w-4" />
												)
											) : (
												''
											)}
										</span>
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

export default function Stats({ results }) {
	const [year, setYear] = useState(years[0]);

	const filtered = !year
		? results
		: results.filter((person) => person.year.toString().includes(year.year));

	const columnsRegular = React.useMemo(
		() => [
			{
				id: 'expander',
				width: 0,
				Cell: ({ row }) => (
					<span
						{...row.getToggleRowExpandedProps()}
					>
					</span>
				),
			},
			{
				Header: 'Name',
				accessor: 'player_name',
				width: 200,
				Cell: ({ row }) =>
					row.depth === 1 ? null : (
						<>
							<Link href={`/players/${row?.original?.player_id}`}>
								<a>{row?.original?.player_name}</a>
							</Link>
						</>
					),
			},
			{
				Header: 'Team',
				accessor: 'owner',
				width: 175,
				Cell: ({ row }) =>
					row.canExpand ? (
						<span
							{...row.getToggleRowExpandedProps({
								style: {
									paddingLeft: `${row.depth * 2}rem`,
								},
							})}
						>
							{row?.original?.subRows.length} Teams
						</span>
					) : (
						<span>
							{row.original.owner
								? row?.original?.owner
								: row?.original?.owner_id.team}
						</span>
					),
			},
			{
				Header: 'Year',
				accessor: 'year',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'FP',
				accessor: 'fantasy_points',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'Yards',
				accessor: 'pass_yards',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'TDs',
				accessor: 'pass_td',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Int',
				accessor: 'pass_int',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: '2 Pt',
				accessor: 'pass_2pt',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Yards',
				accessor: 'rush_yards',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Tds',
				accessor: 'rush_td',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: '2 Pt',
				accessor: 'rush_2pt',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Solo',
				accessor: 'idp_solo',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Asst',
				accessor: 'idp_asst',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Int',
				accessor: 'idp_int',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'sack',
				accessor: 'idp_sack',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
		],
		[]
	);

	const data = React.useMemo(() => filtered, [filtered]);

	const tabs = ['Overall', 'Regular Season', 'Playoffs', 'Pro Bowl'];

	const cols = [
		// columnsOverall,
		columnsRegular,
		// columnsPlayoffs,
		// columnsProBowl,
	];

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl mt-2 mb-4">Player Statistics</h1>
			<div className="bg-white dark:bg-[#333333] rounded-md shadow-md pt-2">
				<div className="flex justify-between text-md border-b border-[#e5e5e5] dark:border-[#444444]">
					<div className="flex ">
						<Link href="/stats/players/career">
							<a className="text-black/50 dark:text-white/50 pb-3 pt-2 px-4">
								Career
							</a>
						</Link>
						<Link href="/stats/players/seasons">
							<a className="border-b-2 border-red-600 pb-3 pt-2 px-4 outline-none">
								Seasons
							</a>
						</Link>
						<Link href="/stats/players/games">
							<a className="text-black/50 dark:text-white/50 pb-3 pt-2 px-4">
								Games
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
						{cols.map((col, index) => (
							<Tab.Panel key={index}>
								<div className="bg-white dark:bg-[#333333] rounded-md shadow-md">
									<Table columns={col} data={data} />
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
		const { data: seasons } = await supabase
			.from('players_seasons')
			.select('*')
			.order('fantasy_points', { ascending: false });

		const { data: details } = await supabase
			.from('players_details')
			.select('*, owner_id (*)')
			.order('fantasy_points', { ascending: false });

		function filterDetails(player) {
			return details.filter((obj) => {
				return obj.player_id === player.player_id && obj.year === player.year;
			});
		}

		const results = seasons.map((e) => ({
			...e,
			subRows: filterDetails(e).length > 1 ? filterDetails(e) : null,
			owner:
				filterDetails(e).length < 2 ? filterDetails(e)[0]?.owner_id.team : null,
		}));

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
