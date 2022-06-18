import { supabase } from '../utils/supabaseClient';

import Link from 'next/link';

import TradePart from '../components/TradePart';

export default function Home({ results }) {
	return (
		<div>
			<h1>{results.length}</h1>
			{results.map((trade) => (
				<div
					key={trade.id}
					className="max-w-100 bg-white my-2 p-4 shadow-sm rounded-md"
				>
					<p className="text-gray-400 text-xs pb-2">
						#{trade.id} - {trade.date}
					</p>
					<div className="grid grid-cols-2">
						<TradePart owner={trade.owner_1} piece={trade.players_1} />
						<TradePart owner={trade.owner_2} piece={trade.players_2} />
						{trade.owner_3 && (
							<TradePart owner={trade.owner_3} piece={trade.players_3} />
						)}
					</div>
				</div>
			))}
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
