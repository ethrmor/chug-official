import RosterPosition from '@/components/RosterPosition';
import { leagueID, year } from '@/utils/chugLeague';
import { supabase } from '@/utils/supabaseClient';
import Link from 'next/link';
import Image from 'next/image';

export default function Manager({
	positionsArray,
	owner,
	schedule,
	career,
	seasons,
	currentSeason,
}) {
	return (
		<>
			<h1 className="text-2xl mt-2 mb-4">{owner.team}</h1>
			<div className="grid gap-4 md:grid-cols-[350px_1fr]">
				<div className="flex flex-col gap-4">
					<div className="flex flex-col bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div className="flex flex-col justify-center items-start py-4 px-4">
							<div className="relative h-60 w-60 my-4 self-center">
								<Image
									src={`/logo-${owner.slug}.webp`}
									alt={owner.name}
									layout="fill"
									objectFit="cover"
									className="z-0"
								></Image>
							</div>
							<div className="flex flex-col pt-3 pb-3">
								<p className="py-1">
									<span className="text-sm">Owner: </span>
									{owner.name}
								</p>
								<p className="py-1">
									<span className="text-sm">Favorite Team: </span>
									{owner.favoriteTeam}
								</p>
							</div>
							<div className="grid w-full grid-cols-3 place-items-center text-center">
								<div>
									<h3 className="text-2xl">{career[0].regular_season_wins}</h3>
									<p className="text-xs text-light-text-2 dark:text-dark-text-2">
										Career Wins
									</p>
								</div>
								<div>
									<h3 className="text-2xl">{career[0].apr}</h3>
									<p className="text-xs text-light-text-2 dark:text-dark-text-2">
										Career APR
									</p>
								</div>
								<div>
									<h3 className="text-2xl">{career[0].legacy_score}</h3>
									<p className="text-xs text-light-text-2 dark:text-dark-text-2">
										Legacy Score
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2 bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div>
							<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
								{year} Quick Look
							</h2>
							<div className="flex flex-col gap-2 p-4">
								<div className="flex text-sm items-start justify-between">
									<p>Games Played</p>
									<p className="text-xl">
										{currentSeason[0].regular_season_games_played}
									</p>
								</div>
								<div className="flex text-sm items-start justify-between">
									<p>Wins</p>
									<p className="text-xl">
										{currentSeason[0].regular_season_wins}
									</p>
								</div>
								<div className="flex text-sm items-start justify-between">
									<p>Losses</p>
									<p className="text-xl">
										{currentSeason[0].regular_season_losses}
									</p>
								</div>
								{currentSeason[0].regular_season_ties !== 0 && (
									<div className="flex text-sm items-start justify-between">
										<p>Ties</p>
										<p className="text-xl">
											{currentSeason[0].regular_season_games_played}
										</p>
									</div>
								)}

								<div className="flex text-sm items-start justify-between">
									<p>Win Pct.</p>
									<p className="text-xl">
										{currentSeason[0].regular_season_pct.toString().slice(1) ||
											'.000'}
									</p>
								</div>
								<div className="flex text-sm items-start justify-between">
									<p>Points For</p>
									<p className="text-xl">
										{currentSeason[0].regular_season_points_for?.toFixed(2)}
									</p>
								</div>
								<div className="flex text-sm items-start justify-between">
									<p>Points Against</p>
									<p className="text-xl">
										{currentSeason[0].regular_season_points_against?.toFixed(2)}
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2 bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div>
							<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
								{year} Schedule
							</h2>
							<div className="flex flex-col gap-2 py-4 px-2">
								{schedule.map((game, index) => (
									<Link
										href={`/schedule/${game.game_id}`}
										className="flex flex-col gap-2"
										key={index}
									>
										<a className="text-sm  px-2 hover:bg-light-hover hover:dark:bg-dark-hover round-md">
											<span className="text-xs text-light-text-2 dark:text-dark-text-2">
												Week {game.week}
											</span>
											<div className="flex justify-between">
												<span className="">vs {game.opponent_id.team}</span>
												<span>
													<span
														className={
															game.team_points > game.opponent_points
																? `text-light-text dark:text-dark-text tabular-nums text-right`
																: `text-light-text-2 dark:text-dark-text-2 tabular-nums text-right`
														}
													>
														{game.team_points?.toFixed(2) || '0.00'}
													</span>
													{' - '}
													<span
														className={
															game.team_points < game.opponent_points
																? `text-light-text dark:text-dark-text tabular-nums text-right`
																: `text-light-text-2 dark:text-dark-text-2 tabular-nums text-right`
														}
													>
														{game.opponent_points?.toFixed(2) || '0.00'}
													</span>
												</span>
											</div>
										</a>
									</Link>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div>
							<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
								Career Stats
							</h2>
							<div className="flex flex-col gap-2 p-4">
								<div className="grid grid-cols-8 gap-2">
									<div>
										<h3>Games Played</h3>
										<p className="text-xl">
											{career[0].regular_season_games_played}
										</p>
									</div>
									<div>
										<h3>Wins</h3>
										<p className="text-xl">{career[0].regular_season_wins}</p>
									</div>
									<div>
										<h3>Losses</h3>
										<p className="text-xl">{career[0].regular_season_losses}</p>
									</div>
									<div>
										<h3>Ties</h3>
										<p className="text-xl">{career[0].regular_season_ties}</p>
									</div>
									<div>
										<h3>Win Pct.</h3>
										<p className="text-xl">{career[0].regular_season_pct}</p>
									</div>
									<div>
										<h3>Points For</h3>
										<p className="text-xl">
											{career[0].regular_season_points_for}
										</p>
									</div>
									<div>
										<h3>Points Against</h3>
										<p className="text-xl">
											{career[0].regular_season_points_against}
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="flex flex-col bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div>
							<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
								Roster
							</h2>
							<div className="flex flex-col gap-2 p-4">
								<RosterPosition
									arr={positionsArray[0]}
									position={'Quarterbacks'}
								/>
								<RosterPosition
									arr={positionsArray[1]}
									position={'Runningbacks'}
								/>
								<RosterPosition
									arr={positionsArray[2]}
									position={'Wide Receivers'}
								/>
								<RosterPosition
									arr={positionsArray[3]}
									position={'Tight Ends'}
								/>
								<RosterPosition
									arr={positionsArray[4]}
									position={'Defensive Line'}
								/>
								<RosterPosition
									arr={positionsArray[5]}
									position={'Linebackers'}
								/>
								<RosterPosition
									arr={positionsArray[6]}
									position={'Defensive Backs'}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export async function getStaticPaths() {
	const paths = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((owner) => ({
		params: { slug: owner.toString() },
	}));

	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	try {
		const res = await fetch(
			`https://api.sleeper.app/v1/league/${leagueID}/rosters/`
		);
		const rosters = await res.json();

		const rostersArray = Object.values(rosters);

		const currentOwner = rostersArray.filter((obj) => {
			return obj.roster_id === parseInt(params.slug);
		});

		const currentRoster = currentOwner[0].players;

		const { data: ownerArray } = await supabase
			.from('owners')
			.select('*')
			.eq('id', parseInt(params.slug));

		const owner = ownerArray[0];

		const { data: players } = await supabase
			.from('players')
			.select('*')
			.in('player_id', currentRoster)
			.order('number', { ascending: true });

		const qbArray = players.filter((obj) => {
			return obj.position === 'QB';
		});

		const rbArray = players.filter((obj) => {
			return obj.position === 'RB';
		});

		const wrArray = players.filter((obj) => {
			return obj.position === 'WR';
		});

		const teArray = players.filter((obj) => {
			return obj.position === 'TE';
		});

		const dlArray = players.filter((obj) => {
			return obj.fantasy_positions[0] === 'DL';
		});

		const lbArray = players.filter((obj) => {
			return obj.fantasy_positions[0] === 'LB';
		});

		const dbArray = players.filter((obj) => {
			return obj.fantasy_positions[0] === 'DB';
		});

		const positionsArray = [
			qbArray,
			rbArray,
			wrArray,
			teArray,
			dlArray,
			lbArray,
			dbArray,
		];

		const { data: schedule } = await supabase
			.from('game_history')
			.select('*, owner_id (team), opponent_id (team)')
			.eq('owner_id', parseInt(params.slug))
			.eq('year', year);

		const { data: career } = await supabase
			.from('owners_career')
			.select('*')
			.eq('id', parseInt(params.slug));

		const { data: seasons } = await supabase
			.from('owners_seasons')
			.select('*')
			.eq('owner_id', parseInt(params.slug));

		const { data: currentSeason } = await supabase
			.from('owners_seasons')
			.select('*')
			.eq('owner_id', parseInt(params.slug))
			.eq('year', year);

		console.log(career);

		return {
			props: {
				positionsArray,
				owner,
				schedule,
				career,
				seasons,
				currentSeason,
			},
		};
	} catch (err) {
		console.error(err);
	}
}
