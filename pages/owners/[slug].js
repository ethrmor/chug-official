import RosterPosition from '@/components/RosterPosition';
import { leagueID } from '@/utils/chugLeague';
import { supabase } from '@/utils/supabaseClient';
import Link from 'next/link';

export default function Manager({ positionsArray, owner }) {
	return (
		<>
			<h1 className="text-4xl mt-2 mb-4">{owner.team}</h1>
			<div className="flex flex-col gap-4">
				<RosterPosition arr={positionsArray[0]} position={'Quarterbacks'} />
				<RosterPosition arr={positionsArray[1]} position={'Runningbacks'} />
				<RosterPosition arr={positionsArray[2]} position={'Wide Receivers'} />
				<RosterPosition arr={positionsArray[3]} position={'Tight Ends'} />
				<RosterPosition arr={positionsArray[4]} position={'Defensive Line'} />
				<RosterPosition arr={positionsArray[5]} position={'Linebackers'} />
				<RosterPosition arr={positionsArray[6]} position={'Defensive Backs'} />
			</div>
		</>
	);
}

export async function getStaticPaths() {
	const { data: owners } = await supabase.from('owners').select('*');

	const paths = owners.map((owner) => ({
		params: { slug: owner.id.toString() },
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

		return {
			props: {
				positionsArray,
				owner,
			},
		};
	} catch (err) {
		console.error(err);
	}
}
