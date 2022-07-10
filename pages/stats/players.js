import Link from 'next/link';
import React from 'react';

import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { useTable, useSortBy, useFlexLayout } from 'react-table';
import { Tab } from '@headlessui/react';
import { supabase } from '@/utils/supabaseClient';

function Table({ columns, data }) {
	const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
		useTable(
			{
				columns,
				data,
			},
			useFlexLayout,
			useSortBy
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
	const columnsRegular = React.useMemo(
		() => [
			{
				Header: 'Team',
				accessor: 'id.team',
				width: 200,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<Link href={`/owners/${e.row?.original?.id.id}`}>
							<a className="pl-2">{e.row?.original?.id.team}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Games Played',
				accessor: 'regular_season_games_played',
				width: 110,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Wins',
				accessor: 'regular_season_wins',
				width: 70,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Losses',
				accessor: 'regular_season_losses',
				width: 70,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Ties',
				accessor: 'regular_season_ties',
				width: 40,
				sortType: 'basic',
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
				sortType: 'basic',
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
						width: 100,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'regular_season_points_against',
						width: 100,
						sortType: 'basic',
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
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'High Score',
						accessor: 'regular_season_game_hi',
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Low Score',
						accessor: 'regular_season_game_lo',
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
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
						width: 70,
						sortType: 'basic',
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
						sortType: 'basic',
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

	const columnsAdvanced = React.useMemo(
		() => [
			{
				Header: 'Team',
				accessor: 'id.team',
				width: 200,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<Link href={`/owners/${e.row?.original?.id.id}`}>
							<a className="pl-2">{e.row?.original?.id.team}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'APR',
				accessor: 'apr',
				width: 80,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'APR+',
				accessor: 'apr_plus',
				width: 80,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Legacy Score',
				accessor: 'legacy_score',
				width: 100,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Expected',
				columns: [
					{
						Header: 'Wins',
						accessor: 'expected_wins',
						width: 80,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Losses',
						accessor: 'expected_losses',
						width: 80,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Ties',
						accessor: 'expected_ties',
						width: 60,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Pct.',
						accessor: 'expected_pct',
						width: 80,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(3)}</p>
							</>
						),
					},
				],
			},
			{
				Header: 'Maximum Points',
				columns: [
					{
						Header: 'Points For',
						accessor: 'max_points_for',
						width: 100,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Diff.',
						accessor: 'max_points_diff',
						width: 100,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Diff./Game',
						accessor: 'max_points_diff_game',
						width: 120,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Pct.',
						accessor: 'max_points_pct',
						width: 100,
						sortType: 'basic',
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

	const columnsPlayoffs = React.useMemo(
		() => [
			{
				Header: 'Team',
				accessor: 'id.team',
				width: 200,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<Link href={`/owners/${e.row?.original?.id.id}`}>
							<a className="pl-2">{e.row?.original?.id.team}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Appearances',
				accessor: 'playoff_app',
				width: 120,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Byes',
				accessor: 'playoff_bye',
				width: 100,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Games Played',
				accessor: 'playoff_games_played',
				width: 120,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Wins',
				accessor: 'playoff_wins',
				width: 100,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Losses',
				accessor: 'playoff_losses',
				width: 100,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Pct.',
				accessor: 'playoff_pct',
				width: 100,
				sortType: 'basic',
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
						accessor: 'playoff_points_for',
						width: 120,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'playoff_points_against',
						width: 120,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Spread',
						accessor: 'playoff_points_spread',
						width: 100,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
				],
			},
		],
		[]
	);

	const columnsChampionships = React.useMemo(
		() => [
			{
				Header: 'Team',
				accessor: 'id.team',
				width: 200,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<Link href={`/owners/${e.row?.original?.id.id}`}>
							<a className="pl-2">{e.row?.original?.id.team}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Games Played',
				accessor: 'championship_games_played',
				width: 120,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Wins',
				accessor: 'championship_wins',
				width: 120,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Losses',
				accessor: 'championship_losses',
				width: 120,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Pct.',
				accessor: 'championship_pct',
				width: 140,
				sortType: 'basic',
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
						accessor: 'championship_points_for',
						width: 160,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'championship_points_against',
						width: 160,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Spread',
						accessor: 'championship_points_spread',
						width: 160,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
				],
			},
		],
		[]
	);

	const columnsOverall = React.useMemo(
		() => [
			{
				Header: 'Team',
				accessor: 'id.team',
				width: 200,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<Link href={`/owners/${e.row?.original?.id.id}`}>
							<a className="pl-2">{e.row?.original?.id.team}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Games Played',
				accessor: 'overall_games_played',
				width: 120,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Wins',
				accessor: 'overall_wins',
				width: 100,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Losses',
				accessor: 'overall_losses',
				width: 100,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Ties',
				accessor: 'overall_ties',
				width: 90,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Pct.',
				accessor: 'overall_pct',
				width: 120,
				sortType: 'basic',
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
						accessor: 'overall_points_for',
						width: 150,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'overall_points_against',
						width: 150,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Spread',
						accessor: 'overall_points_spread',
						width: 150,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
				],
			},
		],
		[]
	);

	const columnsPPG = React.useMemo(
		() => [
			{
				Header: 'Team',
				accessor: 'id.team',
				width: 200,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<Link href={`/owners/${e.row?.original?.id.id}`}>
							<a className="pl-2">{e.row?.original?.id.team}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Regular Season',
				columns: [
					{
						Header: 'Points For',
						accessor: 'points_for_season_per_game',
						width: 120,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'points_against_season_per_game',
						width: 100,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Spread',
						accessor: 'points_spread_season_per_game',
						width: 100,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
				],
			},
			{
				Header: 'Playoffs',
				columns: [
					{
						Header: 'Points For',
						accessor: 'points_for_playoff_per_game',
						width: 120,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'points_against_playoff_per_game',
						width: 100,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Spread',
						accessor: 'points_spread_playoff_per_game',
						width: 100,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
				],
			},
			{
				Header: 'Championships',
				columns: [
					{
						Header: 'Points For',
						accessor: 'points_for_championship_per_game',
						width: 120,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'points_against_championship_per_game',
						width: 100,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Points Spread',
						accessor: 'points_spread_championship_per_game',
						width: 100,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
				],
			},
		],
		[]
	);

	const data = React.useMemo(() => results, [results]);

	const tabs = [
		'Regular Season',
		'Advanced',
		'Playoffs',
		'Championships',
		'Overall',
		'PPG',
	];

	const cols = [
		columnsRegular,
		columnsAdvanced,
		columnsPlayoffs,
		columnsChampionships,
		columnsOverall,
		columnsPPG,
	];

	return (
		<div className="flex flex-col">
			<h1 className="text-2xl mt-2 mb-4">Player Statistics</h1>
			<div className="bg-white dark:bg-[#333333] rounded-md shadow-md pt-2">
				<Tab.Group>
					<Tab.List className="text-sm border-b border-[#e5e5e5] dark:border-[#444444]">
						{tabs.map((tab, index) => (
							<Tab
								key={index}
								className={({ selected }) =>
									selected
										? 'border-b-2 border-red-600 pb-2 px-4 outline-none'
										: 'text-black/50 dark:text-white/50 pb-2 px-4'
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
		const { data: results } = await supabase
			.from('owners_career')
			.select('*, id (*)')
			.order('apr_plus', { ascending: false });

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
