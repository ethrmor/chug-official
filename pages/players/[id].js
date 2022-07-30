import Image from 'next/image';
import { nflTeams } from '@/utils/nflTeams';
import { supabase } from '@/utils/supabaseClient';
import { leagueID } from '@/utils/chugLeague';
import React from 'react';
import Pagination from '@/components/Pagination';
import { ArrowSmDownIcon, ArrowSmUpIcon } from '@heroicons/react/solid';
import {
	useExpanded,
	useFlexLayout,
	usePagination,
	useSortBy,
	useTable,
} from 'react-table';

function PagTable({ columns, data }) {
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

function SeasonTable({ columns, data }) {
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
		useExpanded,
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
		</>
	);
}

function Table({ columns, data }) {
	const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
		useTable(
			{
				columns,
				data,
				initialState: { pageIndex: 0, pageSize: 10 },
			},
			useFlexLayout,
			useSortBy
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
						{rows.map((row, i) => {
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
		</>
	);
}

export default function Player({ player }) {
	const columnsOffense = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 60,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">
							{e.value ? e.value : 'Career'}
						</p>
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
				width: 80,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value?.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'FP/G',
				accessor: 'fpg',
				width: 80,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value?.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'Games',
				accessor: 'games_played',
				width: 60,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Passing',
				columns: [
					{
						Header: 'Yards',
						accessor: 'pass_yards',
						width: 80,
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
						width: 80,
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
						width: 55,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Yards',
						accessor: 'rec_yards',
						width: 80,
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
		],
		[]
	);
	const columnsOffenseSeason = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 60,
				Cell: ({ row }) =>
					row.depth === 1 ? null : (
						<>
							<p className="tabular-nums text-center">{row?.original?.year}</p>
						</>
					),
			},
			{
				Header: 'Team',
				accessor: 'owner',
				width: 150,
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
								: row?.original?.owner_id?.team}
						</span>
					),
			},
			{
				Header: 'Position',
				accessor: 'position',
				width: 50,
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
				Header: 'FP/G',
				accessor: 'fpg',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value?.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'Games',
				accessor: 'games_played',
				width: 45,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
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
						width: 45,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Int',
						accessor: 'pass_int',
						width: 45,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: '2 Pt',
						accessor: 'pass_2pt',
						width: 45,
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
						width: 45,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: '2 Pt',
						accessor: 'rush_2pt',
						width: 45,
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
						width: 45,
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
						width: 45,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: '2 Pt',
						accessor: 'rec_2pt',
						width: 45,
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
						width: 40,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'FR',
						accessor: 'st_fr',
						width: 40,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'TD',
						accessor: 'st_td',
						width: 40,
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
	const columnsOffenseGames = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 60,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">
							{e.value ? e.value : 'Career'}
						</p>
					</>
				),
			},
			{
				Header: 'Team',
				accessor: 'owner_id.team',
				width: 150,
				Cell: (e) => (
					<>
						<p className="tabular-nums">{e.value}</p>
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
				Header: 'Week',
				accessor: 'week',
				width: 50,
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
						width: 45,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'FR',
						accessor: 'st_fr',
						width: 45,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'TD',
						accessor: 'st_td',
						width: 45,
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

	const columnsDefense = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 60,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">
							{e.value ? e.value : 'Career'}
						</p>
					</>
				),
			},
			{
				Header: 'Position',
				accessor: 'position',
				width: 80,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'FP',
				accessor: 'fantasy_points',
				width: 80,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value?.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'FP/G',
				accessor: 'fpg',
				width: 80,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value?.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'Games',
				accessor: 'games_played',
				width: 70,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Defense',
				columns: [
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
						Header: 'TFL',
						accessor: 'idp_tfl',
						width: 70,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'QB Hit',
						accessor: 'idp_qbhit',
						width: 70,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Sacks',
						accessor: 'idp_sack',
						width: 70,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'PD',
						accessor: 'idp_pd',
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
						Header: 'FF',
						accessor: 'idp_ff',
						width: 60,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'FR',
						accessor: 'idp_fr',
						width: 60,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Safety',
						accessor: 'idp_saf',
						width: 70,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'TD',
						accessor: 'idp_td',
						width: 60,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Blocks',
						accessor: 'idp_blockkick',
						width: 70,
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
	const columnsDefenseSeason = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 60,
				Cell: ({ row }) =>
					row.depth === 1 ? null : (
						<>
							<p className="tabular-nums text-center">{row?.original?.year}</p>
						</>
					),
			},
			{
				Header: 'Team',
				accessor: 'owner',
				width: 150,
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
								: row?.original?.owner_id?.team}
						</span>
					),
			},
			{
				Header: 'Position',
				accessor: 'position',
				width: 50,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'FP',
				accessor: 'fantasy_points',
				width: 80,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value?.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'FP/G',
				accessor: 'fpg',
				width: 80,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value?.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'Games',
				accessor: 'games_played',
				width: 55,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'Defense',
				columns: [
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
						Header: 'TFL',
						accessor: 'idp_tfl',
						width: 60,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'QB Hit',
						accessor: 'idp_qbhit',
						width: 70,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Sacks',
						accessor: 'idp_sack',
						width: 80,
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
	const columnsDefenseGames = React.useMemo(
		() => [
			{
				Header: 'Year',
				accessor: 'year',
				width: 60,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">
							{e.value ? e.value : 'Career'}
						</p>
					</>
				),
			},
			{
				Header: 'Team',
				accessor: 'owner_id.team',
				width: 150,
				Cell: (e) => (
					<>
						<p className="tabular-nums">{e.value}</p>
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
				Header: 'Week',
				accessor: 'week',
				width: 50,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value}</p>
					</>
				),
			},
			{
				Header: 'FP',
				accessor: 'fantasy_points',
				width: 80,
				Cell: (e) => (
					<>
						<p className="tabular-nums text-center">{e.value?.toFixed(2)}</p>
					</>
				),
			},
			{
				Header: 'Defense',
				columns: [
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
						Header: 'TFL',
						accessor: 'idp_tfl',
						width: 70,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'QB Hit',
						accessor: 'idp_qbhit',
						width: 70,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Sacks',
						accessor: 'idp_sack',
						width: 70,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'PD',
						accessor: 'idp_pd',
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
						Header: 'FF',
						accessor: 'idp_ff',
						width: 60,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'FR',
						accessor: 'idp_fr',
						width: 60,
						Cell: (e) => (
							<>
								<p className="tabular-nums text-center">{e.value}</p>
							</>
						),
					},
					{
						Header: 'Safety',
						accessor: 'idp_saf',
						width: 60,
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

	const dataCareer = React.useMemo(() => player.career, [player.career]);
	const dataSeason = React.useMemo(() => player.seasons, [player.seasons]);
	const dataGames = React.useMemo(() => player.games, [player.games]);

	return (
		<div className="flex flex-col gap-4">
			<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
				<div
					style={{
						backgroundImage: `url(/player-header-${
							player.owner !== 'none' ? player.owner : 'league'
						}.jpg)`,
					}}
					className={`w-full h-[175px] md:h-[225px] lg:h-[275px] bg-no-repeat bg-cover bg-right shadow-md mt-[-1rem]`}
				></div>
				<div className="relative h-24 w-24 md:h-36 md:w-36 bg-white dark:bg-dark-surface rounded-full mt-[-4rem] md:mt-[-6rem] mx-auto border-2 border-light-text-2 dark:border-light-text">
					{player.years_exp >= 1 ? (
						<Image
							src={`https://sleepercdn.com/content/nfl/players/${player.player_id}.jpg`}
							alt={player.full_name}
							layout="fill"
							objectFit="cover"
							className="rounded-full"
						></Image>
					) : (
						<Image
							src={`https://sleepercdn.com/images/v2/icons/player_default.webp`}
							alt={player.full_name}
							layout="fill"
							objectFit="cover"
							className="rounded-full"
						></Image>
					)}{' '}
				</div>
				<div className="flex items-center justify-center py-4 text-xl font-semibold">
					<h1 className="">{player.full_name}</h1>
					<span className="px-2">|</span>
					<span className="">#{player.number}</span>
				</div>
				<div className="flex flex-col sm:flex-row gap-2 sm:gap-0 items-center justify-center pb-4 text-md">
					<div className="flex">
						<p>{player.fantasy_positions[0]}</p>
						<span className="px-2">|</span>
						<p>
							{Math.floor(player.height / 12)}&apos;
							{player.height - Math.floor(player.height / 12) * 12}&quot;
						</p>
						<span className="px-2">|</span>
						<p>{player.weight} lb</p>
						<span className="px-2 hidden sm:flex">|</span>
					</div>
					<div className="flex">
						<p>Age: {player.age}</p>
						<span className="px-2">|</span>
						<p>{player.college}</p>
						<span className="px-2 hidden sm:flex">|</span>
					</div>
					<div className="flex items-center">
						<div className="relative h-7 w-7">
							<Image
								src={
									player.team
										? `https://sleepercdn.com/images/team_logos/nfl/${player.team.toLowerCase()}.png`
										: `/logo.webp`
								}
								alt="Team Logo"
								layout="fill"
								objectFit="contain"
							></Image>
						</div>
						<p className="pl-2">
							{nflTeams[player.team] ? nflTeams[player.team] : 'Free Agent'}
						</p>
					</div>
				</div>
			</div>
			{player.career[0]?.games_played > 0 ? (
				<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
					<div>
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							Career
						</h2>
						<div className="flex flex-col gap-4">
							<div>
								<div className="bg-white dark:bg-dark-surface">
									{player.career[0].position === 'QB' ||
									player.career[0].position === 'RB' ||
									player.career[0].position === 'WR' ||
									player.career[0].position === 'TE' ? (
										<Table columns={columnsOffense} data={dataCareer} />
									) : (
										<Table columns={columnsDefense} data={dataCareer} />
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
					<div>
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							Stats
						</h2>
						<div className="flex flex-col gap-4">
							<p className="p-4 text-sm">No Stats Accrued</p>
						</div>
					</div>
				</div>
			)}
			{player.career[0]?.games_played > 0 && (
				<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
					<div>
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							Seasons
						</h2>
						<div className="flex flex-col gap-4">
							<div>
								<div className="bg-white dark:bg-dark-surface">
									{player.career[0].position === 'QB' ||
									player.career[0].position === 'RB' ||
									player.career[0].position === 'WR' ||
									player.career[0].position === 'TE' ? (
										<SeasonTable
											columns={columnsOffenseSeason}
											data={dataSeason}
										/>
									) : (
										<SeasonTable
											columns={columnsDefenseSeason}
											data={dataSeason}
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{player.career[0]?.games_played > 0 && (
				<div className="bg-white dark:bg-dark-surface rounded-md shadow-md">
					<div>
						<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
							Games
						</h2>
						<div className="flex flex-col gap-4">
							<div>
								<div className="bg-white dark:bg-dark-surface">
									{player.career[0].position === 'QB' ||
									player.career[0].position === 'RB' ||
									player.career[0].position === 'WR' ||
									player.career[0].position === 'TE' ? (
										<PagTable columns={columnsOffenseGames} data={dataGames} />
									) : (
										<PagTable columns={columnsDefenseGames} data={dataGames} />
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export async function getStaticPaths() {
	try {
		const rostersRes = await fetch(
			`https://api.sleeper.app/v1/league/${leagueID}/rosters/`
		);
		const rosters = await rostersRes.json();
		const rostersArray = rosters.map((roster) => roster.players).flat();
		const rostersList = rostersArray.map((player) => parseInt(player));

		const { data: statsArray } = await supabase
			.from('players_career')
			.select('player_id');
		const statsList = statsArray.map((e) => e.player_id);

		const finalIds = [...new Set([...rostersList, ...statsList])];

		const paths = finalIds.map((player) => ({
			params: { id: player.toString() },
		}));

		return { paths, fallback: false };
	} catch (err) {
		console.error(err);
	}
}

export async function getStaticProps({ params }) {
	try {
		const { data: playerRes } = await supabase
			.from('players')
			.select('*')
			.eq('player_id', params.id);

		const playerObj = playerRes[0];

		const rosterRes = await fetch(
			`https://api.sleeper.app/v1/league/${leagueID}/rosters/`
		);
		const rosters = await rosterRes.json();
		const roster = rosters.find((team) =>
			team.players.includes(playerObj.player_id.toString())
		);

		const roster_id = roster?.roster_id || 100;

		const { data: career } = await supabase
			.from('players_career')
			.select('*')
			.eq('player_id', params.id);

		const { data: games } = await supabase
			.from('players_games')
			.select('*, owner_id (team, id)')
			.eq('player_id', params.id)
			.lt('week', 15);

		const { data: owner } = await supabase
			.from('owners')
			.select('slug, team, id')
			.eq('id', roster_id);

		const { data: season } = await supabase
			.from('players_seasons_season')
			.select('*')
			.eq('player_id', params.id);

		const { data: seasonDetail } = await supabase
			.from('players_seasons_season_detail')
			.select('*, owner_id (*)')
			.eq('player_id', params.id)
			.order('fantasy_points', { ascending: false });

		function filterSeasonDetails(player) {
			return seasonDetail.filter((obj) => {
				return obj.player_id === player.player_id && obj.year === player.year;
			});
		}

		const seasonResults = season.map((e) => ({
			...e,
			subRows:
				filterSeasonDetails(e).length > 1 ? filterSeasonDetails(e) : null,
			owner:
				filterSeasonDetails(e).length < 2
					? filterSeasonDetails(e)[0]?.owner_id.team
					: null,
		}));

		const player = {
			...playerObj,
			games: games,
			seasons: seasonResults,
			career: career,
			owner: owner[0].slug,
			asmc: owner[0].team,
		};

		return {
			props: { player },
		};
	} catch (err) {
		console.error(err);
	}
}
