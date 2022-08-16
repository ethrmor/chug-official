import Link from 'next/link';
import React, { useState } from 'react';

import { useTable, useFlexLayout } from 'react-table';
import { Tab } from '@headlessui/react';
import { supabase } from '@/utils/supabaseClient';
import StatsDropdown from '@/components/StatsDropdown';
import PlayoffBracket from '@/components/PlayoffBracket';
import Head from 'next/head';

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
					className="min-w-full text-sm divide-y divide-light-line dark:divide-dark-line"
					{...getTableProps()}
				>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column, index) => (
									<th
										key={index}
										className="flex items-center justify-center  text-xs font-normal text-light-text-2 dark:text-dark-text-2"
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
									className="py-2 border-b last:border-0 dark:border-dark-line text-sm hover:bg-light-hover dark:hover:bg-dark-hover"
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

export default function Stats({ results, playoffs }) {
	const [year, setYear] = useState(years[0]);

	const filtered = !year
		? results
		: results.filter((person) => person.year.toString().includes(year.year));

	const filteredPlayoffs = !year
		? playoffs
		: playoffs.filter((person) => person.year?.toString().includes(year.year));

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
		<>
			<Head>
				<title>Standings | Chug League</title>
				<meta
					property="og:title"
					content={`Standings | Chug League`}
					key="title"
				/>
			</Head>
			<div className="flex flex-col">
				<h1 className="text-2xl mt-2 mb-4">Standings</h1>
				<div className="bg-white dark:bg-dark-surface rounded-md shadow-md pt-2">
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
								<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
									<Table columns={columns} data={data} />
								</div>
							</Tab.Panel>
							<Tab.Panel>
								<div className="wrapper overflow-x-auto">
									<div className="bg-white dark:bg-dark-surface rounded-md shadow-md py-2 px-4">
										<PlayoffBracket data={filteredPlayoffs} />
									</div>
								</div>
							</Tab.Panel>
						</Tab.Panels>
					</Tab.Group>
				</div>
			</div>
		</>
	);
}

export async function getStaticProps() {
	try {
		const { data: results } = await supabase
			.from('owners_seasons')
			.select('*, owner_id (*)')
			.order('regular_season_wins', { ascending: false })
			.order('regular_season_points_for', { ascending: false });

		const { data: playoffs } = await supabase
			.from('game_history')
			.select(
				'owner_id (team), playoff_bracket_id, playoff_rank, team_points, year'
			)
			.gte('playoff_rank', 1)
			.order('playoff_bracket_id', { ascending: true });

		return {
			props: { results, playoffs },
		};
	} catch (err) {
		console.error(err);
	}
}
