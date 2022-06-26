import Link from 'next/link';
import PlayerCard from '../../components/PlayerCard';

export default function Players({ results }) {
	return (
		<>
			<h1 className="text-3xl my-12">Players</h1>

			<h2 className="border-b border-black/5 mb-4">Featured</h2>
			<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
				<PlayerCard id={results[0]} />
				<PlayerCard id={results[1]} />
				<PlayerCard id={results[2]} />
				<PlayerCard id={results[3]} />
				<PlayerCard id={results[4]} />
				<PlayerCard id={results[5]} />
				<PlayerCard id={results[6]} />
				<PlayerCard id={results[7]} />
				<PlayerCard id={results[8]} />
				<PlayerCard id={results[9]} />
				<PlayerCard id={results[10]} />
				<PlayerCard id={results[11]} />
			</div>
		</>
	);
}

export async function getStaticProps() {
	try {
		const [playersRes, ownersRes, rostersRes] = await Promise.all([
			fetch('https://ethanrmorris.github.io/v1/players.json'),
			fetch('https://ethanrmorris.github.io/v1/owners.json'),
			fetch('https://api.sleeper.app/v1/league/784462448236363776/rosters/'),
		]);
		const [players, owners, rosters] = await Promise.all([
			playersRes.json(),
			ownersRes.json(),
			rostersRes.json(),
		]);

		const newResults = Object.values(players);

		const playerCards = [
			'6813',
			'7528',
			'6790',
			'4984',
			'6786',
			'4866',
			'6797',
			'4040',
			'7596',
			'7564',
			'7553',
			'6945',
		];

		const newerResults = newResults.filter((item) =>
			playerCards.includes(item.player_id)
		);

		const results = newerResults.map((player) => {
			const id = player.player_id;
			const currentTeam = rosters.find((team) => team.players.includes(id));

			const currentOwner = currentTeam?.roster_id;

			const cleanOwner = owners.find((owner) =>
				owner.id?.includes(currentOwner)
			);

			const ownerName = cleanOwner?.slug;

			return { ...player, asmc: ownerName };
		});

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
