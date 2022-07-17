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
								<p className="flex text-xs items-start">Games Played</p>
								<p className="flex text-xs items-start">Wins</p>
								<p className="flex text-xs items-start">Losses</p>
								<p className="flex text-xs items-start">Ties</p>
								<p className="flex text-xs items-start">Pct.</p>
							</div>
						</div>
					</div>
					<div className="flex flex-col gap-2 bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div>
							<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
								{year} Schedule
							</h2>
							<div className="flex flex-col gap-2 p-4">
								{schedule.map((game, index) => (
									<div className="flex flex-col gap-2" key={index}>
										<p className="text-sm">
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
														{game.team_points.toFixed(2)}
													</span>
													{' - '}
													<span
														className={
															game.team_points < game.opponent_points
																? `text-light-text dark:text-dark-text tabular-nums text-right`
																: `text-light-text-2 dark:text-dark-text-2 tabular-nums text-right`
														}
													>
														{game.opponent_points.toFixed(2)}
													</span>
												</span>
											</div>
										</p>
										<p className="text-sm">
											<span className="text-light-text-2 dark:text-dark-text-2">
												{game.date}
											</span>
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<div className="flex flex-col bg-white dark:bg-dark-surface rounded-md shadow-md">
						<div>
							<h2 className="text-xs p-4 font-semibold border-b dark:border-b-dark-line">
								Stats
							</h2>
							<div className="flex flex-col gap-2 p-4"></div>
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
			.eq('year', 2021);
		// .eq('year', year);

		const { data: career } = await supabase
			.from('owners_career')
			.select('*')
			.eq('id', parseInt(params.slug));

		const { data: seasons } = await supabase
			.from('owners_seasons')
			.select('*')
			.eq('owner_id', parseInt(params.slug));

		console.log(seasons);

		return {
			props: {
				positionsArray,
				owner,
				schedule,
				career,
				seasons,
			},
		};
	} catch (err) {
		console.error(err);
	}
}
