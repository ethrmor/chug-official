import Image from 'next/image';
import Link from 'next/link';

export default function PlayerCard({ id }) {
	return (
		<>
			<Link href={`/players/${id.player_id}`}>
				<a>
					<div className="flex flex-col items-center bg-white dark:bg-[#333333] w-full p-4 rounded-md shadow-md hover:shadow-xl">
						<div className="relative h-60 w-60">
							<span
								className={`block absolute inset-0 bg-[url('/logo-${id.asmc}.webp')] bg-contain opacity-20`}
							></span>
							<Image
								src={`https://sleepercdn.com/content/nfl/players/${id.player_id}.jpg`}
								alt={id.full_name}
								layout="fill"
								objectFit="cover"
								className=""
							></Image>
						</div>
						<div className="text-center">
							<h3 className="text-xl pt-4">{id.full_name}</h3>
							<h5>
								{id.fantasy_positions[0]}
								{' - '}
								{id.number}
							</h5>
							<div className="relative h-8 w-8 m-2 mx-auto">
								<Image
									src={
										id.team
											? `https://sleepercdn.com/images/team_logos/nfl/${id.team.toLowerCase()}.png`
											: `/logo.webp`
									}
									alt={id.full_name}
									layout="fill"
									objectFit="cover"
									className=""
								></Image>
							</div>
						</div>
					</div>
				</a>
			</Link>
		</>
	);
}
