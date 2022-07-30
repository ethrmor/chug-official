import RosterPosition from '@/components/RosterPosition';
import { leagueID, year } from '@/utils/chugLeague';
import { supabase } from '@/utils/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';

import React from 'react';
import { useTable, useFlexLayout } from 'react-table';
import { Tab } from '@headlessui/react';

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
			<div className="wrapper overflow-x-auto">
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

export default function Manager({
	positionsArray,
	owner,
	schedule,
	career,
	seasons,
	currentSeason,
}) {
	const columnsRegular = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">Career</p>
					</>
				),
			},
			{
				Header: 'Games',
				accessor: 'regular_season_games_played',
				width: 60,
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
				width: 50,
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
				width: 50,
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
				width: 60,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">
							{e.value.toFixed(3).toString().slice(1)}
						</p>
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
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'regular_season_points_spread',
						width: 70,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'High',
						accessor: 'regular_season_game_hi',
						width: 65,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Low',
						accessor: 'regular_season_game_lo',
						width: 65,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
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
						width: 50,
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
				Header: 'Year',
				accessor: 'year',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">Career</p>
					</>
				),
			},
			{
				Header: 'APR',
				accessor: 'apr',
				width: 70,
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
				width: 60,
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
				width: 80,
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
						width: 50,
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
						width: 50,
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
						accessor: 'expected_pct',
						width: 60,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value.toFixed(3).toString().slice(1)}
								</p>
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
						Header: 'Game Diff',
						accessor: 'max_points_diff_game',
						width: 80,
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
						width: 80,
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
				Header: 'Year',
				accessor: 'year',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">Career</p>
					</>
				),
			},
			{
				Header: 'Appearances',
				accessor: 'playoff_app',
				width: 80,
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
				width: 80,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Games',
				accessor: 'playoff_games_played',
				width: 90,
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
				accessor: 'playoff_losses',
				width: 80,
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
				width: 80,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">
							{e.value.toFixed(3).toString().slice(1)}
						</p>
					</>
				),
			},
			{
				Header: 'Points',
				columns: [
					{
						Header: 'Points For',
						accessor: 'playoff_points_for',
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
						accessor: 'playoff_points_against',
						width: 100,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'playoff_points_spread',
						width: 80,
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
				Header: 'Year',
				accessor: 'year',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">Career</p>
					</>
				),
			},
			{
				Header: 'Games',
				accessor: 'championship_games_played',
				width: 90,
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
				width: 90,
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
				accessor: 'championship_pct',
				width: 120,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">
							{e.value.toFixed(3).toString().slice(1)}
						</p>
					</>
				),
			},
			{
				Header: 'Points',
				columns: [
					{
						Header: 'Points For',
						accessor: 'championship_points_for',
						width: 140,
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
						width: 140,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'championship_points_spread',
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

	const columnsOverall = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">Career</p>
					</>
				),
			},
			{
				Header: 'Games',
				accessor: 'overall_games_played',
				width: 90,
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
				width: 90,
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
						<p className="tabular-nums text-center">
							{e.value.toFixed(3).toString().slice(1)}
						</p>
					</>
				),
			},
			{
				Header: 'Points',
				columns: [
					{
						Header: 'Points For',
						accessor: 'overall_points_for',
						width: 140,
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
						width: 140,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'overall_points_spread',
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

	const columnsPPG = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">Career</p>
					</>
				),
			},
			{
				Header: 'Regular Season',
				columns: [
					{
						Header: 'Points For',
						accessor: 'points_for_season_per_game',
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'points_against_season_per_game',
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'points_spread_season_per_game',
						width: 80,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
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
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'points_against_playoff_per_game',
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'points_spread_playoff_per_game',
						width: 75,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
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
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'points_against_championship_per_game',
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'points_spread_championship_per_game',
						width: 75,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
				],
			},
		],
		[]
	);

	const columnsRegularSeasons = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Games',
				accessor: 'regular_season_games_played',
				width: 60,
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
				width: 50,
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
				width: 50,
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
				width: 60,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">
							{e.value.toFixed(3).toString().slice(1)}
						</p>
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
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'regular_season_points_spread',
						width: 70,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'High',
						accessor: 'regular_season_game_hi',
						width: 65,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Low',
						accessor: 'regular_season_game_lo',
						width: 65,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
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
						width: 50,
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

	const columnsAdvancedSeasons = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'APR',
				accessor: 'apr',
				width: 70,
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
				width: 60,
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
				width: 80,
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
						width: 50,
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
						width: 50,
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
						accessor: 'expected_pct',
						width: 60,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value.toFixed(3).toString().slice(1)}
								</p>
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
						Header: 'Game Diff',
						accessor: 'max_points_diff_game',
						width: 80,
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
						width: 80,
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

	const columnsPlayoffsSeasons = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Appearances',
				accessor: 'playoff_app',
				width: 80,
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
				width: 80,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Games',
				accessor: 'playoff_games_played',
				width: 90,
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
				accessor: 'playoff_losses',
				width: 80,
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
				width: 80,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">
							{e.value.toFixed(3).toString().slice(1)}
						</p>
					</>
				),
			},
			{
				Header: 'Points',
				columns: [
					{
						Header: 'Points For',
						accessor: 'playoff_points_for',
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
						accessor: 'playoff_points_against',
						width: 100,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'playoff_points_spread',
						width: 80,
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

	const columnsChampionshipsSeasons = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Games',
				accessor: 'championship_games_played',
				width: 90,
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
				width: 90,
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
				accessor: 'championship_pct',
				width: 120,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">
							{e.value.toFixed(3).toString().slice(1)}
						</p>
					</>
				),
			},
			{
				Header: 'Points',
				columns: [
					{
						Header: 'Points For',
						accessor: 'championship_points_for',
						width: 140,
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
						width: 140,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'championship_points_spread',
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

	const columnsOverallSeasons = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Games',
				accessor: 'overall_games_played',
				width: 90,
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
				width: 90,
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
						<p className="tabular-nums text-center">
							{e.value.toFixed(3).toString().slice(1)}
						</p>
					</>
				),
			},
			{
				Header: 'Points',
				columns: [
					{
						Header: 'Points For',
						accessor: 'overall_points_for',
						width: 140,
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
						width: 140,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'overall_points_spread',
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

	const columnsPPGSeasons = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Regular Season',
				columns: [
					{
						Header: 'Points For',
						accessor: 'points_for_season_per_game',
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'points_against_season_per_game',
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'points_spread_season_per_game',
						width: 80,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
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
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'points_against_playoff_per_game',
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'points_spread_playoff_per_game',
						width: 75,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
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
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Points Against',
						accessor: 'points_against_championship_per_game',
						width: 90,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
					{
						Header: 'Spread',
						accessor: 'points_spread_championship_per_game',
						width: 75,
						sortType: 'basic',
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">
									{e.value?.toFixed(2)}
								</p>
							</>
						),
					},
				],
			},
		],
		[]
	);

	const data = React.useMemo(() => career, [career]);

	const seasonData = React.useMemo(() => seasons, [seasons]);

	const tabs = [
		'Regular Season',
		'Advanced',
		'Playoffs',
		'Championships',
		'Overall',
		'Game Averages',
	];

	const cols = [
		columnsRegular,
		columnsAdvanced,
		columnsPlayoffs,
		columnsChampionships,
		columnsOverall,
		columnsPPG,
	];

	const colsSeasons = [
		columnsRegularSeasons,
		columnsAdvancedSeasons,
		columnsPlayoffsSeasons,
		columnsChampionshipsSeasons,
		columnsOverallSeasons,
		columnsPPGSeasons,
	];

	return (
		<div>
			<h1 className="text-2xl mt-2 mb-4">{owner.team}</h1>
			<div className="grid gap-4 md:grid-cols-[350px_auto]">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div className="flex flex-col justify-center items-center py-4 px-4">
							<div className="relative h-60 w-60 my-4">
								<Image
									src={`/logo-${owner.slug}.webp`}
									alt={owner.name}
									layout="fill"
									objectFit="cover"
									className="z-0"
								></Image>
							</div>
							<div className="flex flex-col items-center pt-3 pb-3">
								<div className="flex flex-col items-center py-1 ">
									<p className="text-2xl">{owner.name}</p>
									<p className="text-sm text-light-text-2 dark:text-dark-text-2">
										Owner
									</p>
								</div>
								<div className="flex flex-col items-center py-1 ">
									<p className="text-2xl">{owner.favoriteTeam}</p>
									<p className="text-sm text-light-text-2 dark:text-dark-text-2">
										Favorite Team
									</p>
								</div>
							</div>
							<div className="grid w-full grid-cols-3 place-items-center text-center">
								<div>
									<h3 className="text-2xl">{career[0]?.regular_season_wins}</h3>
									<p className="text-xs text-light-text-2 dark:text-dark-text-2">
										Career Wins
									</p>
								</div>
								<div>
									<h3 className="text-2xl">{career[0]?.apr}</h3>
									<p className="text-xs text-light-text-2 dark:text-dark-text-2">
										Career APR
									</p>
								</div>
								<div>
									<h3 className="text-2xl">{career[0]?.legacy_score}</h3>
									<p className="text-xs text-light-text-2 dark:text-dark-text-2">
										Legacy Score
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2 bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div>
							<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
								{year} Quick Look
							</h2>
							<div className="flex flex-col gap-2 p-4">
								<div className="flex text-sm items-start justify-between">
									<p>Games Played</p>
									<p className="text-xl tabular-nums">
										{currentSeason[0]?.regular_season_games_played}
									</p>
								</div>
								<div className="flex text-sm items-start justify-between">
									<p>Wins</p>
									<p className="text-xl tabular-nums">
										{currentSeason[0]?.regular_season_wins}
									</p>
								</div>
								<div className="flex text-sm items-start justify-between">
									<p>Losses</p>
									<p className="text-xl tabular-nums">
										{currentSeason[0]?.regular_season_losses}
									</p>
								</div>
								{currentSeason[0]?.regular_season_ties !== 0 && (
									<div className="flex text-sm items-start justify-between">
										<p>Ties</p>
										<p className="text-xl tabular-nums">
											{currentSeason[0]?.regular_season_games_played}
										</p>
									</div>
								)}

								<div className="flex text-sm items-start justify-between">
									<p>Win Pct.</p>
									<p className="text-xl tabular-nums">
										{currentSeason[0]?.regular_season_pct.toString().slice(1) ||
											'.000'}
									</p>
								</div>
								<div className="flex text-sm items-start justify-between">
									<p>Points For</p>
									<p className="text-xl tabular-nums">
										{currentSeason[0]?.regular_season_points_for?.toFixed(2)}
									</p>
								</div>
								<div className="flex text-sm items-start justify-between">
									<p>Points Against</p>
									<p className="text-xl tabular-nums">
										{currentSeason[0]?.regular_season_points_against?.toFixed(
											2
										)}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2 bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div>
							<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
								{year} Schedule
							</h2>
							<div className="flex flex-col gap-2 py-4 px-2">
								{schedule.map((game, index) => (
									<Link
										href={`/schedule/${game.game_id}`}
										className="flex flex-col gap-2"
										key={index}
									>
										<a className="text-sm  px-2 hover:bg-light-hover hover:dark:bg-dark-hover round-md">
											<span className="text-xs text-light-text-2 dark:text-dark-text-2">
												Week {game.week}
											</span>
											<div className="flex justify-between">
												<span className="">vs {game.opponent_id.team}</span>
												<span>
													<span
														className={
															game.team_points > game.opponent_points
																? `text-light-text dark:text-dark-text tabular-nums text-right`
																: `text-light-text-2 dark:text-dark-text-2 tabular-nums text-right`
														}
													>
														{game.team_points?.toFixed(2) || '0.00'}
													</span>
													{' - '}
													<span
														className={
															game.team_points < game.opponent_points
																? `text-light-text dark:text-dark-text tabular-nums text-right`
																: `text-light-text-2 dark:text-dark-text-2 tabular-nums text-right`
														}
													>
														{game.opponent_points?.toFixed(2) || '0.00'}
													</span>
												</span>
											</div>
										</a>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4 min-w-0">
					<div className="flex flex-col bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div>
							<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
								Career Stats
							</h2>
							<div className="flex flex-col gap-2">
								<Tab.Group>
									<Tab.List className="text-sm border-b border-[#e5e5e5] dark:border-[#444444]">
										{tabs.map((tab, index) => (
											<Tab
												style={{ borderColor: owner.primaryColor }}
												key={index}
												className={({ selected }) =>
													selected
														? 'border-b-2 py-2 px-4 outline-none'
														: 'text-black/50 dark:text-white/50 py-2 px-4'
												}
											>
												{tab}
											</Tab>
										))}
									</Tab.List>
									<Tab.Panels className="px-4">
										{cols.map((col, index) => (
											<Tab.Panel key={index}>
												<div className="bg-white dark:bg-dark-surface rounded-md pt-2 pb-4">
													<Table columns={col} data={data} />
												</div>
											</Tab.Panel>
										))}
									</Tab.Panels>
								</Tab.Group>
							</div>
						</div>
					</div>
					<div className="flex flex-col bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div>
							<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
								Season Stats
							</h2>
							<div className="flex flex-col gap-2">
								<Tab.Group>
									<Tab.List className="text-sm border-b border-[#e5e5e5] dark:border-[#444444]">
										{tabs.map((tab, index) => (
											<Tab
												style={{ borderColor: owner.primaryColor }}
												key={index}
												className={({ selected }) =>
													selected
														? 'border-b-2 py-2 px-4 outline-none'
														: 'text-black/50 dark:text-white/50 py-2 px-4'
												}
											>
												{tab}
											</Tab>
										))}
									</Tab.List>
									<Tab.Panels className="px-4">
										{colsSeasons.map((col, index) => (
											<Tab.Panel key={index}>
												<div className="bg-white dark:bg-dark-surface rounded-md pt-2 pb-4">
													<Table columns={col} data={seasonData} />
												</div>
											</Tab.Panel>
										))}
									</Tab.Panels>
								</Tab.Group>
							</div>
						</div>
					</div>
					<div className="flex flex-col bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div>
							<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
								Roster
							</h2>
							<div className="flex flex-col gap-2 p-4">
								<RosterPosition
									arr={positionsArray[0]}
									position={'Quarterbacks'}
								/>
								<RosterPosition
									arr={positionsArray[1]}
									position={'Runningbacks'}
								/>
								<RosterPosition
									arr={positionsArray[2]}
									position={'Wide Receivers'}
								/>
								<RosterPosition
									arr={positionsArray[3]}
									position={'Tight Ends'}
								/>
								<RosterPosition
									arr={positionsArray[4]}
									position={'Defensive Line'}
								/>
								<RosterPosition
									arr={positionsArray[5]}
									position={'Linebackers'}
								/>
								<RosterPosition
									arr={positionsArray[6]}
									position={'Defensive Backs'}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	const paths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((owner) => ({
		params: { slug: owner.toString() },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	try {
		const res = await fetch(
			`https://api.sleeper.app/v1/league/${leagueID}/rosters/`
		);
		const rosters = await res.json();

		const rostersArray = Object.values(rosters);

		const currentOwner = rostersArray.filter((obj) => {
			return obj.roster_id === parseInt(params.slug);
		});

		const currentRoster = currentOwner[0].players;

		const { data: ownerArray } = await supabase
			.from('owners')
			.select('*')
			.eq('id', parseInt(params.slug));

		const owner = ownerArray[0];

		const { data: players } = await supabase
			.from('players')
			.select('*')
			.in('player_id', currentRoster)
			.order('number', { ascending: true });

		const qbArray = players.filter((obj) => {
			return obj.position === 'QB';
		});

		const rbArray = players.filter((obj) => {
			return obj.position === 'RB';
		});

		const wrArray = players.filter((obj) => {
			return obj.position === 'WR';
		});

		const teArray = players.filter((obj) => {
			return obj.position === 'TE';
		});

		const dlArray = players.filter((obj) => {
			return obj.fantasy_positions[0] === 'DL';
		});

		const lbArray = players.filter((obj) => {
			return obj.fantasy_positions[0] === 'LB';
		});

		const dbArray = players.filter((obj) => {
			return obj.fantasy_positions[0] === 'DB';
		});

		const positionsArray = [
			qbArray,
			rbArray,
			wrArray,
			teArray,
			dlArray,
			lbArray,
			dbArray,
		];

		const { data: schedule } = await supabase
			.from('game_history')
			.select('*, owner_id (team), opponent_id (team)')
			.eq('owner_id', parseInt(params.slug))
			.eq('year', year);

		const { data: career } = await supabase
			.from('owners_career')
			.select('*')
			.eq('id', parseInt(params.slug));

		const { data: seasons } = await supabase
			.from('owners_seasons')
			.select('*')
			.eq('owner_id', parseInt(params.slug));

		const { data: currentSeason } = await supabase
			.from('owners_seasons')
			.select('*')
			.eq('owner_id', parseInt(params.slug))
			.eq('year', year);

		return {
			props: {
				positionsArray,
				owner,
				schedule,
				career,
				seasons,
				currentSeason,
			},
		};
	} catch (err) {
		console.error(err);
	}
}
