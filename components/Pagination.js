export default function Pagination({
	canPreviousPage,
	canNextPage,
	pageIndex,
	pageOptions,
	pageSize,
	pageCount,
	gotoPage,
	nextPage,
	previousPage,
	setPageSize,
}) {
	return (
		<div className="bg-white dark:bg-dark-surface px-4 py-3 flex items-center justify-between border-t border-light-line dark:border-dark-line shadow-md rounded-b-md">
			<div className="flex-1 flex justify-between sm:hidden">
				<button
					onClick={() => previousPage()}
					disabled={!canPreviousPage}
					className="relative inline-flex items-center px-4 py-2 border border-light-line dark:border-dark-line text-sm font-medium rounded-md text-gray-700 dark:text-white dark:bg-transparent bg-white hover:bg-light-hover dark:hover:bg-dark-hover"
				>
					{'Previous'}
				</button>{' '}
				<button
					onClick={() => nextPage()}
					disabled={!canNextPage}
					className="ml-3 relative inline-flex items-center px-4 py-2 border border-light-line dark:border-dark-line text-sm font-medium rounded-md text-gray-700 dark:text-white dark:bg-transparent bg-white hover:bg-light-hover dark:hover:bg-dark-hover"
				>
					{'Next'}
				</button>
			</div>
			<div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
				<span className="text-sm text-gray-700 dark:text-white dark:bg-transparent">
					Showing Page{' '}
					<strong>
						{pageIndex + 1} <span className="font-normal">of</span>{' '}
						{pageOptions.length}
					</strong>{' '}
				</span>
				<div className="flex gap-2">
					<span className="text-sm">
						Show:{' '}
						<select
							value={pageSize}
							onChange={(e) => {
								setPageSize(Number(e.target.value));
							}}
							className="relative h-[38px] inline-flex items-center px-4 py-2 border border-light-line dark:border-dark-line text-sm font-medium rounded-md text-gray-700 dark:text-white dark:bg-transparent bg-white hover:bg-light-hover dark:hover:bg-dark-hover"
						>
							{[10, 25, 50, 100, 250].map((pageSize) => (
								<option key={pageSize} value={pageSize}>
									{pageSize}
								</option>
							))}
						</select>
					</span>
					<span className="text-sm hidden md:block">
						Go to page:{' '}
						<input
							// type="number"
							defaultValue={pageIndex + 1}
							onChange={(e) => {
								const page = e.target.value ? Number(e.target.value) - 1 : 0;
								gotoPage(page);
							}}
							style={{ width: '60px' }}
							className="relative hidden md:inline-flex items-center px-4 py-2 border border-light-line dark:border-dark-line text-sm font-medium rounded-md text-gray-700 dark:text-white dark:bg-transparent bg-white hover:bg-light-hover dark:hover:bg-dark-hover"
						/>
					</span>{' '}
					<div className="flex gap-2">
						<button
							onClick={() => gotoPage(0)}
							disabled={!canPreviousPage}
							className="relative hidden lg:inline-flex items-center p-2 border border-light-line dark:border-dark-line text-sm font-medium rounded-md text-gray-700 dark:text-white dark:bg-transparent bg-white hover:bg-light-hover dark:hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{'First'}
						</button>
						<button
							onClick={() => previousPage()}
							disabled={!canPreviousPage}
							className="relative inline-flex items-center p-2 border border-light-line dark:border-dark-line text-sm font-medium rounded-md text-gray-700 dark:text-white dark:bg-transparent bg-white hover:bg-light-hover dark:hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{'Previous'}
						</button>
						<button
							onClick={() => nextPage()}
							disabled={!canNextPage}
							className="relative inline-flex items-center p-2 border border-light-line dark:border-dark-line text-sm font-medium rounded-md text-gray-700 dark:text-white dark:bg-transparent bg-white hover:bg-light-hover dark:hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{'Next'}
						</button>
						<button
							onClick={() => gotoPage(pageCount - 1)}
							disabled={!canNextPage}
							className="relative hidden lg:inline-flex items-center p-2 border border-light-line dark:border-dark-line text-sm font-medium rounded-md text-gray-700 dark:text-white dark:bg-transparent bg-white hover:bg-light-hover dark:hover:bg-dark-hover disabled:opacity-50 disabled:cursor-not-allowed"
						>
							{'Last'}
						</button>{' '}
					</div>
				</div>
			</div>
		</div>
	);
}
