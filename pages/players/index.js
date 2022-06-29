import PlayerCard from '../../components/PlayerCard';

import { supabase } from '@/utils/supabaseClient';

export default function Players({ players }) {
	return (
		<>
			<div>
				<h1 className="text-3xl mt-6 mb-12">Players</h1>
			</div>
			<div>
				<h3 className="text-xl border-b-2 border-black/5 mb-4">Featured</h3>
			</div>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
				<PlayerCard id={players[0]} />
				<PlayerCard id={players[1]} />
				<PlayerCard id={players[2]} />
				<PlayerCard id={players[3]} />
				<PlayerCard id={players[4]} />
				<PlayerCard id={players[5]} />
				<PlayerCard id={players[6]} />
				<PlayerCard id={players[7]} />
				<PlayerCard id={players[8]} />
				<PlayerCard id={players[9]} />
				<PlayerCard id={players[10]} />
				<PlayerCard id={players[11]} />
			</div>
		</>
	);
}

export async function getStaticProps() {
	try {
		const playerCards = [
			'6813', // Ethan - JT
			'7528', // Shawn - Najee
			'6790', // Jacob - Swift
			'4984', // Caleb - JA
			'6786', // Morgan - CD
			'4866', // Lucas - Saquon
			'6797', // Scott - Herbert
			'4040', // Clint - Juju
			'7596', // Juice - Elijah
			'7564', // Brian - Chase
			'7553', // Jorden - Pitts
			'6945', // Cameron - AG24
		];

		const { data: players } = await supabase
			.from('players')
			.select('player_id, full_name, fantasy_positions, team, number')
			.or(
				`player_id.eq.${playerCards[0]}, player_id.eq.${playerCards[1]}, player_id.eq.${playerCards[2]}, player_id.eq.${playerCards[3]}, player_id.eq.${playerCards[4]}, player_id.eq.${playerCards[5]}, player_id.eq.${playerCards[6]}, player_id.eq.${playerCards[7]}, player_id.eq.${playerCards[8]}, player_id.eq.${playerCards[9]}, player_id.eq.${playerCards[10]}, player_id.eq.${playerCards[11]}`
			);

		return {
			props: { players },
		};
	} catch (err) {
		console.error(err);
	}
}
