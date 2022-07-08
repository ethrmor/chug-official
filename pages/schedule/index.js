import { supabase } from '@/utils/supabaseClient';
import { useState } from 'react';
import FilterDropdown from '../../components/FilterDropdown';
import MiniBoxScore from '../../components/MiniBoxScore';

const weeks = [
	{ week: 1, name: 'Week 1' },
	{ week: 2, name: 'Week 2' },
	{ week: 3, name: 'Week 3' },
	{ week: 4, name: 'Week 4' },
	{ week: 5, name: 'Week 5' },
	{ week: 6, name: 'Week 6' },
	{ week: 7, name: 'Week 7' },
	{ week: 8, name: 'Week 8' },
	{ week: 9, name: 'Week 9' },
	{ week: 10, name: 'Week 10' },
	{ week: 11, name: 'Week 11' },
	{ week: 12, name: 'Week 12' },
	{ week: 13, name: 'Week 13' },
	{ week: 14, name: 'Week 14' },
	{ week: 15, name: 'Wildcard Weekend' },
	{ week: 16, name: 'Semi Finals' },
	{ week: 17, name: 'Chug Cup Final' },
	{ week: 18, name: 'Pro Bowl' },
];

const years = [
	{ year: 2022, name: '2022' },
	{ year: 2021, name: '2021' },
	{ year: 2020, name: '2020' },
];

export default function Schedule({ results }) {
	const [week, setWeek] = useState(weeks[0]);
	const [year, setYear] = useState(years[0]);

	const filtered = !year
		? results
		: results.filter((obj) => obj.year === year.year && obj.week === week.week);

	return (
		<>
			<h1 className="text-3xl mt-2 mb-4">Schedule</h1>
			<div className="grid md:grid-cols-[300px_1fr] gap-6">
				<div className="flex flex-col gap-4 sticky top-20 self-start">
					<p>Filters</p>
					<FilterDropdown state={week} setState={setWeek} listArray={weeks} />
					<FilterDropdown state={year} setState={setYear} listArray={years} />
				</div>
				<div className="flex flex-col gap-4">
					<p>
						{year.name} - {week < 15 ? `Week ${week}` : week.name}
					</p>
					{filtered.map((game) => (
						<div
							key={game.id}
							className="min-w-[400px] bg-white dark:bg-[#333333] p-4 shadow-md rounded-md hover:shadow-lg"
						>
							{game.owner ? (
								<MiniBoxScore
									id={game.id}
									team={game.owner_id.team}
									teamOwner={game.owner_id.slug}
									teamPoints={game.owner_points}
									teamPlayerName={game.owner_player_id?.player_name}
									teamPlayerPosition={game.owner_player_id?.position}
									teamPlayerPoints={game.owner_player_points}
									teamWins={game.owner_wins}
									teamLosses={game.owner_losses}
									teamTies={game.owner_ties}
									opponent={game.opponent_id.team}
									opponentOwner={game.opponent_id.slug}
									opponentPoints={game.opponent_points}
									opponentPlayerName={game.opponent_player_id?.player_name}
									opponentPlayerPosition={game.opponent_player_id?.position}
									opponentPlayerPoints={game.opponent_player_points}
									opponentWins={game.opponent_wins}
									opponentLosses={game.opponent_losses}
									opponentTies={game.opponent_ties}
								/>
							) : (
								'Playoff Teams TBD'
							)}
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export async function getStaticProps() {
	try {
		const { data: results } = await supabase
			.from('game_box_score')
			.select(
				'*, owner_id (slug, team), opponent_id (slug, team), owner_player_id (player_name, position), opponent_player_id (player_name, position)'
			);

		return {
			props: { results },
		};
	} catch (err) {
		console.error(err);
	}
}
