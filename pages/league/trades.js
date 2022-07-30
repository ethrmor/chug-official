import { useState } from 'react';

import { supabase } from '@/utils/supabaseClient';

import TradePart from '@/components/TradePart';
import FilterDropdown from '@/components/FilterDropdown';

const owners = [
	{ owner: '', name: 'All Teams' },
	{ owner: 'ethan', name: 'River City Redbirds' },
	{ owner: 'jacob', name: 'Slayton Slayerz' },
	{ owner: 'scott', name: 'Outkasts' },
	{ owner: 'morgan', name: 'Direwolves' },
	{ owner: 'juice', name: 'Macdaddys' },
	{ owner: 'brian', name: 'Quarantine Cowboys' },
	{ owner: 'lucas', name: 'Kingston Kraken' },
	{ owner: 'jorden', name: 'Goathouse Alums' },
	{ owner: 'caleb', name: 'Jeff City Leprechauns' },
	{ owner: 'cameron', name: 'White Panthers' },
	{ owner: 'shawn', name: '45ers' },
	{ owner: 'clint', name: 'Rabbis' },
	{ owner: 'dan', name: 'Baba Yagas' },
];

const years = [
	{ year: '', name: 'All Years' },
	{ year: '2022', name: '2022' },
	{ year: '2021', name: '2021' },
	{ year: '2020', name: '2020' },
];

export default function Trades({ results }) {
	const [owner, setOwner] = useState(owners[0]);
	const [year, setYear] = useState(years[0]);

	const filtered = !owner
		? results
		: results.filter(
				(person) =>
					(person.owner_1?.toLowerCase().includes(owner.owner) ||
						person.owner_2?.toLowerCase().includes(owner.owner) ||
						person.owner_3?.toLowerCase().includes(owner.owner)) &&
					person.year.toString().includes(year.year)
		  );

	return (
		<div>
			<h1 className="text-2xl mt-2 mb-4">Trades</h1>
			<div className="grid md:grid-cols-[300px_1fr] gap-6 text-xs">
				<div className="flex flex-col gap-4 sticky top-[3.9rem] opacity-1 md:top-20 self-start z-40 py-4 md:py-0 bg-light-bg dark:bg-dark-bg">
					<p>Filters</p>
					<FilterDropdown
						state={owner}
						setState={setOwner}
						listArray={owners}
					/>
					<FilterDropdown state={year} setState={setYear} listArray={years} />
				</div>
				<div className="flex flex-col gap-4">
					<p>Showing {filtered.length} trades...</p>
					{filtered.map((trade) => (
						<div
							key={trade.id}
							className="min-w-[300px] bg-white dark:bg-dark-surface x-auto p-4 shadow-md rounded-md"
						>
							<p className="text-light-text-2 dark:text-dark-text-2 text-xs pb-2">
								#{trade.id} - {trade.date}
							</p>
							<div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
								<TradePart owner={trade.id_1.team} piece={trade.players_1} />
								<TradePart owner={trade.id_2.team} piece={trade.players_2} />
								{trade.owner_3 && (
									<TradePart owner={trade.id_3.team} piece={trade.players_3} />
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export async function getStaticProps() {
	try {
		const { data: results } = await supabase
			.from('trades')
			.select('*, id_1 (team), id_2 (team), id_3 (team)')
			.order('id', { ascending: false });

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
