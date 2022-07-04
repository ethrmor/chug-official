import Link from 'next/link';
import React from 'react';

import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import { useTable, useSortBy, useFlexLayout } from 'react-table';
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
										className="flex items-center justify-center py-2"
										{...column.getHeaderProps(column.getSortByToggleProps())}
									>
										{column.render('Header')}
										<span>
											{column.isSorted ? (
												column.isSortedDesc ? (
													<ArrowSmDownIcon className="h-5 w-5" />
												) : (
													<ArrowSmUpIcon className="h-5 w-5" />
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
									className="py-4 border-b last:border-0 dark:border-gray-600"
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
	const columns = React.useMemo(
		() => [
			{
				Header: 'Team',
				accessor: 'id.team',
				width: 200,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<Link href={`/owners/${e.row?.original?.id.id}`}>
							<a>{e.row?.original?.id.team}</a>
						</Link>
					</>
				),
			},
			{
				Header: 'Games Played',
				accessor: 'regular_season_games_played',
				width: 80,
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
				accessor: 'regular_season_losses',
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
				accessor: 'regular_season_ties',
				width: 50,
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
				Header: 'Points For',
				accessor: 'regular_season_points_for',
				width: 100,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
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
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Points Spread',
				accessor: 'regular_season_points_spread',
				width: 80,
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
				width: 70,
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
				width: 70,
				sortType: 'basic',
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value.toFixed(2)}</p>
					</>
				),
			},
		],
		[]
	);

	const data = React.useMemo(() => results, [results]);

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-3xl mt-2 mb-4">Statistics</h1>
			<div className="bg-white dark:bg-[#333333] rounded-md shadow-md">
				<h2 className="text-lg border-b-2 p-4">Regular Season</h2>
				<Table columns={columns} data={data} />
			</div>
			<div className="bg-white dark:bg-[#333333] rounded-md shadow-md">
				<h2 className="text-lg border-b-2 p-4">Advanced</h2>
				<Table columns={columns} data={data} />
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

		console.log(results);

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
