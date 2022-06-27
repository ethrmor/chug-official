import Link from 'next/link';
import React from 'react';

import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { SelectorIcon } from '@heroicons/react/solid';

import { useTable, usePagination, useSortBy, useFlexLayout } from 'react-table';
import Pagination from '@/components/Pagination';
import { supabase } from '@/utils/supabaseClient';

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
			initialState: { pageIndex: 0, pageSize: 25 },
		},
		useFlexLayout,
		useSortBy,
		usePagination
	);

	// Render the UI for your table
	return (
		<>
			<div className="wrapper overflow-x-auto bg-white dark:bg-[#333333] rounded-t-md shadow-md p-4">
				<table
					{...getTableProps()}
					className="min-w-full text-sm divide-y divide-gray-200 dark:divide-[#555555]"
				>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column, index) => (
									<th
										key={index}
										{...column.getHeaderProps(column.getSortByToggleProps())}
										className=""
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

const people = [
	{ id: 1, name: 'Ethan' },
	{ id: 2, name: 'Jacob' },
	{ id: 3, name: 'Scott' },
	{ id: 4, name: 'Morgan' },
	{ id: 5, name: 'Jorden' },
];

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
				Header: 'Team',
				accessor: 'team',
				width: 160,
			},
			{
				Header: 'Pos',
				accessor: 'position',
				width: 50,
			},
			{
				Header: 'Year',
				accessor: 'year',
				width: 50,
			},
			{
				Header: 'Week',
				accessor: 'week',
				width: 50,
			},
			{
				Header: 'FP',
				accessor: 'fantasy_points',
				width: 50,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-right">{e.value.toFixed(2)}</p>
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
								<p className="tabular-nums text-right">{e.value}</p>
							</>
						),
					},
					{
						Header: 'TD',
						accessor: 'pass_td',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-right">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Int',
						accessor: 'pass_int',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-right">{e.value}</p>
							</>
						),
					},
					{
						Header: '2Pt',
						accessor: 'pass_2pt',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-right">{e.value}</p>
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
								<p className="tabular-nums text-right">{e.value}</p>
							</>
						),
					},
					{
						Header: 'TD',
						accessor: 'rush_td',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-right">{e.value}</p>
							</>
						),
					},
					{
						Header: '2Pt',
						accessor: 'rush_2pt',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-right">{e.value}</p>
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
								<p className="tabular-nums text-right">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Yards',
						accessor: 'rec_yards',
						width: 70,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-right">{e.value}</p>
							</>
						),
					},
					{
						Header: 'TD',
						accessor: 'rec_td',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-right">{e.value}</p>
							</>
						),
					},
					{
						Header: '2Pt',
						accessor: 'rec_2pt',
						width: 50,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-right">{e.value}</p>
							</>
						),
					},
				],
			},
		],
		[]
	);

	const data = React.useMemo(() => results, [results]);

	return (
		<>
			<h1 className="text-4xl mt-2 mb-4">Statistics</h1>
			<div className="flex gap-4 pb-4">
				<select>
					<option>One</option>
				</select>
				<select>
					<option>Two</option>
				</select>
			</div>
			<Table columns={columns} data={data} />
		</>
	);
}

export async function getStaticProps() {
	try {
		const { data: results } = await supabase
			.from('game_logs')
			.select('*')
			// .or('owner_1.eq.ethan,owner_2.eq.ethan,owner_3.eq.ethan')
			.order('rank', { ascending: true });

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
