import Link from 'next/link';

export default function RosterPosition({ arr, position }) {
	return (
		<div>
			<h2 className="text-lg">{position}</h2>
			<div>
				{arr.map((player, i) => (
					<div key={i}>
						<Link href={`/players/${player.player_id}`}>
							<a className="grid grid-cols-[1rem_1fr] pl-4">
								<p className="justify-self-end">{player.number}</p>
								<p className="pl-3">
									{player.full_name}
									<span className="text-xs text-gray-400 pl-1">
										- {player.team}
									</span>
								</p>
							</a>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
