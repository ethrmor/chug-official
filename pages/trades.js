import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

import TradePart from '../components/TradePart';

export default function Home({ results }) {
	const [search, setSearch] = useState('');
	const handleSearchChange = (e) => {
		setSearch(e.target.value);
	};
	const filtered = !search
		? results
		: results.filter(
				(person) =>
					person.owner_1?.toLowerCase().includes(search.toLowerCase()) ||
					person.owner_2?.toLowerCase().includes(search.toLowerCase()) ||
					person.owner_3?.toLowerCase().includes(search.toLowerCase())
		  );

	return (
		<div>
			<h1>Trades</h1>
			<div className="grid grid-cols-[300px_1fr]">
				<div>
					<p>Filter Count: {filtered.length}</p>
				</div>
				<div>
					<input
						type="text"
						value={search}
						onChange={handleSearchChange}
						className="block p-4 w-full border-cyan-500 border-2 shadow-sm rounded-md"
					/>
					{filtered.map((trade) => (
						<div
							key={trade.id}
							className="min-w-[800px] bg-white dark:bg-[#333333] my-4 mx-auto p-4 shadow-sm rounded-md"
						>
							<p className="text-gray-400 text-xs pb-2">
								#{trade.id} - {trade.date}
							</p>
							<div className="grid grid-cols-2 gap-6">
								<TradePart owner={trade.owner_1} piece={trade.players_1} />
								<TradePart owner={trade.owner_2} piece={trade.players_2} />
								{trade.owner_3 && (
									<TradePart owner={trade.owner_3} piece={trade.players_3} />
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
			.select('*')
			// .or('owner_1.eq.ethan,owner_2.eq.ethan,owner_3.eq.ethan')
			.order('id', { ascending: false });

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
