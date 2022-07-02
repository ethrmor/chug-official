import BoxScoreRow from '@/components/BoxScoreRow';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '../../utils/supabaseClient';

export default function singleGame({ results }) {
	return (
		<>
			<h1 className="text-3xl mt-2 mb-4">
				{results.year} - Week {results.week}
			</h1>
			<div className="bg-white dark:bg-[#333333] rounded-md shadow-md p-4 flex flex-col gap-10">
				<div className="grid grid-cols-[1fr_6rem_1fr]">
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-6">
							<div className="relative w-24 h-24">
								<Image
									src={`/logo-${results.team_id.slug}.webp`}
									alt={`${results.team_id.team} Logo`}
									layout="fill"
								/>
							</div>
							<div className="">
								<h2 className="text-xl">{results.team_id.team}</h2>
								<h3 className="text-sm">{results.team_id.name}</h3>
							</div>
						</div>
						<p
							className={
								results.owner_points > results.opponent_points
									? 'text-2xl font-bold'
									: 'text-2xl opacity-70'
							}
						>
							{results.owner_points}
						</p>
					</div>
					<div className="flex items-center justify-center">
						<p>VS</p>
					</div>
					<div className="flex justify-between items-center">
						<p
							className={
								results.owner_points < results.opponent_points
									? 'text-2xl font-bold'
									: 'text-2xl opacity-50'
							}
						>
							{results.opponent_points}
						</p>
						<div className="flex items-center gap-6">
							<div className="text-right">
								<h2 className="text-xl">{results.opp_id.team}</h2>
								<h3 className="text-sm">{results.opp_id.name}</h3>
							</div>
							<div className="relative w-24 h-24">
								<Image
									src={`/logo-${results.opp_id.slug}.webp`}
									alt={`${results.opp_id.team} Logo`}
									layout="fill"
								/>
							</div>
						</div>
					</div>
				</div>
				<div>
					<div className="grid grid-cols-[1fr_6rem_1fr] border-b-2 pb-2">
						<p className="">Player Name</p>
						<p className="text-center">Position</p>
						<p className="text-right">Player Name</p>
					</div>
					<BoxScoreRow results={results} index={0} />
					<BoxScoreRow results={results} index={1} />
					<BoxScoreRow results={results} index={2} />
					<BoxScoreRow results={results} index={3} />
					<BoxScoreRow results={results} index={4} />
					<BoxScoreRow results={results} index={5} />
					<BoxScoreRow results={results} index={6} />
					<BoxScoreRow results={results} index={7} />
					<BoxScoreRow results={results} index={8} />
					<BoxScoreRow results={results} index={9} />
					<BoxScoreRow results={results} index={10} />
				</div>
			</div>
		</>
	);
}

export async function getStaticPaths() {
	const { data: results } = await supabase.from('game_box_score').select('*');

	const paths = results.map((game) => ({
		params: { id: game.id.toString() },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	try {
		const { data: game } = await supabase
			.from('game_box_score')
			.select(
				`*, team_id:owner_id (id, team, slug, name), opp_id:opponent_id (id, team, slug, name), owner_player_id ("*"), opponent_player_id ("*")`
			)
			.eq('id', params.id);

		const result = game[0];

		const {
			week: gameWeek,
			year: gameYear,
			owner_id: gameOwner,
			opponent_id: gameOpponent,
		} = result;

		const { data: stats } = await supabase
			.from('players_games')
			.select('*')
			.eq('year', gameYear)
			.eq('week', gameWeek)
			.or(`owner_id.eq.${gameOwner},owner_id.eq.${gameOpponent}`);

		const team_players = stats.filter((player) => {
			return player.owner_id === gameOwner;
		});

		const opponent_players = stats.filter((player) => {
			return player.owner_id === gameOpponent;
		});

		const results = {
			...result,
			team_players,
			opponent_players,
		};

		console.log(results);

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
