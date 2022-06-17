import Link from 'next/link';
import React from 'react';

import { useTable, usePagination, useSortBy, useFlexLayout } from 'react-table';

function Table({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI
	const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		prepareRow,
		page, // Instead of using 'rows', we'll use page,
		// which has only the rows for the active page

		// The rest of these things are super handy, too ;)
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
			<div className="wrapper overflow-x-auto">
				<table
					{...getTableProps()}
					className="min-w-full text-sm divide-y divide-gray-200"
				>
					<thead>
						{headerGroups.map((headerGroup, index) => (
							<tr key={index} {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map((column, index) => (
									<th
										key={index}
										{...column.getHeaderProps(column.getSortByToggleProps())}
										className="sticky left-0 py-4 text-left"
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
					<tbody {...getTableBodyProps()} className="">
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
			{/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
			<div className="wrapper pagination">
				<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
					{'First'}
				</button>{' '}
				<button onClick={() => previousPage()} disabled={!canPreviousPage}>
					{'Previous'}
				</button>{' '}
				<button onClick={() => nextPage()} disabled={!canNextPage}>
					{'Next'}
				</button>{' '}
				<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
					{'Last'}
				</button>{' '}
				<span>
					Page{' '}
					<strong>
						{pageIndex + 1} of {pageOptions.length}
					</strong>{' '}
				</span>
				<span>
					| Go to page:{' '}
					<input
						type="number"
						defaultValue={pageIndex + 1}
						onChange={(e) => {
							const page = e.target.value ? Number(e.target.value) - 1 : 0;
							gotoPage(page);
						}}
						style={{ width: '100px' }}
					/>
				</span>{' '}
				<select
					value={pageSize}
					onChange={(e) => {
						setPageSize(Number(e.target.value));
					}}
				>
					{[10, 25, 50, 100, 250].map((pageSize) => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
		</>
	);
}

export default function Stats({ results }) {
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
				Header: 'Owner',
				accessor: 'owner',
				width: 80,
			},

			{
				Header: 'FP',
				accessor: 'fantasy_points',
				width: 50,
				Cell: (e) => (
					<>
						<p>{e.value}</p>
					</>
				),
			},
		],
		[]
	);

	const data = React.useMemo(() => results, [results]);

	return (
		<>
			<h1 className="wrapper text-lg">Statistics</h1>
			<Table columns={columns} data={data} />
		</>
	);
}

export async function getStaticProps() {
	try {
		const res = await fetch(
			'https://ethanrmorris.github.io/v1/stats/players/games.json'
		);
		const results = await res.json();

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
