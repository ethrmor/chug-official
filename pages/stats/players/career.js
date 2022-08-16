import Link from 'next/link';
import React from 'react';

import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { useTable, useSortBy, useFlexLayout, usePagination } from 'react-table';
import { Tab } from '@headlessui/react';
import { supabase } from '@/utils/supabaseClient';
import Pagination from '@/components/Pagination';
import StatsDropdown from '@/components/StatsDropdown';
import Head from 'next/head';

const positions = [
	{ position: '', name: 'All Positions' },
	{ position: 'QB', name: 'QB' },
	{ position: 'RB', name: 'RB' },
	{ position: 'WR', name: 'WR' },
	{ position: 'TE', name: 'TE' },
	{ position: 'DL', name: 'DL' },
	{ position: 'LB', name: 'LB' },
	{ position: 'DB', name: 'DB' },
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
			initialState: { pageIndex: 0, pageSize: 10 },
		},
		useFlexLayout,
		useSortBy,
		usePagination
	);

	// Render the UI for your table
	return (
		<>
			<div className="wrapper overflow-x-auto p-4">
				<table
					className="min-w-full text-sm divide-y divide-light-line dark:divide-dark-line"
					{...getTableProps()}
				>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column, index) => (
									<th
										key={index}
										className="flex items-center justify-center text-xs font-normal text-light-text-2 dark:text-dark-text-2"
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
									className="py-2 border-b last:border-0 border-light-line dark:border-dark-line text-sm hover:bg-light-hover dark:hover:bg-dark-hover"
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

export default function Stats({ career, season, playoff, probowl }) {
	const [position, setPosition] = React.useState(positions[0]);

	const filteredOverall = !position
		? career
		: career.filter((person) => person.position.includes(position.position));

	const filteredRegular = !position
		? season
		: season.filter((person) => person.position.includes(position.position));

	const filteredPlayoff = !position
		? playoff
		: playoff.filter((person) => person.position.includes(position.position));

	const filteredProBowl = !position
		? probowl
		: probowl.filter((person) => person.position.includes(position.position));

	const columns = React.useMemo(
		() => [
			{
				Header: 'Name',
				accessor: 'player_name',
				width: 200,
				Cell: ({ row }) => (
					<>
						<Link href={`/players/${row?.original?.player_id}`}>
							<a>{row?.original?.player_name}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Position',
				accessor: 'position',
				width: 60,
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
						<p className="tabular-nums text-center">{e.value?.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'Passing',
				columns: [
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
						Header: 'TD',
						accessor: 'pass_td',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Int',
						accessor: 'pass_int',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: '2 Pt',
						accessor: 'pass_2pt',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
				],
			},
			{
				Header: 'Rushing',
				columns: [
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
						Header: 'TD',
						accessor: 'rush_td',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: '2 Pt',
						accessor: 'rush_2pt',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
				],
			},
			{
				Header: 'Receiving',
				columns: [
					{
						Header: 'Rec',
						accessor: 'rec',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Yards',
						accessor: 'rec_yards',
						width: 70,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'TD',
						accessor: 'rec_td',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: '2 Pt',
						accessor: 'rec_2pt',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
				],
			},
			{
				Header: 'Fumbles',
				accessor: 'fum_lost',
				width: 50,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Special Teams',
				columns: [
					{
						Header: 'FF',
						accessor: 'st_ff',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'FR',
						accessor: 'st_fr',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'TD',
						accessor: 'st_td',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
				],
			},
			{
				Header: 'Defense',
				columns: [
					{
						Header: 'Solo',
						accessor: 'idp_solo',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Asst',
						accessor: 'idp_asst',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'TFL',
						accessor: 'idp_tfl',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'QB Hit',
						accessor: 'idp_qbhit',
						width: 60,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Sacks',
						accessor: 'idp_sack',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'PD',
						accessor: 'idp_pd',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Int',
						accessor: 'idp_int',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'FF',
						accessor: 'idp_ff',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'FR',
						accessor: 'idp_fr',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Safety',
						accessor: 'idp_saf',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'TD',
						accessor: 'idp_td',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Blocks',
						accessor: 'idp_blockkick',
						width: 50,
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

	const dataOverall = React.useMemo(() => filteredOverall, [filteredOverall]);
	const dataRegular = React.useMemo(() => filteredRegular, [filteredRegular]);
	const dataPlayoff = React.useMemo(() => filteredPlayoff, [filteredPlayoff]);
	const dataProBowl = React.useMemo(() => filteredProBowl, [filteredProBowl]);

	const tabs = ['Overall', 'Regular Season', 'Playoffs', 'Pro Bowl'];

	const data = [dataOverall, dataRegular, dataPlayoff, dataProBowl];

	return (
		<>
			<Head>
				<title>Career Statistics | Chug League</title>
				<meta
					property="og:title"
					content={`Career Statistics | Chug League`}
					key="title"
				/>
			</Head>
			<div className="flex flex-col">
				<h1 className="text-2xl mt-2 mb-4">Player Statistics</h1>
				<div className="bg-white dark:bg-dark-surface rounded-md shadow-md pt-2">
					<div className="md:hidden flex pb-4 pt-2 justify-center">
						<StatsDropdown
							state={position}
							setState={setPosition}
							listArray={positions}
						/>
					</div>
					<div>
						<div className="flex justify-between text-md border-b border-[#e5e5e5] dark:border-[#444444]">
							<div className="flex">
								<Link href="/stats/players/career">
									<a className="border-b-2 border-red-600 px-4 outline-none pb-3 pt-2">
										Career
									</a>
								</Link>
								<Link href="/stats/players/seasons">
									<a className="text-black/50 dark:text-white/50 px-4 pb-3 pt-2">
										Seasons
									</a>
								</Link>
								<Link href="/stats/players/games">
									<a className="text-black/50 dark:text-white/50 pb-3 pt-2 px-4">
										Games
									</a>
								</Link>
							</div>
							<div className="hidden md:flex">
								<StatsDropdown
									state={position}
									setState={setPosition}
									listArray={positions}
								/>
							</div>
						</div>
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
							{data.map((data, index) => (
								<Tab.Panel key={index}>
									<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
										<Table columns={columns} data={data} />
									</div>
								</Tab.Panel>
							))}
						</Tab.Panels>
					</Tab.Group>
				</div>
			</div>
		</>
	);
}

export async function getStaticProps() {
	try {
		const { data: career } = await supabase
			.from('players_career')
			.select('*')
			.order('fantasy_points', { ascending: false });

		const { data: season } = await supabase
			.from('players_career_season')
			.select('*')
			.order('fantasy_points', { ascending: false });

		const { data: playoff } = await supabase
			.from('players_career_playoff')
			.select('*')
			.order('fantasy_points', { ascending: false });

		const { data: probowl } = await supabase
			.from('players_career_probowl')
			.select('*')
			.order('fantasy_points', { ascending: false });

		return {
			props: { career, season, playoff, probowl },
		};
	} catch (err) {
		console.error(err);
	}
}
