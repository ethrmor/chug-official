import Image from 'next/image';
import { nflTeams } from '@/utils/nflTeams';
import { supabase } from '@/utils/supabaseClient';
import { leagueID } from '@/utils/chugLeague';
import React from 'react';

export default function Player({ player }) {
	return (
		<div className="bg-white dark:bg-[#333333] shadow-md">
			<div
				style={{
					backgroundImage: `url(/player-header-${
						player.owner !== 'none' ? player.owner : 'league'
					}.jpg)`,
				}}
				className={`w-full h-[175px] md:h-[225px] lg:h-[275px] bg-no-repeat bg-cover bg-right shadow-md mt-[-1rem]`}
			></div>
			<div className="relative h-24 w-24 md:h-36 md:w-36 bg-white dark:bg-[#333333] rounded-full mt-[-4rem] md:mt-[-6rem] mx-auto border-2 border-purple-900">
				{player.years_exp >= 1 ? (
					<Image
						src={`https://sleepercdn.com/content/nfl/players/${player.player_id}.jpg`}
						alt={player.full_name}
						layout="fill"
						objectFit="cover"
						className="rounded-full"
					></Image>
				) : (
					<Image
						src={`https://sleepercdn.com/images/v2/icons/player_default.webp`}
						alt={player.full_name}
						layout="fill"
						objectFit="cover"
						className="rounded-full"
					></Image>
				)}{' '}
			</div>
			<div className="flex items-center justify-center py-4 text-xl font-semibold">
				<h1 className="">{player.full_name}</h1>
				<span className="px-2">|</span>
				<span className="">#{player.number}</span>
			</div>
			<div className="flex items-center justify-center pb-4 text-md">
				<p>{player.fantasy_positions[0]}</p>
				<span className="px-2">|</span>
				<p>
					{Math.floor(player.height / 12)}&apos;
					{player.height - Math.floor(player.height / 12) * 12}&quot;
				</p>
				<span className="px-2">|</span>
				<p>{player.weight} lb</p>
				<span className="px-2">|</span>
				<p>Age: {player.age}</p>
				<span className="px-2">|</span>
				<p>{player.college}</p>
				<span className="px-2">|</span>
				<div className="flex items-center">
					<div className="relative h-7 w-7">
						<Image
							src={
								player.team
									? `https://sleepercdn.com/images/team_logos/nfl/${player.team.toLowerCase()}.png`
									: `/logo.webp`
							}
							alt="Team Logo"
							layout="fill"
							objectFit="contain"
						></Image>
					</div>
					<p className="pl-2">
						{nflTeams[player.team] ? nflTeams[player.team] : 'Free Agent'}
					</p>
				</div>
			</div>
			<div className="p-4">
				<div>
					<h3 className="text-2xl">Career</h3>
				</div>
			</div>
		</div>
	);
}

export async function getStaticPaths() {
	try {
		const rostersRes = await fetch(
			`https://api.sleeper.app/v1/league/${leagueID}/rosters/`
		);
		const rosters = await rostersRes.json();
		const rostersArray = rosters.map((roster) => roster.players).flat();
		const rostersList = rostersArray.map((player) => parseInt(player));

		const { data: statsArray } = await supabase
			.from('players_career')
			.select('player_id');
		const statsList = statsArray.map((e) => e.player_id);

		const finalIds = [...new Set([...rostersList, ...statsList])];

		const paths = finalIds.map((player) => ({
			params: { id: player.toString() },
		}));

		return { paths, fallback: false };
	} catch (err) {
		console.error(err);
	}
}

export async function getStaticProps({ params }) {
	try {
		const { data: playerRes } = await supabase
			.from('players')
			.select('*')
			.eq('player_id', params.id);

		const playerObj = playerRes[0];

		console.log(playerObj);

		const rosterRes = await fetch(
			`https://api.sleeper.app/v1/league/${leagueID}/rosters/`
		);
		const rosters = await rosterRes.json();
		const roster = rosters.find((team) =>
			team.players.includes(playerObj.player_id.toString())
		);

		const roster_id = roster?.roster_id || 100;

		const { data: career } = await supabase
			.from('players_career')
			.select('*')
			.eq('player_id', params.id);

		const { data: games } = await supabase
			.from('players_games')
			.select('*, owner_id (team)')
			.eq('player_id', params.id)
			.lt('week', 15);

		const { data: owner } = await supabase
			.from('owners')
			.select('slug, team')
			.eq('id', roster_id);

		console.log(owner);

		const player = {
			...playerObj,
			games: games,
			career: career,
			owner: owner[0].slug,
			asmc: owner[0].team,
		};

		return {
			props: { player },
		};
	} catch (err) {
		console.error(err);
	}
}
