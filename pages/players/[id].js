import Image from 'next/image';
import { nflTeams } from '@/utils/nflTeams';

export default function Player({ results }) {
	return (
		<div className="bg-white dark:bg-[#333333] shadow-md">
			<div className="w-full h-60 bg-gradient-to-r from-violet-600 to-purple-900 shadow-md mt-[-1rem]"></div>
			<div className="relative h-36 w-36 bg-white rounded-full mt-[-6rem] mx-auto">
				<Image
					src={`https://sleepercdn.com/content/nfl/players/${results.player_id}.jpg`}
					alt={results.full_name}
					layout="fill"
					objectFit="cover"
					className="rounded-full"
				></Image>
			</div>
			<div className="flex items-center justify-center py-4 text-3xl font-semibold">
				<h1 className="">{results.full_name}</h1>
				<span className="px-2">|</span>
				<span className="">#{results.number}</span>
			</div>
			<div className="flex items-center justify-center pb-4 text-xl">
				<p>{results.fantasy_positions[0]}</p>
				<span className="px-2">|</span>
				<p>
					{Math.floor(results.height / 12)}&apos;
					{results.height - Math.floor(results.height / 12) * 12}&quot;
				</p>
				<span className="px-2">|</span>
				<p>{results.weight} lb</p>
				<span className="px-2">|</span>
				<p>Age: {results.age}</p>
				<span className="px-2">|</span>
				<p>{results.college}</p>
				<span className="px-2">|</span>
				<div className="flex items-center">
					<div className="relative h-7 w-7">
						<Image
							src={
								results.team
									? `https://sleepercdn.com/images/team_logos/nfl/${results.team.toLowerCase()}.png`
									: `/logo.webp`
							}
							alt="Team Logo"
							layout="fill"
							objectFit="contain"
						></Image>
					</div>
					<p className="pl-2">{nflTeams[results.team]}</p>
				</div>
			</div>
			<div className="relative h-36 w-36">
				<Image
					src={results.asmc ? `/logo-${results.asmc}.webp` : `/logo.webp`}
					alt="Logo"
					layout="fill"
					objectFit="contain"
				></Image>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	// Call an external API endpoint to get posts
	const res = await fetch('https://ethanrmorris.github.io/v1/players.json');
	const players = await res.json();
	const newResults = Object.values(players);

	// Get the paths we want to pre-render based on posts
	const paths = newResults.map((player) => ({
		params: { id: player.player_id },
	}));

	// We'll pre-render only these paths at build time.
	// { fallback: false } means other routes should 404.
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
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

		const [lastResults] = newResults.filter((obj) => {
			return obj.player_id === params.id;
		});

		const playerId = lastResults.player_id;

		const currentTeam = rosters.find((team) => team.players.includes(playerId));

		const currentOwner = currentTeam?.roster_id;

		const cleanOwner = owners.find((owner) => owner.id?.includes(currentOwner));

		const ownerName = cleanOwner?.slug;

		const results = {
			...lastResults,
			asmc: ownerName ? ownerName : null,
		};

		console.log(results);

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
		return {
			notFound: true,
		};
	}
}
